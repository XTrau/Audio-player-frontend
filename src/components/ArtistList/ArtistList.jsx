import "./ArtistList.scss"

import { Link } from "react-router-dom";

function ArtistList({artists}) {
	if (!artists?.length) {
		return <></>
	}

	return (
		<ul className="artist-list">
			{artists.map((artist, index) => (
				<span key={artist.id}>
					<li className="artist-list-item">
						<Link to={`/artist/${artist.id}`}>{artist.name}</Link>
					</li>
					{index !== artists.length - 1 && <span>,</span>}
				</span>
			))}
		</ul>
	);
}

export default ArtistList;