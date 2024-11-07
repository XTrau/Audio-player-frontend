import React from 'react';
import "./ArtistList.scss"
import { FileService } from "../../services/fileService.js";

function ArtistList({artists, artistClickHandler}) {
	const onArtistClickHandler = (e, artist) => {
		artistClickHandler(artist);
	}

	if (!artists?.length) return (<></>);

	return (
		<ul className="album-artist-list">
			{artists.map((artist, index) => {
				return (
					<div key={artist.id}>
						<button
							onClick={(e) => onArtistClickHandler(e, artist)}
							className="mini-artist"
						>
							<img
								className="mini-artist__image"
								src={FileService.getUrlToFile(artist.image_file_name) || FileService.getDefaultImageUrl(artist.image_file_name)}
								width={30}
								height={30}
							/>
							<span>{artist.name}</span>
						</button>
					</div>
				);
			})}
		</ul>
	)
}

export default ArtistList;