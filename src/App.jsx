import Layout from './components/Layout/Layout'

import { Routes, Route } from 'react-router-dom'

import Main from './pages/MainPage/MainPage'
import AddArtistPage from './pages/Artist/AddArtistPage/AddArtistPage'
import AddAlbumPage from './pages/Album/AddAlbumPage/AddAlbumPage'
import ArtistPage from './pages/Artist/ArtistPage/ArtistPage'

import './index.scss'
import LoginPage from "./pages/Auth/LoginPage.jsx";
import RegistrationPage from "./pages/Auth/RegistrationPage.jsx";
import UserPage from "./pages/UserPage/UserPage.jsx";
import { checkAuthenticated } from "./store/slices/authReducer.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlbumPage from "./pages/Album/AlbumPage/AlbumPage.jsx";
import MyMusicPage from "./pages/MyMusicPage/MyMusicPage.jsx";
import { fetchLikedTrackIds } from "./store/slices/favouriteListReducer.js";
import About from "./pages/About/About.jsx";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(checkAuthenticated());
		dispatch(fetchLikedTrackIds());
	}, [dispatch]);


	return (<>
		<Layout>
			<Routes>
				<Route
					path="/"
					element={<Main/>}
				/>
				<Route
					path="/login"
					element={<LoginPage/>}
				/>
				<Route
					path="/registration"
					element={<RegistrationPage/>}
				/>
				<Route
					path="/me"
					element={<UserPage/>}
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
					element={<AlbumPage/>}
				/>
				<Route
					path="/my_music"
					element={<MyMusicPage/>}
				/>
				<Route
					path="/create_playlist"
					element={<MyMusicPage/>}
				/>
				<Route
					path="/playlist/:playlist_id"
					element={<MyMusicPage/>}
				/>
				<Route path="/about" element={<About/>}/>
			</Routes>
		</Layout>
	</>)
}

export default App
