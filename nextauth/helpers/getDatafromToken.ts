import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token: any = request.cookies.get("token")?.value || "";
    jwt.verify(token, process.env.TOKEN_SECRET!);
    return token.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
