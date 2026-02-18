import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
dbConnect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = req.json();
    const { username, email, password }: any = reqBody;
    console.log("reqBody: ", reqBody);
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          error: "Email already Exists",
        },
        {
          status: 400,
        },
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log("Saved User: ", savedUser);
    //sendVerificationMail
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
return NextResponse.json({
    message:"User registered Successfully"
    success:true,
    savedUser
}) 
} catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
