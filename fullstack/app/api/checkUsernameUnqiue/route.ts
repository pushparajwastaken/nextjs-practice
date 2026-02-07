import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { z } from "zod";
import { userNameValidation } from "@/schemas/signupSchema";

const userNameQuerySchema = z.object({
  userName: userNameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      userName: searchParams.get("userName"),
    };
    //validate with zod
    const result = userNameQuerySchema.safeParse(queryParams);
    console.log(result); //todo:Remove
    if (!result.success) {
      const userNameErrors = result.error.format().userName?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            userNameErrors?.length > 0
              ? userNameErrors.join(", ")
              : "Invalid Query Parameters",
        },
        {
          status: 400,
        },
      );
    }
    const { userName } = result.data;
    const existingVerifiedUser = await UserModel.findOne({
      userName,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "UserName is already taken",
        },
        {
          status: 400,
        },
      );
    }
    return Response.json(
      {
        success: true,
        message: "UserName is unqiue",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error while checking Username", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      {
        status: 500,
      },
    );
  }
}
