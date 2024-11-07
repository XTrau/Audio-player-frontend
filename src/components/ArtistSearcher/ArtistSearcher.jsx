import React, { useEffect, useRef, useState } from 'react';
import "./ArtistSearcher.scss"
import { FileService } from "../../services/fileService.js";
import { useOutsideClick } from "../../hooks/useOutsideClick.js";
import { ArtistService } from "../../services/artistService.js";

function ArtistSearcher({artistClickHandler}) {
	const [searchedArtists, setSearchedArtists] = useState([]);

	const [artistSearchValue, setArtistSearchValue] = useState("");
	const [debouncedArtistSearch, setDebouncedArtistSearch] = useState('');

	const [onArtistSearchFocused, setOnArtistSearchFocused] = useState(false);
	const artistSearchRef = useRef(null);
	useOutsideClick(artistSearchRef, () => setOnArtistSearchFocused(false));

	const artistSearchValueHandler = (e) => {
		setArtistSearchValue(e.target.value);
		setSearchedArtists([]);
	}

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedArtistSearch(artistSearchValue);
		}, 300);

		return () => clearTimeout(handler);
	}, [artistSearchValue]);

	useEffect(() => {
		if (debouncedArtistSearch) {
			const fetchArtists = async () => {
				try {
					const response = await ArtistService.searchArtists(debouncedArtistSearch);
					setSearchedArtists(response.data);
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			};
			fetchArtists();
		}
	}, [debouncedArtistSearch]);

	const onClickSearchedArtist = (e, artist) => {
		setOnArtistSearchFocused(false);
		setArtistSearchValue("");
		setSearchedArtists([]);
		artistClickHandler(artist);
	}


	return (
		<div ref={artistSearchRef} className="artist-searcher">
			<input
				type="text"
				placeholder="Артист"
				value={artistSearchValue}
				onChange={(e) => artistSearchValueHandler(e)}
				onFocus={() => setOnArtistSearchFocused(true)}
			/>
			{
				onArtistSearchFocused && artistSearchValue &&
				(
					<div className="artist-search-wrapper">
						<ul className="artist-search-list">
							{
								searchedArtists.map((artist) => {
									return (
										<li
											className="artist-search-item" key={artist.id}
											onClick={(e) => onClickSearchedArtist(e, artist)}
										>
											<img
												src={FileService.getUrlToFile(artist.image_file_name) || FileService.getDefaultImageUrl()}
												alt=""/>
											<div>{artist.name}</div>
										</li>
									)
								})
							}
						</ul>
					</div>
				)
			}
		</div>
	);
}

export default ArtistSearcher;