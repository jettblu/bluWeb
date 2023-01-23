import { Event, Friend, PrismaClient, User } from "@prisma/client";
import { add } from "date-fns";

import EventPlaceholder from "../src/helpers/events/types";
import hashToken from "../src/authUtils/hashtoken";
import { generateCode } from "../src/authUtils/jwt";
import { decryptTextIv, encryptTextIv } from "../src/helpers/crypto";

const prisma = new PrismaClient();

export async function addFriend(name: string, email: string): Promise<Friend> {
  const friend: Friend = await prisma.friend.create({
    data: { name: name, email: email },
  });
  return friend;
}

export async function addEvents(
  events: EventPlaceholder[],
  userId: string,
  startDate?: Date
) {
  for (const event of events) {
    event.userId = userId;
    // add start date if provided... otherwise use default
    event.createdAt = startDate;
    const { ciphertext, ivString } = encryptTextIv(event.description);
    // replace description with ciphertext
    event.description = ciphertext;
    // update iv
    event.iv = ivString;
  }
  const eventsAdded = await prisma.event.createMany({ data: events });
  return eventsAdded;
}

export async function getEvents(
  userId: string,
  startDate?: Date
): Promise<Event[]> {
  // TODO: TEMPORARY PATCH. AD EVENT TYPE AFTER DEPLOYMENT ISSUE RESOLVED
  // allevents has the EVENT type
  const allEvents: any = await prisma.event.findMany({
    where: { userId: userId },
  });
  for (const event of allEvents) {
    // TODO: THROW ERROR IF NO IV? CUSTOM MESSAGE
    if (!event.iv) {
      continue;
    } else {
      const { plaintext } = decryptTextIv(event.description, event.iv);
      event.description = plaintext;
    }
  }
  return allEvents;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

export function findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

/**
 * Create user with email
 */
export function createUserByEmail(email: string) {
  return prisma.user.create({
    data: { email: email },
  });
}

const EmailTokenExpirationMinutes = 10;

/**
 * Creates refresh token.
 */
export function addRefreshTokenToWhitelist(
  jti: any,
  refreshToken: any,
  userId: any
) {
  return prisma.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
}

/**
 * Check if user is in db.
 */
export function findRefreshTokenById(id: string) {
  return prisma.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

/**
 * Revoke refresh token.
 */
export function deleteRefreshToken(id: string) {
  return prisma.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
}

export function revokeTokens(userId: string) {
  return prisma.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
}

export async function createOneTimeToken(userId: string) {
  const tokenExpiration = add(new Date(), {
    minutes: EmailTokenExpirationMinutes,
  });
  const code: string = generateCode();
  // 👇 create a short lived token and update user or create if they don't exist
  const createdToken = await prisma.oneTimeToken.create({
    data: {
      code,
      expiration: tokenExpiration,
      userId: userId,
    },
  });
  return createdToken;
}

export async function findOrCreateUserByEmail(
  email: string
): Promise<User | null> {
  let existingUser: User | null = await findUserByEmail(email);
  // if user does not exist... create
  if (!existingUser) {
    existingUser = await createUserByEmail(email);
  }
  return existingUser;
}
