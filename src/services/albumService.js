import axios from 'axios'
import { API_URL } from '../config'

const ENDPOINT = '/api/albums'

export const getAlbums = async () => {
  try {
    const response = await axios.get(`${API_URL + ENDPOINT}`)
    if (response.status !== 200) throw new Error('Network response was not ok')
    return response.data
  } catch (error) {
    console.error('Failed to fetch albums:', error)
    throw error
  }
}

export const getAlbumById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${ENDPOINT}/${id}`)
    if (response.status !== 200) throw new Error('Network response was not ok')
    return response.data
  } catch (error) {
    console.error(`Failed to fetch album with id ${id}:`, error)
    throw error
  }
}

export const createAlbum = async (albumData) => {
  try {
    const fd = new FormData()
    fd.append('title', albumData.title)
    fd.append('artist_id ', albumData.artist_id)
    fd.append('image_file ', albumData.image_file)

    const response = await axios.post(`${API_URL + ENDPOINT}`, fd)
    if (response.status === 422) throw new Error('Bad album data')
    if (response.status !== 201) throw new Error('Network response was not ok')
    return response.data
  } catch (error) {
    console.error('Failed to create album:', error)
    throw error
  }
}