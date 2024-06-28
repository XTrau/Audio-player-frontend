import axios from 'axios'
import { API_URL } from '../config'

const ENDPOINT = '/api/tracks'

export const getTracks = async (page = 0, size = 10) => {
  try {
    const response = await axios.get(
      `${API_URL + ENDPOINT}/?page=${page}&size=${size}`
    )
    if (response.status !== 200) throw new Error('Network response was not ok')
    return response.data
  } catch (error) {
    console.error('Failed to fetch tracks:', error)
    throw error
  }
}

export const getTrackById = async (id) => {
  try {
    const response = await axios.get(`${API_URL + ENDPOINT}/${id}`)
    if (response.status !== 200) throw new Error('Network response was not ok')
    return response.data
  } catch (error) {
    console.error(`Failed to fetch track with id ${id}:`, error)
    throw error
  }
}

export const createTrack = async (trackData) => {
  try {
    const fd = new FormData()
    fd.append('title', trackData.title)
    fd.append('artist_ids', trackData.artist_ids.join(','))
    fd.append('album_id', trackData.album_id)
    fd.append('audio_file', trackData.audio_file)
    fd.append('image_file', trackData.image_file)

    const response = await axios.post(`${API_URL + ENDPOINT}`, fd)
    if (response.status === 422) throw new Error('Bad track data')
    if (response.status !== 201) throw new Error('Network response was not ok')
    return response.data
  } catch (error) {
    console.error('Failed to create track:', error)
    throw error
  }
}

export const updateTrack = async (trackData, track_id) => {
  try {
    const fd = new FormData()
    fd.append('title', trackData.title)
    fd.append('artist_ids', trackData.artist_ids.join(','))
    fd.append('album_id', trackData.album_id)
    fd.append('audio_file', trackData.audio_file)
    fd.append('image_file', trackData.image_file)

    const response = await axios.put(`${API_URL + ENDPOINT}/${track_id}`, fd)
    if (response.status === 422) throw new Error('Bad track data')
    if (response.status !== 201) throw new Error('Network response was not ok')
    return response.data
  } catch (error) {
    console.error('Failed to create track:', error)
    throw error
  }
}
