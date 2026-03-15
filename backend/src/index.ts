import express from "express";
import * as dotenv from "dotenv";
import userRoute from "./routes/register.route.js";
import achievementRouter from "./routes/achievement.route.js";
import divisionRouter from "./routes/division.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/achievement", achievementRouter);
app.use("/api/division", divisionRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
