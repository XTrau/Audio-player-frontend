import { API_URL, FILE_ENDPOINT } from "../config.js";

export class FileService {
	static getUrlToFile(file_name) {
		if (!file_name) return "";
		return `${API_URL}/${FILE_ENDPOINT}/${file_name}`;
	}

	static getDefaultImageUrl() {
		return `${API_URL}/${FILE_ENDPOINT}/music.png`;
	}
}
