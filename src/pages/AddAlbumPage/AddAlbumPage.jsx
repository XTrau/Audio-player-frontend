import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import { getArtists } from '../../services/artistService'

import TrackToAdd from '../../components/TrackToAdd/TrackToAdd'

import { API_URL, FILE_ENDPOINT } from '../../config'

import { createAlbum } from '../../services/albumService'
import { createTrack } from '../../services/trackService'

import './AddAlbumPage.scss'

function AddAlbumPage() {
  const [tracksToAdd, setTracksToAdd] = useState([
    {
      title: '',
      artists: [],
      image: null,
      imageFile: null,
      audioFile: null,
    },
  ])

  const fileInputRef = useRef(null)

  const [artistSearchValue, setArtistSearchValue] = useState('')
  const [artists, setArtists] = useState([])

  const [albumTitle, setAlbumTitle] = useState('')
  const [albumArtist, setAlbumArtist] = useState(null)

  const [albumImageFile, setAlbumImageFile] = useState(null)
  const [albumImage, setAlbumImage] = useState(null)

  const [onArtistSearchFocused, setOnArtistSearchFocused] = useState(false)
  const [artistPage, setArtistPage] = useState(0)

  useEffect(() => {
    const fetchArtists = async () => {
      const artists_data = await getArtists()
      shuffleArtists(artists_data)
    }
    fetchArtists()
  }, [])

  const shuffleArtists = (array) => {
    let currentIndex = array.length
    while (currentIndex > 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }
    setArtists(array)
  }

  const changeTrackTitle = (text, index) => {
    setTracksToAdd((prev) => {
      prev[index].title = text
      return [...prev]
    })
    console.log(tracksToAdd)
  }

  const addTrackArtist = (artist, index) => {
    setTracksToAdd((prev) => {
      for (const art of prev[index].artists)
        if (art.id === artist.id) return prev

      prev[index].artists = [...prev[index].artists, artist]
      return [...prev]
    })
  }

  const removeTrackArtist = (artist, index) => {
    setTracksToAdd((prev) => {
      prev[index].artists = prev[index].artists.filter(
        (art) => art.id !== artist.id
      )
      return [...prev]
    })
  }

  const changeTrackImage = (file, index) => {
    setTracksToAdd((prev) => {
      if (file) {
        prev[index].imageFile = file
        prev[index].image = URL.createObjectURL(file)
      }
      return [...prev]
    })
  }

  const changeTrackAudio = (file, index) => {
    setTracksToAdd((prev) => {
      prev[index].audioFile = file
      return [...prev]
    })
  }

  const addTrack = () => {
    const initialTrack = {
      title: '',
      artists: [],
      image: null,
      imageFile: null,
      audioFile: null,
    }
    setTracksToAdd((prev) => [...prev, initialTrack])
  }

  const removeTrack = (index) => {
    setTracksToAdd((prev) => prev.filter((el, i) => i !== index))
  }

  const sendData = async () => {
    if (!albumTitle || albumArtist === null) {
      alert('Заполните все поля')
      return
    }

    for (const track of tracksToAdd) {
      if (!track.title || !track.audioFile || track.artists.length === 0) {
        alert('Заполните все поля')
        return
      }
    }

    const album = {
      title: albumTitle,
      image_file: albumImageFile,
      artist_id: albumArtist.id,
    }

    try {
      const res = await createAlbum(album)
      await sendTracks(res.album_id)
    } catch (e) {
      alert('Произошла ошибка')
      console.error(e)
    }
  }

  const sendTracks = async (album_id) => {
    if (!album_id) return

    for (const track of tracksToAdd) {
      const newTrack = {
        title: track.title,
        album_id: album_id,
        artist_ids: track.artists.map((artist) => artist.id),
        image_file: track.imageFile,
        audio_file: track.audioFile,
      }

      await createTrack(newTrack)
    }

    alert('Альбом успешно добавлен')
  }

  const selectAlbumImage = (e) => {
    if (e.target.files[0]) {
      setAlbumImageFile(e.target.files[0])
      setAlbumImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <div className="add-album-wrapper">
      <h2>Добавить Альбом</h2>
      <div className="add-album">
        <button onClick={() => fileInputRef.current.click()}>
          <img
            className="add-album__album-image"
            src={albumImage}
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/png, image/jpeg, image/jpg"
            onChange={selectAlbumImage}
            hidden
          />
        </button>

        <div className="add-album__input">
          <input
            className="text-input"
            placeholder="Название Альбома"
            value={albumTitle}
            onChange={(e) => setAlbumTitle(e.target.value)}
          />

          <div className="artist-search">
            <input
              className="text-input"
              placeholder="Артист"
              value={artistSearchValue}
              onChange={(e) => setArtistSearchValue(e.target.value)}
              onFocus={() => setOnArtistSearchFocused(true)}
            />

            <div className="artist-search-wrapper">
              {onArtistSearchFocused && (
                <ul className="artist-search-list">
                  {artists
                    .filter((artist) =>
                      artist.name
                        .toLocaleLowerCase()
                        .includes(artistSearchValue.toLocaleLowerCase())
                    )
                    .map((artist) => (
                      <li
                        key={artist.id}
                        onClick={() => {
                          setOnArtistSearchFocused(false)
                          setAlbumArtist(artist)
                        }}
                        className="searched-artist"
                      >
                        <img
                          className="searched-artist__image"
                          src={
                            API_URL +
                            FILE_ENDPOINT +
                            '/' +
                            artist.image_file_name
                          }
                        />
                        <h4>{artist.name}</h4>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>

          {albumArtist && (
            <div>
              <button
                onClick={() => {
                  setAlbumArtist(null)
                }}
                className="mini-artist"
              >
                <img
                  className="mini-artist__image"
                  src={
                    API_URL + FILE_ENDPOINT + '/' + albumArtist.image_file_name
                  }
                  width={30}
                  height={30}
                />
                <span>{albumArtist.name}</span>
              </button>
            </div>
          )}

          <p>
            There is no artist? <Link to="/add_artist">Add Artist</Link>
          </p>
        </div>
      </div>

      <div className="track-add-list">
        {tracksToAdd.map((el, index) => (
          <TrackToAdd
            track={el}
            key={index}
            index={index}
            artists={artists}
            changeTitle={changeTrackTitle}
            addTrackArtist={addTrackArtist}
            removeTrackArtist={removeTrackArtist}
            changeImage={changeTrackImage}
            changeAudio={changeTrackAudio}
            removeTrack={removeTrack}
          />
        ))}
      </div>
      <button
        onClick={addTrack}
        className="album-btn"
      >
        Add Track
      </button>
      <button
        className="album-btn"
        onClick={sendData}
      >
        Send Album
      </button>
    </div>
  )
}

export default AddAlbumPage
