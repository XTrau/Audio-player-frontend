import { Link } from 'react-router-dom'
import './Header.scss'
import { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick.js";
import { useSelector } from "react-redux";
import RightMenu from "./RightMenu/RightMenu.jsx";

function Header() {
	const userNavButtonRef = useRef(null);
	const [activeUserNav, setActiveUserNav] = useState(false);
	const user = useSelector(state => state.auth.user);

	function showUserNav() {
		setActiveUserNav(prev => !prev);
	}

	const disableUserNav = (e) => {
		setActiveUserNav(false);
	}

	useOutsideClick(userNavButtonRef, () => {
		setActiveUserNav(false);
	})

	return (
		<>
			<header>
				<div className="header-logo">
					<Link to="/">
						<span id="site-logo">AudioPlayer</span>
					</Link>
				</div>

				<div className="search-section">
					<input type="text" className="search" placeholder="Поиск"/>
					<button className="search-button">
						<svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M15.6734 19.2924L15.0808 18.6378L14.3578 19.1449C13.0289 20.077 11.4784 20.6156 9.81184 20.6156C5.16364 20.6156 1.23999 16.4314 1.23999 11.0422C1.23999 5.653 5.16364 1.46875 9.81184 1.46875C14.46 1.46875 18.3837 5.653 18.3837 11.0422C18.3837 13.2467 17.705 15.2531 16.59 16.8688L16.1395 17.5216L16.6725 18.1089L22.8903 24.9596L21.847 26.112L15.6734 19.2924ZM18.1315 11.0422C18.1315 6.10819 14.509 1.95662 9.81184 1.95662C5.11473 1.95662 1.49219 6.10819 1.49219 11.0422C1.49219 15.9762 5.11473 20.1278 9.81184 20.1278C14.509 20.1278 18.1315 15.9762 18.1315 11.0422Z"
								fill="#383838" stroke="#595959" strokeWidth="2"/>
						</svg>
					</button>
				</div>

				<div className="user-nav" onClick={showUserNav}>
					<button id="three-line-button"></button>
				</div>
			</header>
			{activeUserNav && (<div className="overlay"></div>)}
			<RightMenu userNavButtonRef={userNavButtonRef} activeUserNav={activeUserNav} disableUserNav={disableUserNav} />
		</>
	)
}

export default Header
