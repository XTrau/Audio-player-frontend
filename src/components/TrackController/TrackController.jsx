import { useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	toNextTrack,
	toPrevTrack,
	playTrack,
	pauseTrack,
} from '../../store/slices/trackListReducer'
import { API_URL, FILE_ENDPOINT } from '../../config'
import './TrackController.scss'

function TrackController() {
	const currentTrack = useSelector((store) => store.trackList.track)
	const paused = useSelector((store) => store.trackList.paused)

	const [trackTime, setTrackTime] = useState(0)
	const [currentTime, setCurrentTime] = useState('00:00')
	const [durationTime, setDurationTime] = useState('00:00')
	const [volume, setVolume] = useState(localStorage.getItem('volume') ? localStorage.getItem('volume') : 5)

	const dispatch = useDispatch()
	const audioRef = useRef()

	const playPause = useCallback(() => {
		if (audioRef.current.paused) {
			dispatch(playTrack())
		} else {
			dispatch(pauseTrack())
		}
	}, [dispatch])

	const nextSong = useCallback(() => {
		dispatch(toNextTrack())
		dispatch(playTrack())
	}, [dispatch])

	const prevSong = useCallback(() => {
		dispatch(toPrevTrack())
		dispatch(playTrack())
	}, [dispatch])

	useEffect(() => {
		if (paused) audioRef.current?.pause()
		else audioRef.current?.play()
	}, [paused, currentTrack])

	useEffect(() => {
		if ('mediaSession' in navigator) {
			navigator.mediaSession.setActionHandler('play', playPause)
			navigator.mediaSession.setActionHandler('pause', playPause)
			navigator.mediaSession.setActionHandler('previoustrack', prevSong)
			navigator.mediaSession.setActionHandler('nexttrack', nextSong)
		}
	}, [playPause, nextSong, prevSong])

	useEffect(() => {
		audioRef.current.volume = (volume / 100).toFixed(2)
	}, [volume, audioRef])

	const updateTrackTime = () => {
		setTrackTime(
			audioRef.current.currentTime ? audioRef.current.currentTime : 0
		)
		getCurrentTime()
	}

	const onChangeTrackTime = (e) => {
		audioRef.current.currentTime = e.target.value
	}

	const onChangeVolume = (e) => {
		setVolume(e.target.value)
		localStorage.setItem('volume', e.target.value)
	}

	const strPadLeft = (string, pad) => {
		return (new Array(3).join(pad) + string).slice(-2)
	}

	const getDurationTime = () => {
		const minutes = Math.floor(audioRef.current.duration / 60)
		const seconds = Math.floor(audioRef.current.duration - minutes * 60)
		const time = strPadLeft(minutes, '0') + ':' + strPadLeft(seconds, '0')
		setDurationTime(time)
	}

	const getCurrentTime = () => {
		const minutes = Math.floor(audioRef.current.currentTime / 60)
		const seconds = Math.floor(audioRef.current.currentTime - minutes * 60)
		const time = strPadLeft(minutes, '0') + ':' + strPadLeft(seconds, '0')
		setCurrentTime(time)
	}

	if (!currentTrack) return <div></div>
	return (
		<nav className="track-controller">
			<audio
				src={
					currentTrack.audio_file_name
						? `${API_URL + FILE_ENDPOINT}/${currentTrack.audio_file_name}`
						: ''
				}
				onEnded={() => dispatch(toNextTrack())}
				onLoadedMetadata={getDurationTime}
				ref={audioRef}
				onTimeUpdate={updateTrackTime}
			></audio>

			<div className="controls">
				<button
					onClick={prevSong}
					className="left-next hide-text"
				>
					<span>previous track</span>
				</button>
				<button
					className="play-btn hide-text"
					onClick={playPause}
				>
					<span className={paused ? 'play-img' : 'pause-img'}>play</span>
				</button>
				<button
					onClick={nextSong}
					className="right-next hide-text"
				>
					<span>next track</span>
				</button>
			</div>

			<div className="track-info">
				<img
					src={`${API_URL + FILE_ENDPOINT}/${
						currentTrack.image_file_name
							? currentTrack.image_file_name
							: 'music.png'
					}`}
					alt=""
					width={70}
					height={70}
				/>
				<div className="track-description">
					<h2>{currentTrack.title}</h2>
					<div>
						{currentTrack.artists &&
							currentTrack.artists.map((artist) => artist.name).join(', ')}
					</div>
				</div>
			</div>

			<div className="audio-time-controller">
				<label
					htmlFor="timeline-range"
					className="hide-text"
				>
					Ползунок времени трека
				</label>
				<input
					type="range"
					id="timeline-range"
					value={trackTime}
					max={audioRef.current?.duration ? audioRef.current.duration : 99}
					onChange={onChangeTrackTime}
				/>
				<div className="times">
					<b>{currentTime}</b>
					<b>{durationTime}</b>
				</div>
			</div>

			<div className="controls">
				<label
					htmlFor="volume-range"
					className="hide-text"
				>
					Ползунок звука
				</label>
				<input
					id="volume-range"
					type="range"
					defaultValue={volume}
					onChangeCapture={onChangeVolume}
				/>
				<span
					className="volume-value"
					style={{left: `${volume - -4}px`}}
				>
          {volume}%
        </span>

				<button className="three-dot-btn hide-text">
					<div className="three-dot">settings</div>
				</button>
			</div>
		</nav>
	)
}

export default TrackController
