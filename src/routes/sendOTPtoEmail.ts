import { Router } from "express";
import { createOTP } from "../utils/otpUtils.js";
import { hashedOTP } from "../utils/hashingUtil.js";
import { sendEmail } from "../emails/email.js";
import { createJWTToken } from "../utils/jwtTokenUtils.js";

import z from "zod";

const sendOtpToEmail = Router();

sendOtpToEmail.post("/send-otp-to-email", async (req, res) => {
  const schema = z.object({
    email: z.string().email(),
  });

  const reqData = schema.safeParse(req.body);
  if(!reqData.success) {
    res.status(400).json({ message: "Invalid email" });
    return;
  }

  const { email } = reqData.data;

  const otp = createOTP(6);
  const hashedOtp = hashedOTP(otp);

  try {
    if (await sendEmail(otp, email)) {
      const jwtToken = createJWTToken({ email, otp: hashedOtp });
      res.status(200).json({ message: "OTP sent to email", token: jwtToken });
      return ;
    }
    res.status(500).json({ message: "Failed to send OTP" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

export default sendOtpToEmail;
