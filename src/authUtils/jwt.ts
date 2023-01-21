import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { BluFetch } from "../helpers/BluFetch";

// Usually between 5 minutes - 15 minutes
export function generateAccessToken(user: User) {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw new Error("No secret available for JWT generation.");
  return jwt.sign({ userId: user.id }, secret, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(user: User, jti: any) {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error("No secret available for JWT generation.");
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    secret,
    {
      expiresIn: "10h",
    }
  );
}

export function generateTokens(user: User, jti: any) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

/**
 * Generate a random 8 digit number as the email token
 */
export function generateCode(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

export async function handleApprove(
  email: string,
  code: string
): Promise<boolean> {
  const params = {
    email: email,
    code: code,
  };
  console.log("running approval with params:");
  console.log(params);
  // try to add new friend on server
  try {
    const res = await BluFetch("/api/auth/approve", {
      method: "POST",
      body: JSON.stringify(params),
      timeout: 8000,
      headers: { "Content-Type": "application/json" },
    });
    if (res.status != 200) {
      console.warn("Unable to approve login.");
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}
