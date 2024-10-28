import $api from "../http/index.js";

export class ArtistService {
	static async getArtists(page = 0, size = 10) {
		return $api.get(`/artists/?page=${page}&size=${size}`)
	}

	static async searchArtists(query) {
		return $api.get(`/artists/search?query=${query}`);
	}

	static async getArtistById(id) {
		return $api.get(`/artists/${id}`)
	}

	static async createArtist(fd) {
		return $api.post("/artists", fd)
		// try {
		//   const fd = new FormData()
		//   fd.append('name', artistData.name)
		// 	if (artistData.image_file)
		// 		fd.append('image_file', artistData.image_file)
		//
		//   const response = await axios.post(`${API_URL + ENDPOINT}`, fd)
		//   if (response.status === 422) throw new Error('Bad artist data')
		//   if (response.status !== 201) throw new Error('Network response was not ok')
		//   return response.data
		// } catch (error) {
		//   console.error('Failed to create artist:', error)
		//   throw error
		// }
	}

	static async updateArtist(artist_id, fd) {
		return $api.post(`/albums/${artist_id}`, fd)
		// try {
		// 	const fd = new FormData()
		// 	fd.append('name', artistData.name)
		// 	fd.append('image_file', artistData.image_file)
		//
		// 	const response = await axios.put(`${API_URL + ENDPOINT}/${artist_id}`, fd)
		// 	if (response.status === 422) throw new Error('Bad artist data')
		// 	if (response.status !== 201) throw new Error('Network response was not ok')
		// 	return response.data
		// } catch (error) {
		// 	console.error('Failed to create artist:', error)
		// 	throw error
		// }
	}
}

