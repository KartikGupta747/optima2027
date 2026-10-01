const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const SelectedCA = require("../models/SelectedCA");
const verifyToken = require("../middlewares/verifyToken");
const { sendOTP } = require("../utils/emailService");

const router = express.Router();

const validateUser = [
	body("fullName").trim().notEmpty().withMessage("Full name is required"),
	body("email").isEmail().withMessage("Valid email is required"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters"),
	body("phone").trim().notEmpty().withMessage("Phone number is required"),
	body("college").trim().notEmpty().withMessage("College is required"),
	body("city").trim().notEmpty().withMessage("City is required"),
	body("state").trim().notEmpty().withMessage("State is required"),
	body("gender").trim().notEmpty().withMessage("Gender is required"),
	body("age").trim().notEmpty().withMessage("Age is required"),
	body("yearOfStudy")
		.trim()
		.notEmpty()
		.withMessage("Year of study is required"),
];

// Registration route
router.post("/register", validateUser, async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email: req.body.email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Create new user
		const user = new User(req.body);
		while (true) {
			user.OPID = user.generateOPID();
			const checkUser = await User.findOne({ OPID: user.OPID });
			if (!checkUser) {
				break;
			}
		}
		user.isVerified = true; // Set verified to true by default

		// If caID is provided, verify and update SelectedCA
		if (user.caID) {
			const selectedCA = await SelectedCA.findOne({ caID: user.caID });
			if (!selectedCA) {
				return res.status(400).json({
					message: "Invalid CA ID. Please check the CA ID.",
				});
			}
			selectedCA.opID.push(user.OPID);
			await selectedCA.save();
		}

		await user.save();

		// Create JWT token
		const token = jwt.sign(
			{
				userId: user._id,
			},
			process.env.JWT_SECRET
			// {
			// 	expiresIn: "24h",
			// }
		);

		res.status(201).json({
			message: "User registered successfully",
			token,
			user: {
				id: user._id,
				fullName: user.fullName,
				email: user.email,
			},
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: "Error registering user",
			error: error.message,
		});
	}
});

// Initialize password reset
router.post("/password-reset-init", async (req, res) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const otp = user.generateOTP();
		await user.save();

		await sendOTP(email, otp, "password reset");

		res.json({
			message: "Password reset OTP sent",
			userId: user._id,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error initiating password reset",
			error: error.message,
		});
	}
});

// Complete password reset
router.post("/password-reset-complete", async (req, res) => {
	try {
		const { userId, otp, newPassword } = req.body;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		if (!user.otp || !user.otp.code || user.otp.expiresAt < new Date()) {
			return res.status(400).json({ message: "OTP expired" });
		}

		if (user.otp.code !== otp) {
			return res.status(400).json({ message: "Invalid OTP" });
		}

		// Update password and clear OTP
		user.password = newPassword;
		user.otp = undefined;
		await user.save();

		res.json({ message: "Password reset successful" });
	} catch (error) {
		res.status(500).json({
			message: "Error resetting password",
			error: error.message,
		});
	}
});

// Signin route
router.post("/signin", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find user
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(401)
				.json({ message: "User doesn not exist. Please sign up!" });
		}

		// Verify password
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials!" });
		}

		// Create token
		const token = jwt.sign(
			{
				userId: user._id,
			},
			process.env.JWT_SECRET
			// {
			// 	expiresIn: "24h",
			// }
		);

		res.json({
			token,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error signing in",
			error: error.message,
		});
	}
});

// Get user profile
router.get("/profile", verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({
			message: "Error fetching profile",
			error: error.message,
		});
	}
});

module.exports = router;
