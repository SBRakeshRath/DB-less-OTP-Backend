import express from "express";
const app = express();
import { NextFunction } from "express";

app.use(
  express.json({
    strict: true,
    limit: "10kb",
  })
);

app.use(express.urlencoded({ extended: true }));
import cors from "cors";
app.use(cors(
{
  origin: "*", // allow all origins

}


));
import { configDotenv } from "dotenv";
configDotenv();

import sendOtpToEmail from "../routes/sendOTPtoEmail.js";
import verifyOTP from "../routes/verifyOTP.js";
app.use("/db-less-otp",sendOtpToEmail);
app.use("/db-less-otp",verifyOTP);

// handel un-handled routes
app.use((req, res) => {
  res.status(404).json({ message: "API_ROUTE_NOT_FOUND" });
});

//handel error

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    if (err.type === "entity.parse.failed") {
      res.status(400).json({ message: "Invalid JSON payload passed." });
      return;
    }
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
