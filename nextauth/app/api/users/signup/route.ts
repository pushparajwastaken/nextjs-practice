import dbConnect from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
dbConnect();
export async function POST(request: NextRequest) {
  try {
    console.log("API HIT");

    const reqBody = await request.json();
    console.log("BODY:", reqBody);

    const { userName, email, password } = reqBody;

    const user = await User.findOne({ email });
    console.log("EXISTING USER:", user);

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("USER SAVED:", savedUser);

    // COMMENT THIS FIRST
    // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
