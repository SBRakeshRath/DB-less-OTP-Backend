import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
import ejs from "ejs";
configDotenv();
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(process.env.GMAIL_ADDRESS,process.env.GMAIL_PASSWORD)

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function sendEmail(otp: string, email: string) {
  const mailOption = {
    from: process.env.GMAIL_ADDRESS,
    to: email,
    subject: "OTP for your email verification",
    html: await ejs.renderFile(__dirname + "/templates/sendOTP.ejs", { otp }),
  };

  try {
    await transporter.sendMail(mailOption);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
