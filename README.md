# Learning Management System (LMS)

This is a simple Learning Management System (LMS) that allows admins to manage courses and users to browse and enroll in them. The application has two distinct views: Admin and User.

## Features

### Admin View
- **Dashboard**: Displays a list of all courses with options to add, update, or delete courses.
- **Add/Edit Course**: Form to add or update course details such as Title, Description, Duration, and Instructor Name.

### User View
- **Course Catalog**: Displays a list of all available courses.
- **Course Details**: Shows detailed information about a selected course.
- **Enroll in Course**: Allows users to enroll in courses.

## Technologies Used

- **Frontend**: 
  - **Next.js** (React framework) for building the user interface.
  - **TypeScript** for type safety.
  - **Tailwind CSS** for styling and responsive design.
  
- **Backend**: 
  - **Node.js** with **Express.js** to create RESTful APIs.
  - **MongoDB** to store courses and user data.

- **Authentication**: Basic hardcoded authentication for Admin (username: `admin0`, password: `123456`).

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
  
### Steps to Run the Application

#### 1. Clone the repository

git clone <https://github.com/Tanuj1718/DoonAssignment>

2. Install dependencies
For both frontend and backend:


# In the backend folder
`cd Backend`

`npm install`

# In the frontend folder
`cd frontend`

`npm install`


3. Set up MongoDB (env_sample.txt file is provided)
Make sure you have MongoDB installed or use MongoDB Atlas for the database. Update the MongoDB connection string in the backend code to point to your MongoDB instance.


4. Run the Backend Server
# In the backend folder
npm run dev


5. Run the Frontend Server
# In the frontend folder
npm run dev


6. Access the Application
Once both servers are running, open your browser and navigate to:

Admin Login: Go to http://localhost:3000/admin and log in using:

* Username: admin0
* Password: 123456


User View: Go to http://localhost:3000 to browse courses.

## Endpoints
* Admin Routes

GET /admin/courses - Get all courses.

POST /admin/courses - Add a new course.

PUT /admin/courses/:id - Update an existing course.

DELETE /admin/courses/:id - Delete a course.

* User Routes

GET /courses - Get all courses (for browsing).

GET /courses/:id - Get details of a specific course.

POST /users/enroll/:courseId - Enroll a user in a course.

* Authentication
Admin Authentication

The Admin login is hardcoded with the following credentials:
Username: admin0
Password: 123456
Admin authentication is handled by verifying the credentials and setting a session or token (hardcoded for simplicity in this version).

## User Authentication
* Currently, users do not have an authentication system. The enrolled courses are stored in the database based on the user's enrollment actions.


## Future Enhancements
* Implement full authentication (JWT-based) for users.
* Add user registration and login functionality.
* Improve role management and permissions.
* Implement more detailed course search functionality and user profiles.


## Notes
* This project is intended as a basic implementation of an LMS with separate Admin and User views.
* Some functionalities (such as user authentication and full course management features) are still missing and can be added as future improvements (Because of my internals)
* If you encounter any issues or have suggestions, feel free to open an issue on the repository.
