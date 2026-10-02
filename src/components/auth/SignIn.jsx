import React, { useEffect, useState } from "react";
import Section from "../Section";
import { BackgroundCircles } from "../design/Hero";
import { Gradient } from "../design/Services";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
	const navigate = useNavigate();
	const { login, isAuthenticated } = useAuth();
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/profile");
		}
	}, [isAuthenticated]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// ... existing code ...

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/user/signin`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Sign in failed");
			}

			login(data.token);
			navigate("/profile");
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	// ... existing code ...
	return (
		<Section className="pt-[5rem] ">
			<div className="container relative z-2">
				<div className="relative -z-10">
					<BackgroundCircles />
				</div>

				<div className="max-w-[440px] mx-auto bg-n-6/80 rounded-2xl p-4">
					<div className="flex flex-col items-center mb-10">
						<h1 className="text-4xl font-bold mb-4">
							Welcome Back
						</h1>
						<p className="text-n-4">Sign in to your account</p>
					</div>

					{error && (
						<div className="text-red-500 text-center mb-4">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-4">
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="Email"
								className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1"
								required
							/>

							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								placeholder="Password"
								className="w-full px-4 py-3 bg-n-8/80 rounded-lg border border-n-6 focus:outline-none focus:border-primary-1"
								required
							/>

							<div className="flex justify-end">
								<a
									href="/reset-password"
									className="text-primary-1 hover:text-primary-2 text-sm"
								>
									Forgot Password?
								</a>
							</div>
						</div>

						<Button className="w-full" disabled={isLoading}>
							{isLoading ? "Signing In..." : "Sign In"}
						</Button>

						<p className="text-center text-n-4">
							Not yet registered ?{" "}
							<a
								href="/register"
								className="text-primary-1 hover:text-primary-2"
							>
								Sign Up
							</a>
						</p>
					</form>
				</div>
			</div>
			<Gradient />
		</Section>
	);
};

export default SignIn;
