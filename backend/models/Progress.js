const mongoose = require('mongoose');

/**
 * Phase 8 — Learning progress (one record per student + skill)
 */
const progressSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
      index: true,
    },
    skillId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    completedModules: [
      {
        moduleId: { type: String, required: true },
        completedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

progressSchema.index({ studentId: 1, skillId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
