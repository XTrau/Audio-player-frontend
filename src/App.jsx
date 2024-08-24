import Layout from './components/Layout/Layout'

import { Routes, Route } from 'react-router-dom'

import Main from './pages/MainPage/MainPage'
import AddArtistPage from './pages/AddArtistPage/AddArtistPage'
import AddAlbumPage from './pages/AddAlbumPage/AddAlbumPage'
import ArtistPage from './pages/ArtistPage/ArtistPage'

import './index.scss'

function App() {
  return (<>
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<Main/>}
        />
        <Route
          path="/add_artist"
          element={<AddArtistPage/>}
        />
        <Route
          path="/add_album"
          element={<AddAlbumPage/>}
        />
        <Route
          path="/artist/:artist_id"
          element={<ArtistPage/>}
        />
        <Route
          path="/album/:album_id"
          element={<AddAlbumPage/>}
        />
      </Routes>
    </Layout>
  </>)
}

export default App
