const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phone: { type: String, required: true },
		college: { type: String, required: true },
		age: { type: Number, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		gender: { type: String, required: true },
		yearOfStudy: { type: String, required: true },
		caID: { type: String, default: null },
		OPID: {
			type: String,
			unique: true,
		},
		tShirtSize: {
			type: String,
			enum: ["", "XS", "S", "M", "L", "XL", "XXL"],
			required: false,
		},
		tShirtProvided: {
			// field not required and used
			type: Boolean,
			default: false,
		},
		paymentStatus: {
			type: Boolean,
			default: false,
		},
		paymentAmount: {
			type: Number,
			default: 0,
		},
		paymentTime: {
			type: Date,
			default: null,
		},
		otp: {
			code: String,
			expiresAt: Date,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		accomodationHostel: {
			type: String,
			default: null,
		},
	},
	{ timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error);
	}
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateOPID = function () {
	const random = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
	const opid = `OP25-${random}`;
	return opid;
};

// Add method to generate OTP
UserSchema.methods.generateOTP = function () {
	const otp = Math.floor(100000 + Math.random() * 900000).toString();
	this.otp = {
		code: otp,
		expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
	};

	return otp;
};

module.exports = mongoose.model("User", UserSchema);
