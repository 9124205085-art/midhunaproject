const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: 'volunteer', enum: ['volunteer'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);
