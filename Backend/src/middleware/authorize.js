// Middleware for Role Authorization
  
  export const authorize = (role) => {
    return (req, res, next) => {
        console.log("User from Token:", req.user, role); // Log user info
        if (!req.user || role != 'admin') {
            return res.status(403).send('Access denied.');
        }
        next();
    };
};
