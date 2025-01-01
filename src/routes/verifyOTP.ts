import { Router } from "express";
import { jwtOTPTokenPayload, verifyJWTToken } from "../utils/jwtTokenUtils.js";
import { hashedOTP } from "../utils/hashingUtil.js";
import z from "zod";

const verifyOTP = Router();

verifyOTP.post("/verify-otp", async (req, res) => {
  const schema = z.object({
    otp: z.string(),
    token: z.string(),
  });

  const { otp, token } = schema.parse(req.body);

  const tokenRes = verifyJWTToken(token)
  if (!tokenRes) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }

  const { otp: hashedOtp,email } = tokenRes as jwtOTPTokenPayload


  if (hashedOTP(otp) === hashedOtp) {
    res.status(200).json({ message: "OTP verified for email: " + email });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

export default verifyOTP;