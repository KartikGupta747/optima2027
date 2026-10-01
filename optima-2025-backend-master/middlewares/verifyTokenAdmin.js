const jwt = require("jsonwebtoken");
const users = require("../data/users");

module.exports = verifyTokenAdmin = async (req, res, next) => {
	const token = req.headers["authorization"];
	try {
		if (!token) {
			return res.json({ status: 401, message: "No token provided!" });
		}
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				return res.json({ status: 401, message: "Invalid Token 1" });
			} else {
				let email = decoded.email;
				let role = decoded.role;
				if (users[email]) {
					req.user = role;
					next();
				} else {
					return res.json({
						status: 401,
						message: "Invalid Token 3",
					});
				}
			}
		});
	} catch (error) {
		return res.json({ status: 500, error: error });
	}
};



