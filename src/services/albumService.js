import $api from "../http/index.js";

export class AlbumService {
	static async getAlbums(page = 0, size = 10) {
		return $api.get(`/albums/?page=${page}&size=${size}`)
	}

	static async getAlbumById(id) {
		return $api.get(`/albums/${id}`)
	}

	static async createAlbum(fd) {
		return $api.post("/albums", fd)
		// try {
		// 	const fd = new FormData()
		// 	fd.append('title', albumData.title)
		// 	fd.append('artist_id', albumData.artist_id)
		// 	fd.append('image_file', albumData.image_file)
		//
		// 	const response = await axios.post(`${API_URL + ENDPOINT}`, fd)
		// 	if (response.status === 422) throw new Error('Bad album data')
		// 	if (response.status !== 201) throw new Error('Network response was not ok')
		// 	return response.data
		// } catch (error) {
		// 	console.error('Failed to create album:', error)
		// 	throw error
		// }
	}

	static async updateAlbum(album_id, fd) {
		return $api.post(`/albums/${album_id}`, fd)
		// try {
		// 	const fd = new FormData()
		// 	fd.append('title', albumData.title)
		// 	fd.append('artist_id', albumData.artist_id)
		// 	fd.append('image_file', albumData.image_file)
		//
		// 	const response = await axios.put(`${API_URL + ENDPOINT}/${album_id}`, fd)
		// 	if (response.status === 422) throw new Error('Bad album data')
		// 	if (response.status !== 201) throw new Error('Network response was not ok')
		// 	return response.data
		// } catch (error) {
		// 	console.error('Failed to create album:', error)
		// 	throw error
		// }
	}
}

