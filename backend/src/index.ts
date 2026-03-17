import express from "express";
import * as dotenv from "dotenv";
import userRoute from "./routes/register.route.js";
import achievementRouter from "./routes/achievement.route.js";
import divisionRouter from "./routes/division.route.js";
import competitionRouter from "./routes/competition.routes.js";
import blogRouter from "./routes/blog.route.js";
import memberRouter from "./routes/member.route.js";
import meetingRouter from "./routes/meeting.route.js";
import attendanceRouter from "./routes/attendance.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/achievement", achievementRouter);
app.use("/api/division", divisionRouter);
app.use("/api/competition", competitionRouter);
app.use("/api/blog", blogRouter);
app.use("/api/member", memberRouter);
app.use("/api/meeting", meetingRouter);
app.use("/api/attendance", attendanceRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
