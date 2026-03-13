import express from "express";
import * as dotenv from "dotenv";
import userRoute from "./routes/register.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
