import Layout from './components/Layout/Layout'

import { Routes, Route } from 'react-router-dom'

import Main from './pages/MainPage/MainPage'
import AddArtistPage from './pages/AddArtistPage/AddArtistPage'
import AddAlbumPage from './pages/AddAlbumPage/AddAlbumPage'
import ArtistPage from './pages/ArtistPage/ArtistPage'

import './index.scss'
import LoginPage from "./pages/Auth/LoginPage.jsx";
import RegistrationPage from "./pages/Auth/RegistrationPage.jsx";
import UserPage from "./pages/UserPage/UserPage.jsx";
import { checkAuthenticated } from "./store/slices/authReducer.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(checkAuthenticated());
	}, []);


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
			</Routes>
		</Layout>
	</>)
}

export default App
