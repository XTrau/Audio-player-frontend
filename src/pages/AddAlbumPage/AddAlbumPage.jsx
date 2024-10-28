import { useEffect, useState, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import TrackToAdd from '../../components/TrackToAdd/TrackToAdd'
import './AddAlbumPage.scss'
import { useOutsideClick } from "../../hooks/useOutsideClick.js";
import { FileService } from "../../services/fileService.js";
import { ArtistService } from "../../services/artistService.js";

const initialTrack = {
	title: '', artists: [], image: null, imageFile: null, audioFile: null,
};

function AddAlbumPage() {
	const [tracksToAdd, setTracksToAdd] = useState([{...initialTrack}]);

	const [albumTitle, setAlbumTitle] = useState("");
	const [artistSearchValue, setArtistSearchValue] = useState("");
	const [searchedArtists, setSearchedArtists] = useState([]);
	const [albumArtists, setAlbumArtists] = useState([]);

	const [albumImageFile, setAlbumImageFile] = useState(null);
	const [albumImage, setAlbumImage] = useState(null);

	const [onArtistSearchFocused, setOnArtistSearchFocused] = useState(false);

	const fileInputRef = useRef(null);
	const artistSearchRef = useRef(null);
	useOutsideClick(artistSearchRef, () => setOnArtistSearchFocused(false));

	const [debouncedArtistSearch, setDebouncedArtistSearch] = useState('');

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

	const artistSearchValueHandler = (e) => {
		setArtistSearchValue(e.target.value);
		setSearchedArtists([]);
	}

	const onClickSearchedArtist = (e, index) => {
		setOnArtistSearchFocused(false);
		if (albumArtists.find(artist => artist.id === searchedArtists[index].id)) return;
		setAlbumArtists(prev => [...prev, {...searchedArtists[index]}]);
		setArtistSearchValue("");
	}

	const onClickAlbumArtist = (e, name) => {
		setAlbumArtists(prev => prev.filter(artist => artist.name !== name));
	}

	const changeTrackTitle = (text, index) => {
		setTracksToAdd((prev) => {
			prev[index].title = text;
			return [...prev];
		});
	}

	const addTrackArtist = (artist, index) => {
		setTracksToAdd((prev) => {
			for (const art of prev[index].artists) if (art.id === artist.id) return prev;

			prev[index].artists = [...prev[index].artists, artist];
			return [...prev];
		})
	}

	const removeTrackArtist = (artist, index) => {
		setTracksToAdd((prev) => {
			prev[index].artists = prev[index].artists.filter((art) => art.id !== artist.id)
			return [...prev]
		})
	}

	const changeTrackImage = (file, index) => {
		setTracksToAdd((prev) => {
			if (file) {
				prev[index].imageFile = file
				prev[index].image = URL.createObjectURL(file)
			}
			return [...prev]
		})
	}

	const changeTrackAudio = (file, index) => {
		setTracksToAdd((prev) => {
			prev[index].audioFile = file
			return [...prev]
		})
	}

	const addTrack = () => {
		const initialTrack = {
			title: '', artists: [], image: null, imageFile: null, audioFile: null,
		}
		setTracksToAdd((prev) => [...prev, initialTrack])
	}

	const removeTrack = (index) => {
		setTracksToAdd((prev) => prev.filter((el, i) => i !== index))
	}

	const sendData = async () => {
		if (!albumTitle || albumArtists === null) {
			alert('Заполните все поля')
			return
		}

		for (const track of tracksToAdd) {
			if (!track.title || !track.audioFile || track.artists.length === 0) {
				alert('Заполните все поля')
				return
			}
		}

		const album = {
			title: albumTitle, image_file: albumImageFile, artist_id: albumArtists.id,
		}

		try {
			const res = await createAlbum(album)
			await sendTracks(res.album_id)
		} catch (e) {
			alert('Произошла ошибка')
			console.error(e)
		}
	}

	const sendTracks = async (album_id) => {
		if (!album_id) return

		for (const track of tracksToAdd) {
			const newTrack = {
				title: track.title,
				album_id: album_id,
				artist_ids: track.artists.map((artist) => artist.id),
				image_file: track.imageFile,
				audio_file: track.audioFile,
			}

			await createTrack(newTrack)
		}

		alert('Альбом успешно добавлен')
	}

	const selectAlbumImage = (e) => {
		if (e.target.files[0]) {
			setAlbumImageFile(e.target.files[0])
			setAlbumImage(URL.createObjectURL(e.target.files[0]))
		}
	}

	// const SearchedArtistsList = useMemo(() => {
	// 	return (
	// 		<>
	// 			{
	// 				searchedArtists.map((artist, index) => {
	// 					return (
	// 						<li
	// 							className="artist-search-item" key={artist.id}
	// 							onClick={(e) => onClickSearchedArtist(e, index)}
	// 						>
	// 							<img src={FileService.getUrlToFile(artist.image_file_name) || FileService.getDefaultImageUrl()}
	// 									 alt=""/>
	// 							<div>{artist.name}</div>
	// 						</li>
	// 					)
	// 				})
	// 			}
	// 		</>
	// 	)
	// }, [searchedArtists]);

	// const AlbumArtistListBlock = useMemo(() => {
	// 	return (
	// 		<ul className="album-artist-list">
	// 			{albumArtists.map((artist, index) => {
	// 				return (
	// 					<div key={artist.id}>
	// 						<button
	// 							onClick={(e) => onClickAlbumArtist(e, artist.name)}
	// 							className="mini-artist"
	// 						>
	// 							<img
	// 								className="mini-artist__image"
	// 								src={FileService.getUrlToFile(artist.image_file_name) || FileService.getDefaultImageUrl(artist.image_file_name)}
	// 								width={30}
	// 								height={30}
	// 							/>
	// 							<span>{artist.name}</span>
	// 						</button>
	// 					</div>
	// 				);
	// 			})}
	// 		</ul>)
	// }, [albumArtists])

	return (<div className="add-album-page">
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

						<div ref={artistSearchRef} className="artist-search">
							<input
								type="text"
								placeholder="Артист"
								value={artistSearchValue}
								onChange={(e) => artistSearchValueHandler(e)}
								onFocus={() => setOnArtistSearchFocused(true)}
							/>
							{onArtistSearchFocused && artistSearchValue && (
								<div className="artist-search-wrapper">
									<ul className="artist-search-list">
										{
											searchedArtists.map((artist, index) => {
												return (
													<li
														className="artist-search-item" key={artist.id}
														onClick={(e) => onClickSearchedArtist(e, index)}
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
							)}
						</div>
						{albumArtists.length > 0 &&
							(<ul className="album-artist-list">
								{albumArtists.map((artist, index) => {
									return (
										<div key={artist.id}>
											<button
												onClick={(e) => onClickAlbumArtist(e, artist.name)}
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
							</ul>)
						}
						<p>Нет нужного артиста? <Link to="/add_artist"><span className="link">Добавить артиста</span></Link></p>
					</div>
				</div>

				<div className="track-add-list">
					{tracksToAdd.map((el, index) => (
						<TrackToAdd
							track={el}
							key={index}
							index={index}
							artists={searchedArtists}
							changeTitle={changeTrackTitle}
							addTrackArtist={addTrackArtist}
							removeTrackArtist={removeTrackArtist}
							changeImage={changeTrackImage}
							changeAudio={changeTrackAudio}
							removeTrack={removeTrack}
						/>))}
				</div>
				<div className="add-album__buttons">
					<button className="add-track-button" onClick={addTrack}>Add Track</button>
					<button className="send-tracks-button" onClick={sendData}>Send Album</button>
				</div>
			</div>
		</div>


	)
}

export default AddAlbumPage
