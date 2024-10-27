import React from 'react';
import { Link } from "react-router-dom";
import "./NavDropBox.scss"
import { useDispatch, useSelector } from "react-redux";
import { AuthService as authService } from "../../../services/authService.js";
import { logout } from "../../../store/slices/authReducer.js";

function NavDropBox(props) {
	const user = useSelector(state => state.auth.user);
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const dispatch = useDispatch();

	const onClickLogout = async () => {
		await dispatch(logout());
		window.location.reload();
	}

	if (isAuthenticated) {
		return (
			<ul className="user-nav-drop-box">
				<Link to="/me" className="user-nav-drop-box-item user-nav-info">
					<h3>{user.username}</h3>
					<div>{user.email}</div>
				</Link>
				<Link to="/my_music" className="user-nav-drop-box-item">
					Моя музыка
				</Link>
				<button onClick={(e) => onClickLogout()} className="user-nav-drop-box-item logout-button">Выйти</button>
			</ul>
		)
	}

	return (
		<ul className="user-nav-drop-box">
			<Link to="/registration" className="user-nav-drop-box-item">Регистрация</Link>
			<Link to="/login" className="user-nav-drop-box-item">Вход</Link>
		</ul>
	);
}

export default NavDropBox;