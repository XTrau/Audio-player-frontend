import React, { useEffect, useState } from 'react';
import './auth.scss';
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/authService.js";
import { useSelector } from "react-redux";

function RegistrationPage(props) {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [successRegistration, setSuccessRegistration] = useState(false);
	const [loading, setLoading] = useState(false);

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated)
			navigate("/me");
	}, [isAuthenticated]);


	function validateFields() {
		let flag = true;

		if (email.length === 0) {
			flag = false;
		}

		if (username.length === 0) {
			flag = false;
		}

		if (password.length === 0) {
			flag = false;
		}

		if (confirmPassword.length === 0) {
			flag = false;
		}

		if (password !== confirmPassword) {
			flag = false;
		}

		return flag;
	}

	const emailHandler = (e) => {
		setEmail(e.target.value);
	}

	const usernameHandler = (e) => {
		setUsername(e.target.value);
	}

	const passwordHandler = (e) => {
		setPassword(e.target.value);
	}

	const confirmPasswordHandler = (e) => {
		setConfirmPassword(e.target.value);
	}

	async function onClickRegister(e) {
		const validate = validateFields();
		if (!validate) {
			setLoading(false);
			return null;
		}

		setLoading(true);
		try {
			const response = await AuthService.register(username, email, password);
			if (response.status === 200) setSuccessRegistration(true);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	}

	if (successRegistration) {
		return (
			<div className="auth-page">
				<div className="auth-wrapper">
					<h3>Поздравляем, вы успешно зарегистрировались!</h3>
					<span>Для входа перейдите на страницу входа и войдите под своими данными</span>
					<span><Link to="/login" className="link"><b>Вход</b></Link></span>
				</div>
			</div>
		)
	}

	return (
		<div className="auth-page">
			<div className="auth-wrapper">
				<h2>Регистрация</h2>
				<input className="auth-input" type="text" placeholder="Email" value={email}
							 onChange={(e) => emailHandler(e)}/>
				<input className="auth-input" type="text" placeholder="Имя пользователя" value={username}
							 onChange={(e) => usernameHandler(e)}/>
				<input className="auth-input" type="password" placeholder="Пароль" value={password}
							 onChange={(e) => passwordHandler(e)}/>
				<input className="auth-input" type="password" placeholder="Пароль" value={confirmPassword}
							 onChange={(e) => confirmPasswordHandler(e)}/>
				<div>Уже есть аккаунта? <Link to="/login" className="link">Вход</Link></div>
				<button className="auth-button" onClick={onClickRegister} disabled={loading}>Зарегистрироваться</button>
			</div>
		</div>
	);
}

export default RegistrationPage;