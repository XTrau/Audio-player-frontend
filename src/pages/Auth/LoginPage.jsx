import React, { useState } from 'react';
import './auth.scss';
import { Link } from "react-router-dom";

function LoginPage(props) {
	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")
	return (
		<div className="auth-page">
			<div className="auth-wrapper">
				<h2>Вход</h2>
				<input className="auth-input" type="text" placeholder="Email или Имя пользователя" required={true} value={login}
							 onChange={(e) => setLogin(e.target.value)}/>
				<input className="auth-input" type="password" placeholder="Пароль" required={true} value={password}
							 onChange={(e) => setPassword(e.target.value)}/>
				<div>Нет аккаунта? <Link to="/registration" className="link">Регистрация</Link></div>
				<button className="auth-button">Войти</button>
			</div>
		</div>
	);
}

export default LoginPage;