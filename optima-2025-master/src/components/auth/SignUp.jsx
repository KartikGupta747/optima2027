import React, { useEffect, useState } from "react";
import Section from "../Section";
import { BackgroundCircles } from "../design/Hero";
import { Gradient } from "../design/Services";
import Button from "../Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
	const [searchParams] = useSearchParams();
	const caID = searchParams.get("caID");

	const navigate = useNavigate();
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
		phone: "",
		college: "",
		city: "",
		age: "",
		state: "",
		gender: "",
		yearOfStudy: "",
		campusAmbassadorId: caID || "",
		isFromIITKGP: false,
	});

	const { isAuthenticated } = useAuth();
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/profile");
		}
	}, [isAuthenticated]);

	const handleChange = (e) => {
		const value =
			e.target.type === "checkbox" ? e.target.checked : e.target.value;
		setFormData({
			...formData,
			[e.target.name]: value,
			...(e.target.name === "isFromIITKGP" && value
				? { college: "IIT Kharagpur" }
				: {}),
		});
	};

	const showError = (message) => {
		setError(message);
		alert(message);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		if (formData.password !== formData.confirmPassword) {
			showError("Passwords do not match");
			setIsLoading(false);
			return;
		}

		if (formData.password.length < 6) {
			showError("Password must be at least 6 characters");
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/user/register`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...formData,
						caID: formData.campusAmbassadorId || undefined,
					}),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				if (data.errors) {
					const errorMessages = data.errors.map((err) => err.msg).join(", ");
					throw new Error(errorMessages);
				}
				throw new Error(data.message || "Registration failed");
			}

			login(data.token);
			navigate("/profile");
		} catch (err) {
			showError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Section className="pt-[5rem] ">
			<div className="container relative z-2">
				<div className="relative -z-10">
					<BackgroundCircles />
				</div>

				<div className="max-w-[540px] mx-auto bg-n-6/80 rounded-2xl p-4">
					<div className="flex flex-col items-center mb-10">
						<h1 className="text-4xl font-bold mb-4">Register</h1>
						<p className="text-n-4">Register for Optima 2025</p>
					</div>

					{error && (
						<div className="text-red-500 text-center mb-4">{error}</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-4">
							<input
								type="text"
								name="fullName"
								value={formData.fullName}
								onChange={handleChange}
								placeholder="Full Name"
								className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1"
								required
							/>

							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="Email"
								className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1"
								required
							/>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<input
									type="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									placeholder="Password"
									className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1"
									required
									minLength={6}
								/>
								<input
									type="password"
									name="confirmPassword"
									value={formData.confirmPassword}
									onChange={handleChange}
									placeholder="Confirm Password"
									className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1"
									required
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
								<input
									type="tel"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									placeholder="Phone Number"
									pattern="[0-9]{10}"
									className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1 col-span-3"
									required
								/>
								<input
									type="number"
									name="age"
									value={formData.age}
									onChange={handleChange}
									placeholder="Age"
									className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1 col-span-1"
									required
								/>
							</div>

							<div className="flex items-center gap-2 mb-2 px-2">
								<input
									type="checkbox"
									name="isFromIITKGP"
									checked={formData.isFromIITKGP}
									onChange={handleChange}
									className="w-4 h-4"
								/>
								<label className="text-white">
									Currently studying in IIT Kharagpur
								</label>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<input
									type="text"
									name="college"
									value={formData.college}
									onChange={handleChange}
									placeholder="College"
									className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1"
									required
									disabled={formData.isFromIITKGP}
								/>
								<input
									type="text"
									name="city"
									value={formData.city}
									onChange={handleChange}
									placeholder="City"
									className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1"
									required
								/>
							</div>

							<input
								type="text"
								name="state"
								value={formData.state}
								onChange={handleChange}
								placeholder="State"
								className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1"
								required
							/>

							<select
								className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1"
								required
								name="gender"
								value={formData.gender}
								onChange={handleChange}
							>
								<option value="">Select Gender</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>

							<select
								className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1"
								required
								name="yearOfStudy"
								value={formData.yearOfStudy}
								onChange={handleChange}
							>
								<option value="">Year of Study</option>
								<option value="1">1st Year</option>
								<option value="2">2nd Year</option>
								<option value="3">3rd Year</option>
								<option value="4">4th Year</option>
								<option value="other">Other</option>
							</select>

							<input
								type="text"
								name="campusAmbassadorId"
								value={formData.campusAmbassadorId}
								onChange={handleChange}
								placeholder="Campus Ambassador ID (optional)"
								className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1"
							/>
						</div>

						<Button className="w-full" disabled={isLoading}>
							{isLoading ? "Registering..." : "Register"}
						</Button>

						<p className="text-center text-n-4">
							Already registered?{" "}
							<a href="/signin" className="text-primary-1 hover:text-primary-2">
								Sign in
							</a>
						</p>
					</form>
				</div>
			</div>
			<Gradient />
		</Section>
	);
};

export default SignUp;
