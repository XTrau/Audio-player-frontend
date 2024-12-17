import './TrackList.scss'
import Track from '../Track/Track'
import { useSelector } from "react-redux";

function TrackList({trackList}) {
	const trackListIds = useSelector((state) => state.favourite.trackListIds);
	return (
		<div className="tracklist-wrapper">
			{trackList.map((track, index) => (
				<Track
					key={track.id}
					index={index}
					currentList={trackList}
					track={track}
					liked={trackListIds.includes ? trackListIds.includes(track.id) : false}
				/>
			))}
			<b className="tracklist-count">Треков: {trackList.length}</b>
		</div>
	)
}

export default TrackList
