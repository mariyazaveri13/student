const express = require('express');
const Tickets = require('../model/Tickets');

const router = express.Router();

router.get('/ticketExaminer', async (req, res) => {
  try {
    const searchObj = {};
    let id = req.query.id;
    let status = req.query.status;

    let query = Tickets.find();

    if (id) {
      searchObj._id = id;
    }
    if (status) {
      searchObj.status = status;
    }

    query = query.find(searchObj);

    let data = await query;

    if (data.length == 0) {
      return res.status(404).json({
        message: 'No data found',
      });
    }

    return res.status(201).json(data);
  } catch (error) {
    return res.status(400).json({});
  }
});

router.patch('/ticketExamier/:id', async (req, res) => {
  try {
    let id = req.params.id;

    const newData = await Tickets.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });

    return res.status(200).json({
      message: 'Ticket status updated',
    });
  } catch (error) {
    res.status(400).json({});
  }
});

module.exports = router;
