require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const ClassSession = require('../models/Class');
const { getUpcomingWeekendDates } = require('../utils/weekendValidation');

/**
 * Seed demo weekend/holiday community classes with future dates.
 * Run: node seed/classes.js
 */
const seedClasses = async () => {
  try {
    await connectDB();
    await ClassSession.deleteMany({});

    const weekends = getUpcomingWeekendDates(4);
    // Ensure we have Sat, Sun, Sat, Sun pattern if possible
    const templates = [
      {
        skill: 'Abacus',
        title: 'Beginner Abacus Workshop',
        description:
          'Learn the fundamentals of Abacus through simple activities and guided practice.',
        location: 'Community Learning Center',
        facilitator: 'Priya',
        capacity: 20,
        startTime: '10:00 AM',
        endTime: '12:00 PM',
      },
      {
        skill: 'Coding',
        title: 'Introduction to Coding',
        description:
          'Discover basic programming ideas and computational thinking with beginner-friendly activities.',
        location: 'Community Learning Center',
        facilitator: 'Arun',
        capacity: 20,
        startTime: '10:00 AM',
        endTime: '12:00 PM',
      },
      {
        skill: 'Communication Skills',
        title: 'Speak with Confidence',
        description:
          'Practice speaking, vocabulary and everyday communication in a supportive group setting.',
        location: 'Government School Community Room',
        facilitator: 'Meena',
        capacity: 15,
        startTime: '10:00 AM',
        endTime: '12:00 PM',
      },
      {
        skill: 'Logical Reasoning',
        title: 'Problem Solving Basics',
        description:
          'Strengthen logical thinking with patterns, sequences and guided problem-solving practice.',
        location: 'Community Learning Center',
        facilitator: 'Rahul',
        capacity: 15,
        startTime: '10:00 AM',
        endTime: '12:00 PM',
      },
    ];

    const docs = templates.map((t, i) => {
      const weekend = weekends[i] || weekends[weekends.length - 1];
      return {
        ...t,
        date: weekend.date,
        day: weekend.day,
        registeredStudents: [],
      };
    });

    await ClassSession.insertMany(docs);
    console.log(`Seeded ${docs.length} weekend community classes:`);
    docs.forEach((d) => console.log(` - ${d.day} ${d.date}: ${d.skill} — ${d.title}`));
    process.exit(0);
  } catch (error) {
    console.error('Class seed failed:', error);
    process.exit(1);
  }
};

seedClasses();
