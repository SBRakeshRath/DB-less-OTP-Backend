//createJWTToken.ts
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

export type jwtOTPTokenPayload = {
  otp: string;
  email: string;
};

const jwtSecret = process.env.JWT_SECRET;

export function createJWTToken(payload: jwtOTPTokenPayload) {
  return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
}
export function verifyJWTToken(token: string) {


  try {
    if(!jwt.verify(token, jwtSecret)) {
      return null;
    }
    return jwt.verify(token, jwtSecret);
    
  } catch (error) {
    return null;
    
  }


}
