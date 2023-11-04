const express = require('express');
const Student = require('../model/Students');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let searchObj = {};

    let query = Student.find();
    let sortObj = {};
    let filterObj = {};

    /*--------------------SORT STARTS--------------------------*/
    if (req.query.sort) {
      if (req.query.sort == 'asc') {
        if (req.query.sortByName) {
          sortObj.name = 1;
        }
        if (req.query.sortByResult) {
          sortObj.result = 1;
        }
        if (req.query.sortByCreatedAt) {
          sortObj.createdAt = 1;
        }
      } else {
        if (req.query.sortByName) {
          sortObj.name = -1;
        }
        if (req.query.sortByResult) {
          sortObj.result = -1;
        }
        if (req.query.sortByCreatedAt) {
          sortObj.createdAt = -1;
        }
      }

      //IMP - .collation({'locale':'en'})
      query = query.collation({ locale: 'en' }).sort(sortObj);
    }
    /*--------------------SORT ENDS--------------------------*/

    /*--------------------SEARCH STARTS--------------------------*/
    if (req.query.searchByName) {
      /*
        Both methods the commented and 
        not commented works.
        Either go for regex or collation
      */

      var regex = new RegExp(['^', req.query.searchByName, '$'].join(''), 'i');
      searchObj.name = regex;
      // searchObj.name = req.query.searchByName;
      //query = query.find(searchObj).collation({ locale: 'en', strength: 2 });
    }

    //EXACT SEARCH
    if (req.query.searchByEmail) {
      searchObj.email = req.query.searchByEmail;
    }

    if (req.query.searchByEnroll) {
      searchObj.enrollmentnum = req.query.searchByEnroll;
    }
    /*--------------------SEARCH ENDS--------------------------*/

    /*--------------------FILTER STARTS--------------------------*/

    //Based on marks

    if (req.query.lessThanResult || req.query.moreThanResult) {
      const ltgt = {};

      if (req.query.lessThanResult) ltgt.$lt = req.query.lessThanResult;
      if (req.query.moreThanResult) ltgt.$gt = req.query.moreThanResult;
      searchObj.result = ltgt;
    }

    //Based on date
    if (req.query.startDate || req.query.endDate) {
      const ltgt = {};
      if (req.query.startDate) ltgt.$gte = new Date(req.query.startDate);
      if (req.query.endDate) ltgt.$lte = new Date(req.query.endDate);
      searchObj.createdAt = ltgt;
    }

    /*--------------------FILTER ENDS--------------------------*/

    console.log(searchObj);
    query = query.find(searchObj);
    const students = await query;
    res.status(200).json({
      message: 'Ok',
      count: students.length,
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
    if (req.body.hobbies && req.body.hobbies.length > 0) {
      const student = await Student.create(req.body);
      return res.status(201).json({
        message: `Student created with Id ${student._id}`,
        student,
      });
    } else {
      return res.status(403).json({
        message: 'Enter hobbies',
      });
    }
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
