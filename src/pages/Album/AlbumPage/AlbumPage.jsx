import "./AlbumPage.scss"

import React, { useEffect, useState } from 'react';
import { FileService } from "../../../services/fileService.js";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AlbumService } from "../../../services/albumService.js";
import TrackList from "../../../components/TrackList/TrackList.jsx";

function AlbumPage() {
	const [album, setAlbum] = useState(null);
	const params = useParams();
	const album_id = params.album_id;

	const user = useSelector(state => state.auth.user);

	useEffect(() => {
		async function fetchAlbum() {
			const response = await AlbumService.getAlbumById(album_id);
			const albumData = response.data;
			setAlbum(albumData);
		}

		fetchAlbum();
	}, [album_id]);


	if (!album) return (<></>);

	return (
		<div className="album-page">
			<div className="album-info-wrapper">
				<div className="album-info-left">
					<img
						src={FileService.getUrlToFile(album.image_file_name) || FileService.getDefaultImageUrl()}
					/>
				</div>
				<div className="album-info-right">
					<div className="album-info">
						<div className="album-info-name-container">
							<div className="album-info-container">
								<h2 className="album-name">{album.title}</h2>
								<div className="album-additional-info">{album?.track_count === 1 ? "Сингл" : "Альбом"}</div>
							</div>
							{
								user?.is_admin &&
								<Link to={`/album/${album_id}/edit`}>Редактировать</Link>
							}
						</div>
						<div className="album-count-info">
							<div>
								{
									album.artists.length > 0 && album.artists.map(
										(artist) => (
											<Link to={`/artist/${artist.id}`}>{artist.name}</Link>
										)
									)
								}
							</div>
						</div>
					</div>
				</div>
			</div>

			{album.tracks.length > 0 && (
				<div className="track-section">
					<h2>Треки</h2>
					<TrackList trackList={album.tracks}/>
				</div>
			)}
		</div>
	);
}

export default AlbumPage;
