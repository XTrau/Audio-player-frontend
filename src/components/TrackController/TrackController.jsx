import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {pauseTrack, playTrack, toNextTrack, toPrevTrack,} from '../../store/slices/trackListReducer';
import './TrackController.scss';
import {FileService} from "../../services/fileService.js";
import ArtistList from "../ArtistList/ArtistList.jsx";

function TrackController() {
    const currentTrack = useSelector((store) => store.trackList.track);
    const paused = useSelector((store) => store.trackList.paused);

    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [currentTimeStr, setCurrentTimeStr] = useState('00:00');
    const [durationTimeStr, setDurationTimeStr] = useState('00:00');

    const [volume, setVolume] = useState(localStorage.getItem('volume') ? localStorage.getItem('volume') : 5);
    const [isHidden, setIsHidden] = useState(false);

    const dispatch = useDispatch();
    const audioRef = useRef(null);

    const titleContainerRef = useRef(null);
    const artistsContainerRef = useRef(null);
    const titleTextRef = useRef(null);
    const artistsTextRef = useRef(null);
    const [titleScroll, setTitleScroll] = useState(false);
    const [artistsScroll, setArtistsScroll] = useState(false);

    useEffect(() => {
        if (titleContainerRef.current && titleTextRef.current) {
            const isOverflowing = titleTextRef.current.scrollWidth > titleContainerRef.current.offsetWidth;
            setTitleScroll(isOverflowing);
        }
    }, [currentTrack]);

    useEffect(() => {
        if (artistsContainerRef.current && artistsTextRef.current) {
            const isOverflowing = artistsTextRef.current.scrollWidth > artistsContainerRef.current.offsetWidth;
            setArtistsScroll(isOverflowing);
        }
    }, [currentTrack]);

    const playPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (paused)
                dispatch(playTrack());
            else
                dispatch(pauseTrack());
        }
    };

    const nextSong = () => {
        dispatch(toNextTrack());

        setCurrentTime(0);

        const audio = audioRef.current;
        dispatch(playTrack());
        if (audio) audio.play();
    };

    const prevSong = () => {
        dispatch(toPrevTrack());

        setCurrentTime(0);

        const audio = audioRef.current;
        dispatch(playTrack());
        if (audio) audio.play();
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            if (paused) {
                audio.pause();
            } else {
                audio.play();
            }
        }
    }, [paused, currentTrack]);

    useEffect(() => {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.setActionHandler('play', playPause);
            navigator.mediaSession.setActionHandler('pause', playPause);
            navigator.mediaSession.setActionHandler('previoustrack', prevSong);
            navigator.mediaSession.setActionHandler('nexttrack', nextSong);
        }
    }, [playPause, nextSong, prevSong]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) audio.volume = (volume / 100).toFixed(2);
    }, [volume, audioRef.current]);

    useEffect(() => {
        const currentTime = (progress * duration) / 100;
        const timeStr = timeToStr(currentTime);
        setCurrentTimeStr(timeStr);
    }, [progress]);


    const onTrackTimeUpdate = () => {
        const audio = audioRef.current;
        if (audio) {
            setProgress((audio.currentTime / duration) * 100);
        }
    };

    const onChangeTrackTime = (e) => {
        if (e.target.value === undefined) return;
        const newCurrentTime = (e.target.value / 100 * duration);
        setProgress(e.target.value);
        setCurrentTime(newCurrentTime);
    };

    const onChangeVolume = (e) => {
        setVolume(e.target.value);
        localStorage.setItem('volume', e.target.value);
    };

    const setCurrentTime = (newCurrentTime) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = newCurrentTime;
        }
    }

    const strPadLeft = (string, pad) => {
        return (new Array(3).join(pad) + string).slice(-2);
    };

    const timeToStr = (timeValue) => {
        const minutes = Math.floor(timeValue / 60);
        const seconds = Math.floor(timeValue - minutes * 60);
        return strPadLeft(minutes, '0') + ':' + strPadLeft(seconds, '0');
    };

    const getDurationTime = () => {
        const audio = audioRef.current;
        if (audio) {
            setDuration(audio.duration);
            const timeStr = timeToStr(audio.duration);
            setDurationTimeStr(timeStr);
        }
    };

    const onClickHideButton = () => {
        setIsHidden(prev => !prev);
    };

    if (!currentTrack.title) {
        return (<div></div>);
    }

    return (
        <nav className={`track-controller ${isHidden ? "hidden" : ""}`}>
            <button className="hide-button" onClick={onClickHideButton}>{isHidden ? "↑" : "↓"}</button>
            <audio ref={audioRef} src={FileService.getUrlToFile(currentTrack.audio_file_name)} onTimeUpdate={onTrackTimeUpdate} onLoadedMetadata={getDurationTime} onEnded={nextSong}/>
            <div className="track-controller__track-info">
                <img
                    src={FileService.getUrlToFile(currentTrack.image_file_name) || FileService.getDefaultImageUrl()}
                    alt={""}
                    width={60}
                    height={60}
                />
                <div className="track-description">
                    <div className="track-description__title-container" ref={titleContainerRef}>
                        <div className={`track-description__title ${titleScroll ? "scroll-text" : ""}`}
                             ref={titleTextRef}>{currentTrack.title}
                        </div>
                    </div>
                    <div className="track-description__artists-container" ref={artistsContainerRef}>
                        <ArtistList artists={currentTrack.artists}/>
                    </div>
                </div>
            </div>

            <div className="track-controller__controller">
                <input
                    type="range"
                    min={0}
                    max={100}
                    step={0.1}
                    value={progress}
                    onChange={onChangeTrackTime}
                />

                <div className="track-controller__controls">
                    <b>{currentTimeStr}</b>
                    <div className="controls">
                        <button
                            onClick={prevSong}
                            className="left-next hide-text"
                        >
                            <div></div>
                        </button>
                        <button
                            className="play-btn hide-text"
                            onClick={playPause}
                        ><span className={paused ? "play-img" : "pause-img"}/></button>
                        <button
                            onClick={nextSong}
                            className="right-next hide-text"
                        >
                            <div></div>
                        </button>
                    </div>
                    <b>{durationTimeStr}</b>
                </div>
            </div>

            <div className="volume-controls">
                <input
                    id="volume-range"
                    type="range"
                    defaultValue={volume}
                    onChange={onChangeVolume}
                />
                <span className="volume-value">
          {volume}%
        </span>
            </div>
        </nav>
    );
}

export default TrackController;
