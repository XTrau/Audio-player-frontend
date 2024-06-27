import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getTracks } from './services/trackService'

import { changeTrackList } from './store/slices/trackListReducer'

import Layout from './components/Layout/Layout'

import { Routes, Route } from 'react-router-dom'

import Main from './pages/MainPage/MainPage'
import AddArtistPage from './pages/AddArtistPage/AddArtistPage'
import AddAlbumPage from './pages/AddAlbumPage/AddAlbumPage'

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

  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Main />}
          />
          <Route
            path="/add_artist"
            element={<AddArtistPage />}
          />
          <Route
            path="/add_album"
            element={<AddAlbumPage />}
          />
        </Routes>
      </Layout>
    </>
  )
}

export default App
