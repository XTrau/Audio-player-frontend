import TrackList from '../../components/TrackList/TrackList'
import { useSelector } from 'react-redux'
import './MainPage.scss'

function Main() {
  const trackList = useSelector((store) => store.trackList.trackList)
  return (
    <div className="main-tracklist">
      <h2>Музыка</h2>
      <TrackList trackList={trackList} />
    </div>
  )
}

export default Main
