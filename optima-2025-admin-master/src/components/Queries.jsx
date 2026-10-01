import React, { useEffect, useState } from "react";
import { callBackend } from "./callBackend.js";
import { Spinner } from "react-bootstrap";
import "../css/queries.css";
import { FaWhatsapp } from "react-icons/fa";

const QueryList = () => {
	const [queries, setQueries] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetch all queries on component mount
	const loadQueries = async () => {
		if (!localStorage.getItem("optima-admin-token")) {
			window.location.href = "/login";
			return;
		}

		callBackend({
			method: "GET",
			endpoint: "/admin/queries",
			data: "",
			setLoading,
			onSuccess: (res) => {
				if (res?.status === 200 && Array.isArray(res.data)) {
					setQueries(res.data); // ✅ Correctly accessing the data
				} else {
					console.error("Unexpected response format:", res);
				}
			},
		});
	};

	useEffect(() => {
		loadQueries();
	}, []);

	if (loading) {
		return (
			<div className="admin-container">
				<h1 className="admin-heading">Submitted Queries</h1>
				<Spinner animation="border" variant="primary" />
			</div>
		);
	}

	return (
		// <div className="admin-container">
		//     <h1 className="admin-heading">Submitted Queries</h1>
		//     {queries.length > 0 ? (
		//         <table className="table table-bordered table-striped">
		//             <thead className="thead-dark">
		//                 <tr>
		//                     <th>#</th>
		//                     <th>Name</th>
		//                     <th>Email</th>
		//                     <th>Phone</th>
		//                     <th>Query</th>
		//                     <th>Submitted At</th>
		//                 </tr>
		//             </thead>
		//             <tbody>
		//                 {queries.map((query, index) => (
		//                     <tr key={query._id}>
		//                         <td>{index + 1}</td>
		//                         <td>{query.name}</td>
		//                         <td>{query.email}</td>
		//                         <td>{query.phone}</td>
		//                         <td>{query.query}</td>
		//                         <td>{new Date(query.createdAt).toLocaleString()}</td>
		//                     </tr>
		//                 ))}
		//             </tbody>
		//         </table>
		//     ) : (
		//         <p>No queries found.</p>
		//     )}
		// </div>
		<div className="admin-container">
			<h1 className="admin-heading">Submitted Queries</h1>
			Total Queries: {queries.length}
			{queries.length > 0 ? (
				<div className="query-list">
					{queries.map((query, index) => (
						<div key={query._id} className="query-card">
							<div className="query-header">
								<span className="query-number">
									#{index + 1}
								</span>
								<span className="query-time">
									{new Date(query.createdAt).toLocaleString()}
								</span>
							</div>
							<div className="query-content">
								<p>
									<strong>Name:</strong> {query.name}
								</p>
								<p>
									<strong>Email:</strong>{" "}
									<a
										href={`mailto:${query.email}`}
										className="query-link"
									>
										{query.email}
									</a>
								</p>
								<p>
									<strong>Phone{"(WhatsApp)"}:</strong>{" "}
									<a
										href={`tel:${query.phone}`}
										target="_blank"
										rel="noopener noreferrer"
										className="query-link"
									>
										{query.phone}
									</a>
									<FaWhatsapp
										className="CaDashboard-icon"
										onClick={() =>
											window.open(
												`https://wa.me/+91${query.phone}`
											)
										}
									/>
								</p>

								<p>
									<strong>Query:</strong> {query.query}
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<p>No queries found.</p>
			)}
		</div>
	);
};

export default QueryList;
