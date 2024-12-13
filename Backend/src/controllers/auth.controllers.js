import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})

const jwtKey = process.env.JWT_SECRET



const Signup = async (req, res) => {
    try {
        console.log("Received")
        const { username, password, role } = req.body;
        console.log(username+password+role)

        if (!username || !password ) {
            console.log(username+password);
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username,
            password: hashedPassword,
            role: role
        });
        console.log(newUser);

        res.status(200).json({
            username: newUser.username,
            Date: new Date().toLocaleDateString("de-DE")
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
};


const Signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password!' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid username or password!' });
        }

        const expirationTime = Date.now() + 2 * 60 * 60 * 1000; // 24 hours
        const token = jwt.sign({ username: user.username }, jwtKey, {
            expiresIn: '2h'
        });

        res.status(200).json({
            username: user.username,
            token
        });
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({ message: 'Server error during signin' });
    }
};

export {Signup, Signin}