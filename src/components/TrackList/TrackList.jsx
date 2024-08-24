import './TrackList.scss'
import Track from '../Track/Track'

function TrackList({ trackList }) {
  return (
    <div className="tracklist-wrapper">
      {trackList.map((track, index) => (
        <Track
          key={track.id}
					index={index}
          currentList={trackList}
          track={track}
        />
      ))}
      <b className="tracklist-count">Треков: {trackList.length}</b>
    </div>
  )
}

export default TrackList
