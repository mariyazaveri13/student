const mongoose = require('mongoose');
const TicketManagementSchema = new mongoose.Schema({
  passenger_name: {
    type: String,
    required: true,
  },
  coach: {
    type: String,
    required: true,
  },
  seat_number: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Tickets', TicketManagementSchema);
