const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const validator = require("validator");
const sanitize = require("mongo-sanitize");
const verifyTokenAdmin = require("../middlewares/verifyTokenAdmin");
const users = require("../data/users");
const CARegistration = require("../models/CARegistration");
const SelectedCA = require("../models/SelectedCA");
const Query = require("../models/Query");
const User = require("../models/User"); // Import the Query model

const getToken = (email, role) => {
	return jwt.sign(
		{
			email: email,
			role: role,
		},
		process.env.JWT_SECRET
	);
};

router.post("/login", async (req, res) => {
	let { email, password } = req.body;
	email = sanitize(email).trim().toLowerCase();
	password = sanitize(password).trim();

	if (validator.isEmpty(email) || validator.isEmpty(password)) {
		return res.json({
			status: 800,
			message: "Please fill all the fields!",
		});
	}

	if (!validator.isEmail(email)) {
		return res.json({
			status: 800,
			message: "Please enter a valid email address!",
		});
	}

	if (!users[email]) {
		return res.json({ status: 800, message: "Invalid email address!" });
	}

	if (users[email].password !== password) {
		return res.json({ status: 800, message: "Invalid password!" });
	}

	const token = getToken(email, users[email].role);
	return res.json({
		status: 200,
		message: "Login successful!",
		token: token,
		role: users[email].role,
	});
});

// CA Applicants
// Fetch all students
router.get("/ca-applicant", verifyTokenAdmin, async (req, res) => {
	if (req.user < 1) {
		return res.json({
			status: 800,
			message: "You are not authorized to view this data!",
		});
	}

	try {
		const students = await CARegistration.find();
		res.json({
			status: 200,
			data: students,
			role: req.user,
		});
	} catch (error) {
		console.log(err);
		return res.json({
			status: 800,
			error: err,
		});
	}
});

const generateUniqueCaID = async () => {
	let caID;
	let exists = true;

	while (exists) {
		const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit number
		caID = `OP25CA-${randomDigits}`;

		// Check if this caID already exists in the database
		exists = (await SelectedCA.countDocuments({ caID })) > 0;
	}

	return caID;
};

router.post("/ca-applicant/:id", verifyTokenAdmin, async (req, res) => {
	if (req.user < 2) {
		return res.json({
			status: 800,
			message: "You are not authorized to update this data!",
		});
	}

	const { id } = req.params;
	const { selected } = req.body;

	try {
		// Find the candidate in CARegistration
		const candidate = await CARegistration.findById(id);
		if (!candidate) {
			return res.json({
				status: 800,
				message: `CA with ID ${id} not found`,
			});
		}

		if (selected) {
			// Check if the user is already in SelectedCA
			const existingEntry = await SelectedCA.findOne({
				userId: candidate._id,
			});
			if (existingEntry) {
				return res.json({
					status: 800,
					message: "User is already in the SelectedCA list!",
				});
			}

			// Generate unique caID
			const caID = await generateUniqueCaID();

			// Store selected candidate data in SelectedCA collection
			const newSelectedCA = new SelectedCA({
				userId: candidate._id,
				firstName: candidate.firstName,
				lastName: candidate.lastName,
				gender: candidate.gender,
				college: candidate.college,
				email: candidate.email,
				phone: candidate.phone,
				city: candidate.city,
				state: candidate.state,
				reason: candidate.reason,
				selected: true,
				caID: caID, // Generated unique CA ID
				opID: [], // Set opID as an empty array instead of a string
			});

			await newSelectedCA.save();
			await CARegistration.findByIdAndUpdate(id, { selected: true });

			return res.json({
				status: 200,
				message: "CA selected successfully!",
				caID: caID,
			});
		} else {
			// Remove from SelectedCA if exists
			await SelectedCA.findOneAndDelete({ userId: candidate._id });

			// Update selected status in CARegistration
			await CARegistration.findByIdAndUpdate(id, { selected: false });

			return res.json({
				status: 200,
				message: "CA rejected successfully!",
			});
		}
	} catch (error) {
		console.error("Error:", error);
		return res.json({
			status: 800,
			message: "Error in updating the status of the CA",
			error: error.message,
		});
	}
});

// Fetch all selected CAs
router.get("/selected-cas", verifyTokenAdmin, async (req, res) => {
	if (req.user < 1) {
		return res.json({
			status: 800,
			message: "You are not authorized to view this data!",
		});
	}

	try {
		const updatedCAs = await SelectedCA.aggregate([
			{ $sort: { createdAt: -1 } },
			{
				$lookup: {
					from: "users",
					localField: "opID",
					foreignField: "OPID",
					as: "paymentUsers",
				},
			},
			{
				$addFields: {
					participants: {
						$map: {
							input: "$paymentUsers",
							as: "user",
							in: {
								OPID: "$$user.OPID",
								paymentStatus: "$$user.paymentStatus",
							},
						},
					},
				},
			},
			{
				$project: {
					paymentUsers: 0,
					opID: 0,
				},
			},
		]);

		res.json({
			status: 200,
			data: updatedCAs,
		});
	} catch (error) {
		console.error("Error:", error);
		res.json({
			status: 800,
			message: "Error fetching selected CAs",
			error: error.message,
		});
	}
});

// Route to get all users
router.get("/participants", verifyTokenAdmin, async (req, res) => {
	if (req.user < 1) {
		return res.json({
			status: 800,
			message: "You are not authorized to view this data!",
		});
	}

	try {
		const users = await User.find()
			.select("-password -otp")
			.sort({ createdAt: -1 });

		res.json({
			status: 200,
			data: users,
		});
	} catch (error) {
		console.error("Error:", error);
		res.json({
			status: 800,
			message: "Error fetching users",
			error: error.message,
		});
	}
});

router.get("/participant/:OPID", verifyTokenAdmin, async (req, res) => {
	if (req.user < 1) {
		return res.json({
			status: 800,
			message: "You are not authorized to view this data!",
		});
	}

	try {
		const user = await User.findOne({ OPID: req.params.OPID }).select(
			"-password -otp"
		);

		console.log(req.params.OPID);

		if (!user) {
			return res.json({
				status: 404,
				message: "User not found",
			});
		}

		res.json({
			status: 200,
			data: user,
			token: req.user,
		});
	} catch (error) {
		console.error("Error:", error);
		res.json({
			status: 800,
			message: "Error fetching user",
			error: error.message,
		});
	}
});

// Route to update user payment status
router.post(
	"/participant/payment/:OPID",
	verifyTokenAdmin,
	async (req, res) => {
		if (req.user < 3) {
			return res.json({
				status: 800,
				message: "You are not authorized to perform this action!",
			});
		}

		try {
			const { paymentStatus, paymentAmount, paymentTime } = req.body;

			const user = await User.findOne({ OPID: req.params.OPID });
			if (!user) {
				return res.json({
					status: 404,
					message: "User not found",
				});
			}

			user.paymentStatus = paymentStatus;
			user.paymentAmount = paymentAmount;
			user.paymentTime = paymentStatus ? paymentTime : null;

			await user.save();

			res.json({
				status: 200,
				message: "Payment status updated successfully",
				data: user,
			});
		} catch (error) {
			console.error("Error:", error);
			res.json({
				status: 800,
				message: "Error updating payment status",
				error: error.message,
			});
		}
	}
);

// Route to report participant at RegDesk
router.post("/participant/report/:OPID", verifyTokenAdmin, async (req, res) => {
	if (req.user < 2.5) {
		return res.json({
			status: 800,
			message: "You are not authorized to perform this action!",
		});
	}

	try {
		const { hall } = req.body;

		const user = await User.findOne({ OPID: req.params.OPID });
		if (!user) {
			return res.json({
				status: 404,
				message: "User not found",
			});
		}

		if (user.paymentStatus === false) {
			return res.json({
				status: 800,
				message: "User has not paid",
			});
		}

		if (user.accomodationHostel === hall) {
			return res.json({
				status: 800,
				message: "User already reported at RegDesk",
			});
		}

		user.accomodationHostel = hall;

		await user.save();

		res.json({
			status: 200,
			message: "Participant reported at RegDesk and Hall updated successfully",
			data: user,
		});
	} catch (error) {
		console.error("Error:", error);
		res.json({
			status: 800,
			message: "Error reporting participant",
			error: error.message,
		});
	}
});

// Route to assign merch to participant
router.post("/participant/tshirt/:OPID", verifyTokenAdmin, async (req, res) => {
	if (req.user < 2.5) {
		return res.json({
			status: 800,
			message: "You are not authorized to perform this action!",
		});
	}

	try {
		const { tShirtSize } = req.body;

		const user = await User.findOne({ OPID: req.params.OPID });
		if (!user) {
			return res.json({
				status: 404,
				message: "User not found",
			});
		}

		if (user.paymentStatus === false) {
			return res.json({
				status: 800,
				message: "User has not paid",
			});
		}

		if (user.accomodationHostel === null) {
			return res.json({
				status: 800,
				message: "User has not reported at RegDesk",
			});
		}

		if (user.tShirtSize && user.tShirtSize !== "") {
			return res.json({
				status: 800,
				message: "User already has a T-shirt",
			});
		}

		const tshirtEnum = ["XS", "S", "M", "L", "XL", "XXL"];
		if (!tshirtEnum.includes(tShirtSize)) {
			return res.json({
				status: 800,
				message: "Invalid T-shirt size",
			});
		}

		user.tShirtSize = tShirtSize;

		await user.save();

		res.json({
			status: 200,
			message: "Participant T-shirt given successfully",
			data: user,
		});
	} catch (error) {
		console.error("Error:", error);
		res.json({
			status: 800,
			message: "Error assigning T-shirt to participant",
			error: error.message,
		});
	}
});

//query section
router.post("/query", async (req, res) => {
	try {
		let { name, email, phone, query } = req.body;

		// Sanitize inputs
		name = sanitize(name).trim();
		email = sanitize(email).trim();
		phone = sanitize(phone).trim();
		query = sanitize(query).trim();

		// Validate inputs
		if (!name || !email || !phone || !query) {
			return res.status(400).json({ message: "All fields are required" });
		}
		if (!validator.isEmail(email)) {
			return res.status(400).json({ message: "Invalid email format" });
		}
		if (!validator.isMobilePhone(phone, "any", { strictMode: false })) {
			return res.status(400).json({ message: "Invalid phone number" });
		}

		// Save the query
		const newQuery = new Query({ name, email, phone, query });
		await newQuery.save();

		res.status(201).json({ message: "Query submitted successfully" });
	} catch (error) {
		console.error("Error submitting query:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

// Route to fetch all queries (for admin only)
router.get("/queries", verifyTokenAdmin, async (req, res) => {
	if (req.user < 1) {
		return res
			.status(403)
			.json({ status: 403, message: "Unauthorized access" });
	}

	try {
		const queries = await Query.find().sort({ createdAt: -1 });

		// Ensure the response matches the expected format
		res.status(200).json({
			status: 200,
			message: "Queries fetched successfully",
			data: queries,
		});
	} catch (error) {
		console.error("Error fetching queries:", error);
		res.status(500).json({ status: 500, message: "Internal Server Error" });
	}
});

// Update user profile
// router.post("/profile", verifyToken, async (req, res) => {
// 	try {
// 		const updates = req.body;
// 		delete updates.password; // Prevent password update through this route

// 		const user = await User.findByIdAndUpdate(
// 			req.user.userId,
// 			{ $set: updates },
// 			{ new: true }
// 		).select("-password");

// 		res.json({ message: "Profile updated successfully", user });
// 	} catch (error) {
// 		res.status(500).json({
// 			message: "Error updating profile",
// 			error: error.message,
// 		});
// 	}
// });

module.exports = router;
