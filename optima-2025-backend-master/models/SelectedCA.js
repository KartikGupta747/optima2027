const mongoose = require("mongoose");

const SelectedCASchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CARegistration",
      required: true,
      unique: true, // Ensures a user cannot have multiple CA entries
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    college: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    reason: { type: String, required: true },
    selected: { type: Boolean, default: false },
    caID: { type: String, required: true, unique: true }, // Unique CA ID
    opID: { type: [String], default: [] }, // Correctly stores an array of strings
  },
  { timestamps: true }
);

module.exports = mongoose.model("SelectedCA", SelectedCASchema);
