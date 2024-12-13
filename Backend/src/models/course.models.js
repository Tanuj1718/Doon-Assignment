import mongoose, {Schema} from "mongoose"

const courseSchema = new Schema({
    title: String,
    description: String,
    duration: String,
    instructor: String,  
}, {timestamps: true})

export const Course = mongoose.model("Course", courseSchema)