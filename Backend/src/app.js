import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const app = express();

const allowedOrigins = [
  "https://doon-assignment-oasb-ne4bh2gwo-tanujs-projects-ca8ac3a9.vercel.app", // frontend URL
  "http://localhost:3000", // local testing
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow the request if the origin is in the allowedOrigins list or if it's a request with no origin (like from curl/postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow OPTIONS for preflight requests
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  preflightContinue: false, // Don't pass the preflight request to the next middleware
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions)); 

// Middleware to handle JSON requests
app.use(express.json());

// Preflight OPTIONS handling (if needed)
app.options("*", cors(corsOptions));

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
