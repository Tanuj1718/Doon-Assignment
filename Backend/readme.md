changes package.json
use type module for import statements

USE .js IN EVERY IMPORT STATEMENT

mongodb url is from taken from compass
starting my server only when the database connection is successfull

utils->asyncHandler.js is for avoiding try catch. Everytime we write try-catch , instead of it we wrap our code into asyncHandler and it will handle the error part

utils->ApiResponse.js is for sending success response to the frontend in a structured way

utils->ApiError.js is for sending error response to the frontend. It using the builtin interface 'Error'

TODO
login functionality
google gemini ai integration
