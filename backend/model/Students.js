const mongoose = require('mongoose');
//todo::
//Aggregate
//Sort - done
//filter
//case insesitive search on db - done
//search - done
//a backend check for hobbies - done
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  birthdate: {
    type: Date,
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
    unique: true,
    required: true,
  },
  enrollmentnum: {
    type: Number,
    unique: true,
    min: 1,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  hobbies: {
    type: [String],
    enum: ['Reading', 'Sports', 'Writing', 'Singing', 'Dancing', 'Travelling'],
    required: true,
  },
  semester: {
    type: Number,
    min: 1,
    required: true,
    max: 4,
  },
  paper1: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  paper2: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  paper3: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  result: {
    type: Number,
    min: 0,
    max: 300,
    required: true,
  },
  comments: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Student', StudentSchema);
