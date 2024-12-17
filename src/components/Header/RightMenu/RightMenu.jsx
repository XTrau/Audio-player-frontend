import React from 'react';
import "./RightMenu.scss"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/slices/authReducer.js";
import { Link } from "react-router-dom";

function RightMenu({userNavButtonRef, activeUserNav, disableUserNav}) {
	const user = useSelector(state => state.auth.user);
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	const onClickLogout = async () => {
		await dispatch(logout());
		disableUserNav();
	}


	if (!user) {
		return (
			<div ref={userNavButtonRef} className={`right-menu ${activeUserNav ? "active" : ""}`}>
				<Link to={"/login"} onClick={disableUserNav}>
					<div className="right-menu-item">
						Вход
					</div>
				</Link>
				<Link to={"/registration"} onClick={disableUserNav}>
					<div className="right-menu-item">
						Регистрация
					</div>
				</Link>
				<div className="dashed-line"></div>
				<Link to="/settings" onClick={disableUserNav}>
					<div className="right-menu-item">
						Настройки
					</div>
				</Link>
			</div>
		)
	}


	return (
		<div ref={userNavButtonRef} className={`right-menu ${activeUserNav ? "active" : ""}`}>
			<Link to={"/me"} onClick={disableUserNav}>
				<div className="user-mini-info right-menu-item">
					<img src="" alt={''} width={36} height={36}/>
					<div className="user-description">
						<div className="user-username">{user?.username}</div>
						<div className="user-role">Пользователь</div>
					</div>
				</div>
			</Link>
			<div className="dashed-line"></div>
			<Link to="/settings" onClick={disableUserNav}>
				<div className="right-menu-item">
					Настройки
				</div>
			</Link>
			<div className="dashed-line"></div>
			<div className="right-menu-item logout" onClick={onClickLogout}>
				Выйти
			</div>
		</div>
	);
}

export default RightMenu;