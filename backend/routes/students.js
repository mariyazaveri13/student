const express = require('express');
const Student = require('../model/Students');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      message: 'Ok',
      students,
    });
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    //todo validate marks from 300

    const result = req.body.paper1 + req.body.paper2 + req.body.paper3;
    req.body.result = result;
    const student = await Student.create(req.body);
    res.status(201).json({
      message: `Student created with Id ${student._id}`,
      student,
    });
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const students = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      message: 'Student Data updated successfully',
      students,
    });
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const students = await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Student data deleted',
    });
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
});

module.exports = router;
