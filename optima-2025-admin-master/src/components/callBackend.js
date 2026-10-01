import { toast } from "react-toastify";
import Axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

async function callAxios(method, endpoint, data) {
	if (method == "GET") {
		return Axios.get(API_URL + endpoint + "?" + data, {
			headers: {
				authorization: localStorage.getItem("optima-admin-token"),
			},
		});
	} else if (method == "POST") {
		if (endpoint == "/admin/login") {
			return Axios.post(API_URL + endpoint, data);
		}
		return Axios.post(API_URL + endpoint, data, {
			headers: {
				authorization: localStorage.getItem("optima-admin-token"),
			},
		});
	} else if (method == "DELETE") {
		return Axios.delete(API_URL + endpoint, {
			headers: {
				authorization: localStorage.getItem("optima-admin-token"),
			},
		});
	}
}

export async function callBackend({
	method,
	endpoint,
	setLoading,
	data,
	onSuccess,
}) {
	setLoading && setLoading(true);
	await callAxios(method, endpoint, data)
		.then((response) => {
			if (response.data.status == 200) {
				setLoading && setLoading(false);
				method != "GET" && toast.success(response.data.message);
				onSuccess && onSuccess(response.data);
			} else if (response.data.status == 401) {
				setLoading && setLoading(false);
				toast.error(response.data.message);
				localStorage.removeItem("optima-admin-token");
				window.location.href = "/login";
			} else if (response.data.status == 800) {
				setLoading && setLoading(false);
				toast.error(response.data.message);
			} else {
				setLoading && setLoading(false);
				console.error("Unexpected response format:", response.data);
				toast.error("Something went wrong! Please try again.");
			}
		})
		.catch((error) => {
			setLoading && setLoading(false);
			console.error("Error calling backend:" + error.message);
			toast.error(
				"Something went wrong! Please check your internet connection."
			);
		});
}

