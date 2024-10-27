import axios from "axios";
import { API_URL } from "../config.js";

const $api = axios.create({
	baseURL: API_URL, withCredentials: true,
});

$api.interceptors.response.use((config) => {
	return config;
}, async (error) => {
	const originalRequest = error.config;
	if (error.response.status === 401 && error.config && !error.config._isRetry) {
		originalRequest._isRetry = true;
		try {
			await axios.get(`${API_URL}/refresh`, {withCredentials: true});
			return $api.request(originalRequest);
		} catch (err) {
		}
	}
	return Promise.reject(error);
})

export default $api;

