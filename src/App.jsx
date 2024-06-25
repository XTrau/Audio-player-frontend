import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getTracks } from './services/trackService'

import { changeTrackList } from './store/slices/trackListReducer'

import TrackController from './components/TrackController/TrackController'
import TrackList from './components/TrackList/TrackList'
import Header from './components/Header/Header'

import './index.scss'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const tracks = await getTracks()
        if (!tracks) throw Error('Failed to get tracks')
        dispatch(changeTrackList(tracks))
      } catch (error) {
        console.error(error)
      }
    }

    fetchTracks()
  }, [dispatch])

  const trackList = useSelector((store) => store.trackList.trackList)

  return (
    <>
      <Header />
      <main>
        <div className="main-wrapper">
          <div className="main-tracklist">
            <h2>Музыка</h2>
            <TrackList trackList={trackList} />
          </div>
        </div>
      </main>
      <TrackController />
    </>
  )
}

export default App
