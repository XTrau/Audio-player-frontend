import './Track.scss';
import {useDispatch, useSelector} from 'react-redux';
import {
    playTrack,
    pauseTrack,
    changeTrack,
} from '../../store/slices/trackListReducer';

import {FileService} from "../../services/fileService.js";
import {like_track, unlike_track} from "../../store/slices/favouriteListReducer.js";
import {useRef, useState} from "react";
import ArtistList from "../ArtistList/ArtistList.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useOutsideClick} from "../../hooks/useOutsideClick.js";

function Track({track, index, currentList, liked}) {
    const currentTrack = useSelector((store) => store.trackList.track);
    const paused = useSelector((store) => store.trackList.paused);
    const playNow = track.id === currentTrack.id && !paused;
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(store => store.auth.isAuthenticated);
    const navigate = useNavigate();

    const [menu, setMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});

    const menuRef = useRef(null);
    const menuButtonRef = useRef(null);

    useOutsideClick(menuButtonRef, () => setMenu(false));


    function onClickPlay() {
        dispatch(changeTrack({index, list: currentList}));
        dispatch(playTrack());
    }

    function onClickPause() {
        dispatch(pauseTrack());
    }

    const onClickLike = async (e) => {
        if (!isAuthenticated) navigate("/login");
        dispatch(like_track(track.id));
    };

    const onClickUnlike = async (e) => {
        if (!isAuthenticated) navigate("/login");
        dispatch(unlike_track(track.id));
    };

    const onClickThreeDotButton = (e) => {
        setMenu(prev => !prev);
        const button = menuButtonRef.current;
        if (button) {
            const buttonRect = button.getBoundingClientRect();
            const x = e.clientX - buttonRect.x + 5;
            const y = e.clientY - buttonRect.y + 3;
            setMenuPosition({x, y});
        }
    };

    const onClickAddPlaylist = (e) => {
        setMenu(false);
    }

    return (
        <>
            <li className={(playNow ? 'play' : '') + ' track-wrapper shadow'}>
                <button
                    className="play-btn hide-text"
                    onClick={playNow ? onClickPause : onClickPlay}
                >
                    <span className={playNow ? 'pause-img' : 'play-img'}>play</span>
                </button>
                <img
                    src={FileService.getUrlToFile(track.image_file_name) || FileService.getDefaultImageUrl()}
                    alt="preview"
                    height={50}
                />
                <div className="track-info">
                    <div className="title">
                        <span>{track.title}</span>
                        <ArtistList artists={track.artists}/>
                    </div>
                </div>
                <button className="like-btn hide-text" onClick={liked ? onClickUnlike : onClickLike}>
                    {liked ? 'like' : 'unlike'}
                    <svg
                        width="32"
                        height="32"
                        viewBox="-6 -6 36 36"
                        fill={liked ? 'red' : 'none'}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                            stroke={liked ? 'red' : '#d2d2d2'}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <div className="menu-wrapper" ref={menuButtonRef}>
                    <button className="three-dot-btn" onClick={onClickThreeDotButton}>
                        <div className="three-dot hide-text"></div>
                    </button>
                    {menu && (
                        <div className="track-settings-menu" style={{
                            top: `${menuPosition.y}px`,
                            left: `${menuPosition.x}px`
                        }} ref={menuRef}
                        >
                            <Link to={"/add_playlist"}>
                                <div className="menu-item">
                                    Добавить в плейлист
                                </div>
                            </Link>
                            <div onClick={() => {}} className="menu-item delete-track">Удалить трек</div>
                        </div>
                    )}
                </div>
            </li>
        </>
    );
}

export default Track;
