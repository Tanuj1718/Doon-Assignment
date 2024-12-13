import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

const jwtKey = process.env.JWT_SECRET;

// Middleware for Authentication
export const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log("Raw Token:", token);

    if (!token) return res.status(401).send('Access denied. No token provided.');

    const tokenParts = token.split(' ');
    if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
        return res.status(401).send('Access denied. Malformed token.');
    }

    const actualToken = tokenParts[1];

    try {
        const decoded = jwt.verify(actualToken, jwtKey);
        console.log("Decoded Token:", decoded);
        req.user = decoded;
        next();
    } catch (ex) {
        console.error("Token Verification Error:", ex.message);
        res.status(400).send('Invalid token.');
    }
};
