const express = require('express');
const connectDB = require('./db/connection');
const colors = require('colors');
const students = require('./routes/students');
//connect to database
connectDB();

const app = express();

//body parser
app.use(express.json());

//Mount routes
app.use('/students', students);

const PORT = 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in DEV mode on Port ${PORT}`.yellow.bold)
);

//handle promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  //close server and exit process
  server.close(() => process.exit(1));
});
