import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getTracks } from './services/trackService'

import {
  changeTrackList,
  changeFullTrackList,
} from './store/slices/trackListReducer'

import TrackController from './components/TrackController/TrackController'

import './index.scss'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const tracks = await getTracks()
        if (!tracks) throw Error('Failed to get tracks')
        dispatch(changeFullTrackList(tracks))
        dispatch(changeTrackList(tracks))
      } catch (error) {
        console.error(error)
      }
    }

    fetchTracks()
  }, [dispatch])

  const trackList = useSelector(store => store.trackList.trackList)
  console.log(trackList)

  return (
    <>
      <div>
        <TrackController />
      </div>
    </>
  )
}

export default App
