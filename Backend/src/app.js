import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config({ path: "./.env" });

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN, // Frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204, // Response status for preflight
};

// Enable CORS
app.use(cors(corsOptions));

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
