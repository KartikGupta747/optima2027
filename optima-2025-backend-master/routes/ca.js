const express = require("express");
const { body, validationResult } = require("express-validator");
const validator = require("validator"); // Import validator package
const CARegistration = require("../models/CARegistration");

const app = express();



// POST route to handle form submissions with validation
app.post(
	"/register",
	[
		// Validation rules for each field
		body("firstName")
			.trim()
			.notEmpty()
			.withMessage("First name is required."),
		body("lastName")
			.trim()
			.notEmpty()
			.withMessage("Last name is required."),
		body("gender").trim().notEmpty().withMessage("Gender is required."),
		body("college").trim().notEmpty().withMessage("College is required."),
		body("email").isEmail().withMessage("Valid email is required."),
		body("phone")
			.trim()
			.notEmpty()
			.withMessage("Phone number is required.")
			.custom((value) => {
				// Use validator to check the phone number format
				if (
					!validator.isMobilePhone(value, "any", {
						strictMode: false,
					})
				) {
					throw new Error("Invalid phone number format.");
				}
				return true;
			}),
		body("city").trim().notEmpty().withMessage("City is required."),
		body("state").trim().notEmpty().withMessage("State is required."),
		body("reason").trim().notEmpty().withMessage("Reason is required."),
	],
	async (req, res) => {
		// Collect validation errors, if any
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json({ message: "Validation errors. Please check the form." });
		}

		try {
			// Check if an entry with the same email already exists
			const existingEmail = await CARegistration.findOne({
				email: req.body.email,
			});

			if (existingEmail) {
				return res.status(400).json({
					message:
						"Email already exists. Please use a different email.",
				});
			}

			// If the email is new, save the form data to the database
			const formData = new CARegistration(req.body);

			await formData.save();

			res.status(201).json({ message: "Form submitted successfully!" });
		} catch (error) {
			// Handle other errors that occur during saving
			console.error("Error saving form data:", error.message);

			res.status(500).json({
				message: "Error submitting form. Please try again later.",
			});
		}
	}
);

module.exports = app;

