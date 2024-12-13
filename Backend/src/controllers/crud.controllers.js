import { Course } from "../models/course.models.js";
import { User } from "../models/user.models.js";

//Adding a course by admin
const AddCourse = async (req, res) => {
    try {
        const { title, description, duration, instructor } = req.body;
        const course = new Course({ title, description, duration, instructor });
        await course.save();
        res.status(201).send(course);      
    } catch (error) {
        console.error('Error during adding course:', error);
        res.status(500).json({ message: 'Server error during adding course' });
    }
};

//Fetching a courses
const GetCourse = async (req, res) => {
    try {
        const courses = await Course.find();
        res.send(courses);
      
    } catch (error) {
        console.error('Error during fetching course:', error);
        res.status(500).json({ message: 'Server error during fetching course' });
    }
};

//Updating a course
const UpdateCourse = async (req, res) => {
    try {
        const { title, description, duration, instructor } = req.body;
        const course = await Course.findByIdAndUpdate(
          req.params.id,
          { title, description, duration, instructor },
          { new: true }
        );
        if (!course) return res.status(404).send('Course not found.');
        res.send(course);
    } catch (error) {
        console.error('Error during updating course:', error);
        res.status(500).json({ message: 'Server error during updating course' });
    }
};

//Deleting a course
const DeleteCourse = async (req, res) => {
    try {
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) return res.status(404).send('Course not found.');
      res.send({ message: 'Course deleted successfully.' });
    } catch (error) {
      console.error('Error during deleting course:', error);
      res.status(500).json({ message: 'Server error during deleting course' });
    }
  };
  

//Enrolling in a course
const EnrollInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) return res.status(404).send('Course not found.');
      
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).send('User not found.');
      
        if (!user.enrolledCourses.includes(course._id)) {
          user.enrolledCourses.push(course._id);
          await user.save();
        }
      
        res.send({ message: 'Enrolled successfully.', enrolledCourses: user.enrolledCourses });
      
    } catch (error) {
        console.error('Error during enrolling in course:', error);
        res.status(500).json({ message: 'Server error during enrolling in course' });
    }
};

export {AddCourse, GetCourse, UpdateCourse, DeleteCourse, EnrollInCourse}