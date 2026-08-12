const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 5, max: 25 },
    classGrade: { type: String, required: true },
    school: { type: String, required: true },
    location: { type: String, required: true },
    preferredLanguage: { type: String, required: true },
    parentContact: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    assessmentCompleted: { type: Boolean, default: false },
    assessmentAnswers: [{ type: String }],
    recommendations: [
      {
        course: String,
        score: Number,
        reason: String,
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      },
    ],
    recommendedSkill: { type: String, default: '' },
    learningProgress: {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      currentModule: { type: Number, default: 0 },
      completedModules: [{ type: Number }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
