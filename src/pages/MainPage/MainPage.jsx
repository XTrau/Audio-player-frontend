import TrackList from '../../components/TrackList/TrackList'

import { useState, useEffect } from 'react'

import { trackService } from '../../services/trackService'
import { changeTrackList } from '../../store/slices/trackListReducer.js'

import './MainPage.scss'
import { useDispatch } from "react-redux";

function Main() {
	const dispatch = useDispatch();
	const [trackList, setTrackList] = useState([]);
	const [trackPage, setTrackPage] = useState(1);
	const [canFetchTracks, setCanFetchTracks] = useState(false);

	useEffect(() => {
		const fetchTracks = async () => {
			try {
				const response = await trackService.getTracks(0, 10);
				const tracks = response.data;
				if (tracks.length === 10) setCanFetchTracks(true);
				setTrackList(tracks)
				dispatch(changeTrackList(tracks))
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
		<div className="main-page">
			<div className="main-page-wrapper">
				<h2>Музыка</h2>

				<TrackList trackList={trackList}/>
				{canFetchTracks && (
					<div className='add-track-button'>
						<button onClick={() => fetchNewTracks()}>Ещё треки...</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Main
