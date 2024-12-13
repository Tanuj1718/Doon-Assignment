import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://doon-assignment-oasb-ne4bh2gwo-tanujs-projects-ca8ac3a9.vercel.app'); // Frontend URL
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers (including Authorization)
  res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies, etc.)

  // Handle OPTIONS method (preflight requests)
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Respond to preflight request
  }

  next(); // Pass the request to the next middleware
});

// Middleware to handle JSON requests
app.use(express.json());

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
