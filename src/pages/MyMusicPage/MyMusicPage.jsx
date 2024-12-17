import "./MyMusicPage.scss"

import React, { useContext, useEffect, useState } from 'react';
import { UserService } from "../../services/userService.js";
import TrackList from "../../components/TrackList/TrackList.jsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MyMusicPage() {
	const [trackList, setTrackList] = useState([]);
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchTrackList = async () => {
			try {
				setLoading(true);
				const response = await UserService.get_liked_tracks();
				if (response.status === 200) setTrackList(response.data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}
		fetchTrackList();
	}, [])

	if (loading) {
		return (
			<div className="my-music-page">Загрузка...</div>
		)
	}

	if (!isAuthenticated) {
		return (
			<div className="my-music-page">
				<div>
					Необходимо пройти аунтефикацию
				</div>
				<Link to="/login">Войти</Link>
			</div>
		)
	}

	if (trackList.length === 0) {
		return (
			<div className="my-music-page">
				<h1>
					Здесь пока ничего нету
				</h1>
			</div>
		)
	}

	return (
		<div className="my-music-page">
			<h2>Моя музыка</h2>
			<TrackList trackList={trackList}/>
		</div>
	);
}

export default MyMusicPage;