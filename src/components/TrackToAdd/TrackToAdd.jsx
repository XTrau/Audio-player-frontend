import { useRef } from 'react'

import './TrackToAdd.scss'
import ArtistSearcher from "../ArtistSearcher/ArtistSearcher.jsx";
import ArtistList from "../ArtistList/ArtistList.jsx";

function TrackToAdd({
											track,
											artists,
											index,
											removeTrackArtist,
											addTrackArtist,
											changeTitle,
											changeImage,
											changeAudio,
											removeTrack,
											onClickUpButton,
											onClickDownButton,
											first,
											last
										}) {
	const imageInputRef = useRef(null);
	const audioInputRef = useRef(null);

	const onSearchedArtistClick = (artist) => {
		addTrackArtist(artist, index);
	};

	const onTrackArtistClick = (artist) => {
		removeTrackArtist(artist, index);
	};


	return (<div className="track-to-add">
		<button className='image-input' onClick={() => imageInputRef.current.click()}>
			<img
				className="track-to-add__image"
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
		<div className="track-to-add__input">
			<input
				type="text"
				placeholder={"Название трека"}
				value={track.title}
				onChange={(e) => changeTitle(e.target.value, index)}
			/>

			<ArtistSearcher artistClickHandler={onSearchedArtistClick}/>
			<ArtistList artists={artists} artistClickHandler={onTrackArtistClick}/>

			<div className="add-track__buttons">
				<button
					className="btn"
					onClick={() => audioInputRef.current.click()}
				>
					Изменить MP3 Файл
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
					Удалить трек
				</button>
			</div>
			{track.audioFile ? <p>File added! {track.audioFile.name}</p> : <></>}
		</div>
		<div className="track-to-add-number-section">
			<div className="track-to-add-number">
				{index + 1}.
			</div>
			{!first && <button onClick={() => onClickUpButton(index)} className={"track-to-add-move-button-up"}></button>}
			{!last && <button onClick={() => onClickDownButton(index)} className={"track-to-add-move-button-down"}></button>}
		</div>

	</div>);
}

export default TrackToAdd
