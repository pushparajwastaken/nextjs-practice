import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const verifyToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: verifyToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: verifyToken,
        forgetPasswordExpiry: Date.now() + 360000,
      });
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use true for port 465, false for port 587
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });
    (async () => {
      const info = await transporter.sendMail({
        from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
        to: email,
        subject:
          emailType == "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>
  Click <a href="${process.env.DOMAIN}/verifyemail?token=${verifyToken}">here</a> to
  ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
  or copy and paste the link below in your browser.
  <br/>
  ${process.env.DOMAIN}/verifyEmail?token=${verifyToken}
</p>`,
      });

      console.log("Message sent:", info.messageId);
    })();
  } catch (error) {
    console.log(error);
  }
};
