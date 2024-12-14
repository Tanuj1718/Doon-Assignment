import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'https://doon-assignment-es7cs9zq3-tanujs-projects-ca8ac3a9.vercel.app/',
    credentials: true,
  })
);

// Import your routes
import signupRouter from "./routes/signup.routes.js";
import signinRouter from "./routes/signin.routes.js";
import addCourseRouter from "./routes/addCourse.routes.js";
import getCourseRouter from "./routes/getCourse.routes.js";
import deleteCourseRouter from "./routes/deleteCourse.routes.js";
import enrollInCourseRouter from "./routes/enrollInCourse.routes.js";
import updateCourseRouter from "./routes/updateCourse.routes.js";

// Use routes
app.use('/api', signupRouter, signinRouter, addCourseRouter, getCourseRouter, deleteCourseRouter, enrollInCourseRouter, updateCourseRouter);

export { app };
