import { useState, useRef } from 'react'
import { API_URL, FILE_ENDPOINT } from '../../config'

import './TrackToAdd.scss'
import { useOutsideClick } from "../../hooks/useOutsideClick.js";

function TrackToAdd({
											track,
											artists,
											index,
											changeTitle,
											removeTrackArtist,
											addTrackArtist,
											changeImage,
											changeAudio,
											removeTrack,
										}) {
	const [artistSearchValue, setArtistSearchValue] = useState('')
	const [onArtistSearchFocused, setOnArtistSearchFocused] = useState(false)
	const imageInputRef = useRef(null)
	const audioInputRef = useRef(null)
	const artistSearchRef = useRef(null)

	useOutsideClick(artistSearchRef, () => setOnArtistSearchFocused(false))


	return (
		<div className="add-track">
			<button onClick={() => imageInputRef.current.click()}>
				<img
					className="add-track__image"
					src={track.image}
				/>
				<input
					ref={imageInputRef}
					type="file"
					accept="image/png, image/jpeg, image/jpg"
					onChange={(e) => changeImage(e.target.files[0], index)}
					hidden
				/>
			</button>
			<div className="add-track__input">
				<input type="text"
							 placeholder={"Название трека"}
							 value={track.title}
							 onChange={(e) => changeTitle(e.target.value, index)}
							 onFocus={() => setOnArtistSearchFocused(true)}
				/>

				<div ref={artistSearchRef} className="artist-search">
					<input
						className="text-input"
						placeholder="Артист"
						value={artistSearchValue}
						onChange={(e) => setArtistSearchValue(e.target.value)}
						onFocus={() => setOnArtistSearchFocused(true)}
					/>

					<div className="artist-search-wrapper">
						{onArtistSearchFocused && (
							<ul className="artist-search-list">
								{artists
								.filter((artist) =>
									artist.name
									.toLocaleLowerCase()
									.includes(artistSearchValue.toLocaleLowerCase())
								)
								.map((artist) => (
									<li
										key={artist.id}
										onClick={() => {
											setOnArtistSearchFocused(false)
											addTrackArtist(artist, index)
										}}
										className="searched-artist"
									>
										<img
											className="searched-artist__image"
											src={
												API_URL + FILE_ENDPOINT + '/' + artist.image_file_name
											}
										/>
										<h4>{artist.name}</h4>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>

				<div className="mini-artist-list">
					{track.artists.map((artist) => (
						<button
							key={artist.id}
							onClick={() => removeTrackArtist(artist, index)}
							className="mini-artist"
						>
							<img
								className="mini-artist__image"
								src={API_URL + FILE_ENDPOINT + '/' + artist.image_file_name}
								width={30}
								height={30}
							/>
							<span>{artist.name}</span>
						</button>
					))}
				</div>

				<div className="add-track__buttons">
					<button
						className="btn"
						onClick={() => audioInputRef.current.click()}
					>
						Add Music file
						<input
							ref={audioInputRef}
							type="file"
							accept="audio/mp3"
							onChange={(e) => changeAudio(e.target.files[0], index)}
							hidden
						/>
					</button>
					<button
						className="btn"
						onClick={() => removeTrack(index)}
					>
						Remove Track
					</button>
				</div>
				{track.audioFile ? <p>File added! {track.audioFile.name}</p> : <></>}
			</div>
		</div>
	)
}

export default TrackToAdd
