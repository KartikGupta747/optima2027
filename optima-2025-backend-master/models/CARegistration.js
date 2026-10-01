const mongoose = require("mongoose");

const CARegistration = new mongoose.Schema(
	{
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		gender: { type: String, required: true, trim: true },
		college: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true, unique: true }, // Ensures the email is unique
		phone: { type: String, required: true, trim: true },
		city: { type: String, required: true, trim: true },
		state: { type: String, required: true, trim: true },
		reason: { type: String, required: true, trim: true },
		selected: { type: Boolean, default: false }, // A boolean field with default value as false
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

module.exports = mongoose.model(
	"CARegistration",
	CARegistration,
	"CARegistration"
);

