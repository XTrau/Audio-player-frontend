import $api from "../http/index.js";

export class TrackService {
	static async getTracks(page = 0, size = 10) {
		return $api.get(`/tracks/?page=${page}&size=${size}`);
	}

	static async getTrackById(id) {
		return $api.get(`/tracks/${id}`);
	}

	static async createTrack(fd) {
		return $api.post("/tracks", fd);
		// try {
		//   const fd = new FormData()
		//   fd.append('title', trackData.title)
		//   fd.append('artist_ids', trackData.artist_ids.join(','))
		//   fd.append('album_id', trackData.album_id)
		//   fd.append('audio_file', trackData.audio_file)
		//   fd.append('image_file', trackData.image_file)
		//
		//   const response = await axios.post(`${API_URL + ENDPOINT}`, fd)
		//   if (response.status === 422) throw new Error('Bad track data')
		//   if (response.status !== 201) throw new Error('Network response was not ok')
		//   return response.data
		// } catch (error) {
		//   console.error('Failed to create track:', error)
		//   throw error
		// }
	}

	static async updateTrack(track_id, fd) {
		return $api.post(`/tracks/${track_id}`, fd);
		// try {
		// 	const fd = new FormData()
		// 	fd.append('title', trackData.title)
		// 	fd.append('artist_ids', trackData.artist_ids.join(','))
		// 	fd.append('album_id', trackData.album_id)
		// 	fd.append('audio_file', trackData.audio_file)
		// 	fd.append('image_file', trackData.image_file)
		//
		// 	const response = await axios.put(`${API_URL + ENDPOINT}/${track_id}`, fd)
		// 	if (response.status === 422) throw new Error('Bad track data')
		// 	if (response.status !== 201) throw new Error('Network response was not ok')
		// 	return response.data
		// } catch (error) {
		// 	console.error('Failed to create track:', error)
		// 	throw error
		// }
	}
}

