const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    skill: { type: String, required: true },
    date: { type: String, required: true },
    day: { type: String, required: true, enum: ['Saturday', 'Sunday', 'Holiday'] },
    time: { type: String, required: true },
    communityCentre: { type: String, required: true },
    location: { type: String, required: true },
    volunteerName: { type: String, required: true },
    availableSeats: { type: Number, required: true, min: 0 },
    totalSeats: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Class', classSchema);
