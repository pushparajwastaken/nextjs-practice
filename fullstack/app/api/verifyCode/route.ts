import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { z } from "zod";
import { userNameValidation } from "@/schemas/signupSchema";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { userName, code } = await request.json();
    const decodedUserName = decodeURIComponent(userName);
    const user = await UserModel.findOne({
      userName: decodedUserName,
    });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "User verified successfully",
        },
        {
          status: 200,
        },
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "Verification Code Expired",
        },
        {
          status: 400,
        },
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Verification Code is Wrong",
        },
        {
          status: 400,
        },
      );
    }
  } catch (error) {
    console.error("Error verifying User", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying User",
      },
      {
        status: 500,
      },
    );
  }
}
