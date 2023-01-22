import { NextApiRequest, NextApiResponse } from "next";

import {
  generateAccessToken,
  generateTokens,
} from "../../../src/authUtils/jwt";

import hashToken from "../../../src/authUtils/hashtoken";
import jwt from "jsonwebtoken";
import {
  addRefreshTokenToWhitelist,
  deleteRefreshToken,
  findRefreshTokenById,
  findUserById,
} from "../../../prisma/script";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { v4 } from "uuid";

type Data = {
  accessToken?: string;
  refreshToken?: string;
  msg?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log("RUNNING refresh!");
  // Get data submitted in request's body.
  try {
    const refreshToken: string | undefined = getCookie("refreshToken", {
      req,
      res,
    })?.toString();
    // reject if no user is supplied
    if (!refreshToken) {
      return res.status(401).json({ msg: "Missing refresh token." });
    }
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
      return res.status(400).json({ msg: "Missing jwt creation secret." });
    }
    // verify refresh token
    const payload: any = jwt.verify(refreshToken, secret);
    const savedRefreshToken = await findRefreshTokenById(payload.jti);
    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      return res.status(400).json({ msg: "Unauthorized." });
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      return res.status(400).json({ msg: "Unauthorized." });
    }
    const user = await findUserById(payload.userId);
    if (!user) {
      return res.status(400).json({ msg: "Unauthorized." });
    }
    await deleteRefreshToken(savedRefreshToken.id);
    const jti = v4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );
    await addRefreshTokenToWhitelist(jti, newRefreshToken, user.id);
    // set tokens as cookies
    deleteCookie("accessToken");
    setCookie("accessToken", accessToken, {
      req,
      res,
      secure: process.env.APP_STAGE == "production",
      httpOnly: true,
    });
    deleteCookie("refreshToken");
    setCookie("refreshToken", newRefreshToken, {
      req,
      res,
      secure: process.env.APP_STAGE == "production",
      httpOnly: true,
    });
    return res.status(200).json({ msg: "Tokens refreshed." });
  } catch (e: any) {
    return res.status(401).json({ msg: `${e.message}` });
  }
}
