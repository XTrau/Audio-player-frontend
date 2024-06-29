import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getArtistById } from '../../services/artistService'

import { API_URL, FILE_ENDPOINT } from '../../config'

import './ArtistPage.scss'
import TrackList from '../../components/TrackList/TrackList'

function ArtistPage() {
  const [artist, setArtist] = useState(null)
  const params = useParams()
  const artist_id = params.artist_id
  useEffect(() => {
    async function fetchArtist() {
      const artist_data = await getArtistById(artist_id)
      console.log(artist_data)
      setArtist(artist_data)
    }
    fetchArtist()
  }, [artist_id])

  return (
    artist && (
      <div className="artist-page">
        <div className="artist-info-wrapper">
          <div className="artist-info-left">
            <img
              src={`${API_URL + FILE_ENDPOINT}/${
                artist.image_file_name ? artist.image_file_name : 'music.png'
              }`}
            />
          </div>
          <div className="artist-info-right">
            <div className="artist-info">
              <h2 className="artist-name">{artist.name}</h2>
              <div>
                <div className="artist-info-albums">
                  Треков: {artist.tracks.length}
                </div>
                <div className="artist-info-tracks">
                  Альбомов: {artist.albums.length}
                </div>
              </div>
              <button>Изменить</button>
            </div>
          </div>
        </div>

        {artist.albums.length > 0 && (
          <div className="album-section">
            <h2>Альбомы</h2>
            <ul className="album-list">
              {artist.albums.map((album) => {
                return (
                  <div
                    key={album.id}
                    className="mini-album-wrapper"
                  >
                    <img
                      src={`${API_URL + FILE_ENDPOINT}/${
                        album.image_file_name
                          ? album.image_file_name
                          : 'music.png'
                      }`}
                    />
                    <li className="mini-album-title">{album.title}</li>
                  </div>
                )
              })}
            </ul>
          </div>
        )}

        {artist.tracks.length > 0 && (
          <div className="track-section">
            <h2>Треки</h2>
            <TrackList trackList={artist.tracks} />
          </div>
        )}
      </div>
    )
  )
}

export default ArtistPage
