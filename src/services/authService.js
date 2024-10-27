import $api from "../http/index.js";

export class AuthService {
	static async login(login, password) {
		return $api.post("/login", {login, password});
	}

	static async register(username, email, password) {
		return $api.post("/register", {username, email, password});
	}

	static async logout() {
		return $api.post("/logout", {});
	}

	static async refresh() {
		return $api.get("/refresh", {});
	}

	static async me() {
		return $api.get("/me", {});
	}
}
