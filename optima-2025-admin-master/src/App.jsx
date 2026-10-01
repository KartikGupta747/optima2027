import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CaApplicant from "./components/CaApplicant";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import CASelected from "./components/CASelected";
import Login from "./components/Login";
import Queries from "./components/Queries";
import Participants from "./components/Participants";
import ParticipantDetails from "./components/ParticipantDetails";

function App() {
	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<Router>
				<Navbar />
				<div className="mt-5 container">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/ca-applicant" element={<CaApplicant />} />
						<Route path="/ca-selected" element={<CASelected />} />
						<Route
							path="/participants"
							element={<Participants />}
						/>
						<Route
							path="/participant/:OPID"
							element={<ParticipantDetails />}
						/>
						<Route path="/queries" element={<Queries />} />
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;

