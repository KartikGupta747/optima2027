import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineBookmarks } from "react-icons/md";

function Form() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		gender: "",
		college: "",
		email: "",
		phone: "",
		city: "",
		state: "",
		reason: "",
	});

	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);

	const navigate = useNavigate();

	// Handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	// Validate the form fields
	const validate = () => {
		const tempErrors = {};
		const phoneRegex = /^\+91\d{10}$/;
		const emailRegex = /\S+@\S+\.\S+/;

		if (!formData.firstName)
			tempErrors.firstName = "First name is required.";
		if (!formData.lastName) tempErrors.lastName = "Last name is required.";
		if (!formData.gender) tempErrors.gender = "Please select a gender.";
		if (!formData.college) tempErrors.college = "College name is required.";
		if (!formData.email) {
			tempErrors.email = "Email is required.";
		} else if (!emailRegex.test(formData.email)) {
			tempErrors.email = "Email is not valid.";
		}
		if (!formData.phone) {
			tempErrors.phone = "Phone number is required.";
		} else if (!phoneRegex.test(formData.phone)) {
			tempErrors.phone =
				"Phone number must be in the format +91XXXXXXXXXX.";
		}
		if (!formData.city) tempErrors.city = "City is required.";
		if (!formData.state) tempErrors.state = "State is required.";
		if (!formData.reason) tempErrors.reason = "This field is required.";

		setErrors(tempErrors);
		return Object.keys(tempErrors).length === 0;
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validate()) {
			setSubmitting(true);
			try {
				const response = await axios.post(
					import.meta.env.VITE_API_BACKEND_URL + "/ca/register",
					formData
				);
				alert(response.data.message);
				navigate("/");
			} catch (error) {
				alert(
					error.response?.data?.message ||
						"Failed to submit form. Please try again."
				);
			} finally {
				setSubmitting(false);
			}
		}
	};

	return (
		<div
			id="register"
			className="flex flex-col items-center justify-center text-white mx-5"
		>
			<div className="text-center mb-8">
				<h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-14 tracking-wide">
					<span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
						Campus Ambassador Registration
					</span>
				</h2>
			</div>
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-[780px] bg-neutral-800 p-8 rounded-lg shadow-md"
			>
				<div className="grid gap-6 md:grid-cols-2">
					<InputField
						label="First Name"
						type="text"
						name="firstName"
						value={formData.firstName}
						onChange={handleInputChange}
						error={errors.firstName}
						placeholder="Enter your first name"
					/>

					<InputField
						label="Last Name"
						type="text"
						name="lastName"
						value={formData.lastName}
						onChange={handleInputChange}
						error={errors.lastName}
						placeholder="Enter your last name"
					/>
				</div>

				<div className="grid gap-6 mt-4 md:grid-cols-2">
					<SelectField
						label="Gender"
						name="gender"
						value={formData.gender}
						onChange={handleInputChange}
						options={["Male", "Female"]}
						error={errors.gender}
					/>

					<InputField
						label="College Name"
						type="text"
						name="college"
						value={formData.college}
						onChange={handleInputChange}
						error={errors.college}
						placeholder="Enter your college name"
					/>
				</div>

				<div className="grid gap-6 mt-4 md:grid-cols-2">
					<InputField
						label="Email"
						type="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						error={errors.email}
						placeholder="Enter your email"
					/>

					<InputField
						label="Phone Number"
						type="text"
						name="phone"
						value={formData.phone}
						onChange={handleInputChange}
						error={errors.phone}
						placeholder="+91XXXXXXXXXX"
					/>
				</div>

				<div className="grid gap-6 mt-4 md:grid-cols-2">
					<InputField
						label="City"
						type="text"
						name="city"
						value={formData.city}
						onChange={handleInputChange}
						error={errors.city}
						placeholder="Enter your city"
					/>

					<InputField
						label="State"
						type="text"
						name="state"
						value={formData.state}
						onChange={handleInputChange}
						error={errors.state}
						placeholder="Enter your state"
					/>
				</div>

				<TextAreaField
					label="Why do you want to be a CA?"
					name="reason"
					value={formData.reason}
					onChange={handleInputChange}
					placeholder="Write your reason here..."
					error={errors.reason}
				/>

				<div className="flex flex-col md:flex-row bg-neutral-800 text-white p-6 space-y-4 md:space-y-0 md:space-x-4">
					{/* Left Part */}
					<div className="w-full md:w-1/3 flex items-center justify-center hover:scale-105 transform transition-transform">
						<MdOutlineBookmarks className="mr-1 text-xl" />
						<a
							href="https://drive.google.com/file/d/1Bxv-T6LYUjtXT6aUUANaEUKLO-KP5e28/view?usp=drive_link"
							target="_blank"
							rel="noopener noreferrer"
							className="text-lg font-semibold text-orange-500"
						>
							Rule Book
						</a>
					</div>

					{/* Right Part */}
					<div className="w-full md:w-2/3 flex items-center justify-center">
						<button
							type="submit"
							className={`bg-gradient-to-r from-orange-500 to-orange-800 text-white py-2 px-4 rounded-md w-full ${
								submitting
									? "opacity-50 cursor-not-allowed"
									: "hover:from-orange-600 hover:to-orange-900"
							}`}
							disabled={submitting}
						>
							{submitting ? "Submitting..." : "Submit"}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

// InputField component
const InputField = ({
	label,
	type,
	name,
	value,
	onChange,
	error,
	placeholder,
}) => (
	<div>
		<label className="block text-sm font-medium mb-1 pl-1">{label}</label>
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className="w-full border border-gray-700 bg-black text-white rounded-md p-2"
		/>
		{error && <p className="text-red-400 text-sm mt-1">{error}</p>}
	</div>
);

// SelectField component
const SelectField = ({ label, name, value, onChange, options, error }) => (
	<div>
		<label className="block text-sm font-medium mb-1 pl-1">{label}</label>
		<select
			name={name}
			value={value}
			onChange={onChange}
			className="w-full border border-gray-700 bg-black text-white rounded-md p-2"
		>
			<option value="" disabled>
				Select {label}
			</option>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
		{error && <p className="text-red-400 text-sm mt-1">{error}</p>}
	</div>
);

// TextAreaField component
const TextAreaField = ({
	label,
	name,
	value,
	onChange,
	placeholder,
	error,
}) => (
	<div className="mt-4">
		<label className="block text-sm font-medium mb-1 pl-1">{label}</label>
		<textarea
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className="w-full border border-gray-700 bg-black text-white rounded-md p-2 h-20"
		/>
		{error && <p className="text-red-400 text-sm mt-1">{error}</p>}
	</div>
);

export default Form;
