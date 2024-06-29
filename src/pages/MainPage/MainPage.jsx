import TrackList from '../../components/TrackList/TrackList'

import { useState, useEffect } from 'react'

import { getTracks } from '../../services/trackService'

import './MainPage.scss'

function Main() {
  const [trackList, setTrackList] = useState([])
  const [trackPage, setTrackPage] = useState(1)
  const [canFetchTracks, setCanFetchTracks] = useState(true)

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const tracks = await getTracks(0, 10)
        setTrackList(tracks)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTracks()
  }, [])

  const fetchNewTracks = async () => {
    try {
      const tracks = await getTracks(trackPage, 10)
      if (tracks.length < 10) setCanFetchTracks(false)
      setTrackList((prev) => [...prev, ...tracks])
      setTrackPage((prev) => prev + 1)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="main-tracklist">
      <h2>Музыка</h2>
      <TrackList trackList={trackList} />
      {canFetchTracks && (
        <div className='add-track-button'>
        <button onClick={() => fetchNewTracks()}>Ещё треки...</button>
        </div>
      )}
    </div>
  )
}

export default Main
