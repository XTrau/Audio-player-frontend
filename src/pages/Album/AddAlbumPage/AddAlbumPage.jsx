import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import TrackToAdd from '../../../components/TrackToAdd/TrackToAdd.jsx'
import './AddAlbumPage.scss'
import ArtistSearcher from "../../../components/ArtistSearcher/ArtistSearcher.jsx";
import ArtistTrackToAddList from "../../../components/ArtistTrackToAddList/ArtistTrackToAddList.jsx";
import { AlbumService } from "../../../services/albumService.js";
import { TrackService } from "../../../services/trackService.js";

const initialTrack = {
	title: '', artists: [], image: null, imageFile: null, audioFile: null,
};

function AddAlbumPage() {
	const [tracksToAdd, setTracksToAdd] = useState([]);

	const [albumTitle, setAlbumTitle] = useState("");
	const [albumArtists, setAlbumArtists] = useState([]);

	const [albumImageFile, setAlbumImageFile] = useState(null);
	const [albumImage, setAlbumImage] = useState(null);

	const fileInputRef = useRef(null);

	const [error, setError] = useState("");
	const [successCreated, setSuccessCreated] = useState(false);
	const [loading, setLoading] = useState(false)

	const onClickSearchedArtist = (artist) => {
		for (const albumArtist of albumArtists) if (albumArtist.id === artist.id) return;
		setAlbumArtists(prev => [...prev, {...artist}]);
	};

	const onClickAlbumArtist = (artist) => {
		setAlbumArtists(prev => prev.filter(item => item.id !== artist.id));
	};

	const selectAlbumImage = (e) => {
		if (e.target.files[0]) {
			setAlbumImageFile(e.target.files[0]);
			setAlbumImage(URL.createObjectURL(e.target.files[0]));
		}
	};

	const changeTrackTitle = (text, index) => {
		setTracksToAdd((prev) => {
			prev[index].title = text;
			return [...prev];
		});
	};

	const addTrackArtist = (artist, index) => {
		setTracksToAdd((prev) => {
			const prevArtists = prev[index].artists;
			for (const trackArtist of prevArtists) if (trackArtist.id === artist.id) return prev;

			prev[index].artists = [...prevArtists, artist];
			return [...prev];
		})
	};

	const removeTrackArtist = (artist, index) => {
		setTracksToAdd((prev) => {
			prev[index].artists = prev[index].artists.filter((art) => art.id !== artist.id);
			return [...prev];
		})
	};

	const changeTrackImage = (file, index) => {
		setTracksToAdd((prev) => {
			if (file) {
				prev[index].imageFile = file;
				prev[index].image = URL.createObjectURL(file);
			}
			return [...prev];
		})
	};

	const changeTrackAudio = (file, index) => {
		setTracksToAdd((prev) => {
			prev[index].audioFile = file;
			return [...prev];
		})
	}

	const addTrack = () => {
		const track = {...initialTrack};
		setTracksToAdd((prev) => [...prev, track]);
	};

	const removeTrack = (index) => {
		setTracksToAdd((prev) => prev.filter((el, i) => i !== index));
	};

	const onClickTrackUpButton = (index) => {
		if (index <= 0) return;
		setTracksToAdd(prev => {
			const newTracks = [...prev];
			const temp = newTracks[index];
			newTracks[index] = newTracks[index - 1];
			newTracks[index - 1] = temp;
			return newTracks;
		});
	};

	const onClickTrackDownButton = (index) => {
		if (index + 1 >= tracksToAdd.length) return;
		setTracksToAdd(prev => {
			const newTracks = [...prev];
			const temp = newTracks[index];
			newTracks[index] = newTracks[index + 1];
			newTracks[index + 1] = temp;
			return newTracks;
		});
	};


	const onClickSend = async () => {
		if (albumTitle.trim() === '') {
			alert("Название альбома пустое");
			return;
		}

		setLoading(true);
		const fd = new FormData();
		fd.append("title", albumTitle.trim());
		if (albumImageFile) fd.append('image_file', albumImageFile);
		albumArtists.forEach((artist) => fd.append(`artist_ids`, artist.id));

		try {
			const response = await AlbumService.createAlbum(fd);
			const album_id = response.data.id;
			for (const track of tracksToAdd) {
				console.log(track.title);
				const number_at_album = tracksToAdd.indexOf(track) + 1;
				const track_fd = new FormData();
				track_fd.append("title", track.title)
				track_fd.append("number_at_album", number_at_album);
				track_fd.append("album_id", album_id);
				track.artists.forEach((artist) => track_fd.append(`artist_ids`, artist.id));
				if (track.imageFile) track_fd.append('image_file', track.imageFile);
				if (track.audioFile) track_fd.append('audio_file', track.audioFile);
				const res = await TrackService.createTrack(track_fd);
			}

			setSuccessCreated(true);
		} catch (e) {
			console.log(e);
			if (e.response?.data?.detail)
				setError(e.response.data.detail);
		}


		setLoading(false);
	};

	const onClickCreateMore = (e) => {
		setAlbumTitle("");
		setTracksToAdd([]);
		setAlbumArtists([]);
		setAlbumImageFile(null);
		setAlbumImage(null);

		setSuccessCreated(false);
	};

	if (successCreated) {
		return (
			<div className="add-album-page">
				<div className="album-created-wrapper">
					<div className="success-message">Альбом "{albumTitle}" Успешно создан!</div>
					<button className="btn" onClick={onClickCreateMore}>Создать ещё</button>
				</div>
			</div>
		);
	}


	return (
		<div className="add-album-page">
			<div className="add-album-wrapper">
				<h2>Добавить Альбом</h2>
				<div className="add-album-form">
					<button onClick={() => fileInputRef.current.click()}>
						<img
							className="add-album__album-image"
							src={albumImage}
						/>
						<input
							type="file"
							ref={fileInputRef}
							accept="image/png, image/jpeg, image/jpg"
							onChange={selectAlbumImage}
							hidden
						/>
					</button>
					<div className="add-album__input">
						<input
							type="text"
							placeholder="Название альбома"
							value={albumTitle}
							onChange={(e) => setAlbumTitle(e.target.value)}
						/>

						<ArtistSearcher artistClickHandler={onClickSearchedArtist}/>
						<ArtistTrackToAddList artists={albumArtists} artistClickHandler={onClickAlbumArtist}/>

						<p>Нет нужного артиста? <Link to="/add_artist"><span className="link">Добавить артиста</span></Link></p>
					</div>
				</div>

				<div className="track-add-list">
					{tracksToAdd.map((el, index) => (<TrackToAdd
						track={el}
						key={index}
						index={index}
						artists={el.artists}
						changeTitle={changeTrackTitle}
						addTrackArtist={addTrackArtist}
						removeTrackArtist={removeTrackArtist}
						changeImage={changeTrackImage}
						changeAudio={changeTrackAudio}
						removeTrack={removeTrack}
						onClickUpButton={onClickTrackUpButton}
						onClickDownButton={onClickTrackDownButton}
						first={index === 0}
						last={index === tracksToAdd.length - 1}
					/>))}
				</div>
				<div className="add-album__buttons">
					<button className="add-track-button" onClick={addTrack}>Добавить трек</button>
					<button className="send-tracks-button" onClick={onClickSend}>Отправить</button>
				</div>
			</div>
		</div>
	);
}

export default AddAlbumPage
