import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTracks } from './services/trackService'

import {
  changeTrackList,
  changeFullTrackList,
} from './store/slices/trackListReducer'

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
  }, [])

	const trackList = useSelector((store) => store.currentTrack.fullTrackList);
	console.log(trackList)

  return (
    <>
      <div></div>
    </>
  )
}

export default App
