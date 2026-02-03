import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs";



export async function POST(request: Request) {
  await dbConnect();
  try {
    const { userName, email, password } = await request.json();
    const existingUserVerifiedByUserName = await UserModel.findOne({
      userName,
      isVerified: true,
    });
    if (existingUserVerifiedByUserName) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        {
          status: 400,
        },
      );
    }
    const existingUserVerifiedByEmail = await UserModel.findOne({ email });
   const verifyCode=Math.floor(100000+Math.random()*900000).toString()
    if (existingUserVerifiedByEmail) {
      if(existingUserVerifiedByEmail.isVerified){
        return Response.json({
            success:false,
            message:"User already exists with this email"
        },{status:500})
      }else{
const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      existingUserVerifiedByEmail.password=hashedPassword
      existingUserVerifiedByEmail.verifyCode=verifyCode
      existingUserVerifiedByEmail.verifyCodeExpiry=expiryDate
      await existingUserVerifiedByEmail.save()
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser= new UserModel({
        userName,
          email,
          password: hashedPassword,
          verifyCode,
          verifyCodeExpiry:expiryDate,
          isVerified:false,
          isAcceptingMessage: true,
          messages:[];
          createdAt: Date.now();
      })
      await newUser.save()
    }
    //sendVerificationemail
    const emailResponse=await sendVerificationEmail(email,userName,verifyCode)
if(!emailResponse.success ) {
    return Response.json({
        success:false,
        message:emailResponse.message
    },{status:500})
}

return Response.json({
    success:true,
    message:"User registered successfullt.Please verify your email"
},{
    status:500
})


} catch (error) {
    console.error("Error registering User", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      },
    );
  }
}
