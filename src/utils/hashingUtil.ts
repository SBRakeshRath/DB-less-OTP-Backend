import crypto from 'crypto';
import { config, configDotenv } from 'dotenv';
configDotenv();

export function hashedOTP(otp: string) {
  return crypto.createHmac('sha256', process.env.CRYPTO_SECRET).update(otp).digest('hex');
}