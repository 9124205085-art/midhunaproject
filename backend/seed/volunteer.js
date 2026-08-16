require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('../config/database');
const Volunteer = require('../models/Volunteer');

/**
 * Safe upsert for demo volunteer credentials.
 * Run: node seed/volunteer.js
 */
const seedVolunteer = async () => {
  try {
    await connectDB();
    const username = 'volunteer';
    const hashed = await bcrypt.hash('volunteer123', 10);

    const existing = await Volunteer.findOne({ username });
    if (existing) {
      existing.name = 'Priya';
      existing.password = hashed;
      existing.role = 'volunteer';
      await existing.save();
      console.log('Updated volunteer: username=volunteer password=volunteer123');
    } else {
      await Volunteer.create({
        name: 'Priya',
        username,
        password: hashed,
        role: 'volunteer',
      });
      console.log('Created volunteer: username=volunteer password=volunteer123');
    }
    process.exit(0);
  } catch (error) {
    console.error('Volunteer seed failed:', error);
    process.exit(1);
  }
};

seedVolunteer();
