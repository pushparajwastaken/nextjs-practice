import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

import { getDataFromToken } from "@/helpers/getDatafromToken";

dbConnect();

export async function POST(request: NextRequest) {
  //extract data from token
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    return NextResponse.json(
      {
        message: "User not found",
        success: false,
      },
      { status: 404 },
    );
  }
  return NextResponse.json(
    {
      message: "User found",
      data: user,
      success: true,
    },
    { status: 200 },
  );
}
