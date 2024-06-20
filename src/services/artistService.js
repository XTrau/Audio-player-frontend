import axios from 'axios'
import { API_URL } from '../config'

const ENDPOINT = '/api/artists'

export const getArtists = async () => {
  try {
    const response = await axios.get(`${API_URL + ENDPOINT}`)
    if (response.status !== 200) throw new Error('Network response was not ok')
    return response.data
  } catch (error) {
    console.error('Failed to fetch artists:', error)
    throw error
  }
}

export const getArtistById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${ENDPOINT}/${id}`)
    if (response.status !== 200) throw new Error('Network response was not ok')
    return response.data
  } catch (error) {
    console.error(`Failed to fetch artist with id ${id}:`, error)
    throw error
  }
}

export const createArtist = async (artistData) => {
  try {
    const fd = new FormData()
    fd.append('name', artistData.name)
    fd.append('image_file', artistData.image_file)

    const response = await axios.post(`${API_URL + ENDPOINT}`, fd)
    if (response.status === 422) throw new Error('Bad artist data')
    if (response.status !== 201) throw new Error('Network response was not ok')
    return response.data
  } catch (error) {
    console.error('Failed to create artist:', error)
    throw error
  }
}