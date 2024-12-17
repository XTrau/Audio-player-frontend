import $api from "../http/index.js";

export class UserService {
	static async get_liked_tracks() {
		return $api.get(`/me/liked`);
	}

	static async get_liked_ids() {
		return $api.get(`/me/liked_ids`);
	}

	static async like_track(track_id) {
		return $api.post(`/like_track?track_id=${track_id}`);
	}

	static async unlike_track(track_id) {
		return $api.post(`/unlike_track?track_id=${track_id}`);
	}
}
