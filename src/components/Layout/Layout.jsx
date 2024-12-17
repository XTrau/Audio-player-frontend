import TrackController from '../TrackController/TrackController'
import Header from '../Header/Header'
import "./Layout.scss"
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Layout({children}) {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const user = useSelector(state => state.auth.user)
	const currentPath = useLocation();
	return (
		<>
			<Header/>
			<main>
				<div className="main-content">
					<div className="navigation">
						<nav>
							<ul>
								<Link to="/">
									<li className={`nav-item ${currentPath.pathname === "/" ? "active" : ""}`}>Главная</li>
								</Link>
								{isAuthenticated && (
									<Link to="/my_music">
										<li className={`nav-item ${currentPath.pathname === "/my_music" ? "active" : ""}`}>
											Моя музыка
										</li>
									</Link>)}
							</ul>

							<ul>
								<Link to="/search">
									<li className={`nav-item ${currentPath.pathname === "/search" ? "active" : ""}`}>Поиск</li>
								</Link>
								<Link to="/about">
									<li className={`nav-item ${currentPath.pathname === "/about" ? "active" : ""}`}>О
										Сайте
									</li>
								</Link>

								{
									user?.is_admin && (
										<>
											<Link to="/add_artist">
												<li className={`nav-item ${currentPath.pathname === "/add_artist" ? "active" : ""}`}>
													Добавить артиста
												</li>
											</Link>
											<Link to="/add_album">
												<li className={`nav-item ${currentPath.pathname === "/add_album" ? "active" : ""}`}>
													Добавить альбом
												</li>
											</Link>
										</>

									)
								}

							</ul>
						</nav>
					</div>
					<div className="page">
						{children}
					</div>
				</div>
			</main>
			<TrackController/>
		</>
	)
}

export default Layout
