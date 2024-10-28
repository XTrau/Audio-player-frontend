import { API_URL, FILE_ENDPOINT } from "../config.js";

export class FileService {
	static getUrlToFile(file_name) {
		return `${API_URL}/${FILE_ENDPOINT}/${file_name}`;
	}
}
