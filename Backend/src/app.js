import express from "express"
import cors from "cors"
const app = express()
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})




app.use(cors())
//common middlewares
app.use(express.json())

//import routes
import signupRouter from "./routes/signup.routes.js"
import signinRouter from "./routes/signin.routes.js"
import addCourseRouter from "./routes/addCourse.routes.js"
import getCourseRouter from "./routes/getCourse.routes.js"
import deleteCourseRouter from "./routes/deleteCourse.routes.js"
import enrollInCourseRouter from "./routes/enrollInCourse.routes.js"
import updateCourseRouter from "./routes/updateCourse.routes.js"

app.use('/api', signupRouter, signinRouter, addCourseRouter, getCourseRouter, deleteCourseRouter, enrollInCourseRouter, updateCourseRouter)
export {app}