import "./ArtistList.scss"

import React from 'react';
import { Link } from "react-router-dom";

function ArtistList({artists}) {
	if (!artists?.length) {
		return <></>
	}

	return (
		<ul className="artist-list">
			{artists.map((artist, index) => (
				<>
					<li key={index} className="artist-list-item">
						<Link to={`/artist/${artist.id}`}>{artist.name}</Link>
					</li>
					{index !== artists.length - 1 && <span>,</span>}
				</>
			))}
		</ul>
	);
}

export default ArtistList;