import React, { useEffect, useState } from 'react';
import './auth.scss';
import { Link, redirect, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/authService.js";
import { useSelector } from "react-redux";


function LoginPage(props) {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		if (isAuthenticated) navigate("/me")
	}, [isAuthenticated]);

	const emailHandler = (e) => {
		setLogin(e.target.value);
		setErrorMessage("");
	}

	const passwordHandler = (e) => {
		setPassword(e.target.value);
		setErrorMessage("");
	}

	const onClickLogin = async (e) => {
		try {
			const response = await AuthService.login(login, password);
			if (response.status === 204)
				window.location.replace("/me");
		} catch (error) {
			setErrorMessage(error.response?.data?.detail || "Непредвиденная ошибка");
		}
	}

	return (
		<div className="auth-page">
			<div className="auth-wrapper">
				<h2>Вход</h2>
				{errorMessage && <div className="error-message">{errorMessage}</div>}

				<input className="auth-input" type="text" placeholder="Email или Имя пользователя" required={true} value={login}
							 onChange={(e) => emailHandler(e)}/>
				<input className="auth-input" type="password" placeholder="Пароль" required={true} value={password}
							 onChange={(e) => passwordHandler(e)}/>
				<div>Нет аккаунта? <Link to="/registration" className="link">Регистрация</Link></div>
				<button className="auth-button" onClick={onClickLogin}>Войти</button>
			</div>
		</div>
	);
}

export default LoginPage;