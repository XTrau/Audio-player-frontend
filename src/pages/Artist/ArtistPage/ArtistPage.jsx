import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './ArtistPage.scss';
import { ArtistService } from "../../../services/artistService.js";
import { FileService } from "../../../services/fileService.js";
import Album from "../../../components/Album/Album.jsx";
import { useSelector } from "react-redux";
import TrackList from "../../../components/TrackList/TrackList.jsx";

function ArtistPage() {
	const [artist, setArtist] = useState(null);
	const params = useParams();
	const artist_id = params.artist_id;

	const user = useSelector(state => state.auth.user);


	useEffect(() => {
		async function fetchArtist() {
			const response = await ArtistService.getArtistById(artist_id);
			const artistData = response.data;
			setArtist(artistData);
		}

		fetchArtist();
	}, [artist_id]);

	if (!artist) return (<></>);

	return (
		<div className="artist-page">
			<div className="artist-info-wrapper">
				<div className="artist-info-left">
					<img
						src={FileService.getUrlToFile(artist.image_file_name) || FileService.getDefaultImageUrl()}
					/>
				</div>
				<div className="artist-info-right">
					<div className="artist-info">
						<div className="artist-info-name-container">
							<h2 className="artist-name">{artist.name}</h2>
							{
								user?.is_admin &&
								<Link to={`/artist/${artist_id}/edit`}>Редактировать</Link>
							}
						</div>
						<div className="artist-count-info">
							<div className="artist-info-albums">
								Треков: {artist.tracks.length}
							</div>
							<div className="artist-info-tracks">
								Альбомов: {artist.albums.length}
							</div>
						</div>
					</div>
				</div>
			</div>

			{artist.tracks.length > 0 && (
				<div className="track-section">
					<h2>Треки</h2>
					<TrackList trackList={artist.tracks.slice(0, 5)}/>
					{
						artist.tracks.length > 5 &&
						<Link to={`/artist/${artist_id}/tracks`}>
							<div className="track-wrapper all-tracks">Все треки...</div>
						</Link>
					}
				</div>
			)}

			{artist.albums.length > 0 && (
				<div className="album-section">
					<h2>Альбомы</h2>
					<ul className="album-list">
						{artist.albums.map((album, index) => {
							return <Album id={album.id} track_count={album.track_count} image_file_name={album.image_file_name} title={album.title}/>
						})}
					</ul>
				</div>
			)}
		</div>
	);
}

export default ArtistPage;
