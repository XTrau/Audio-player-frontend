import React, { useState } from 'react';
import './auth.scss';
import { Link } from "react-router-dom";

function RegistrationPage(props) {
	const [email, setEmail] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [successRegistration, setSuccessRegistration] = useState(false);

	function validateFields() {
		let flag = true;

		if (email.length === 0) {
			flag = false;
		}

		if (userName.length === 0) {
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

	async function onClickRegister(e) {
		e.preventDefault();
		const validate = validateFields();

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
				<input className="auth-input" type="text" placeholder="Email" required={true} value={email}
							 onChange={(e) => setEmail(e.target.value)}/>
				<input className="auth-input" type="text" placeholder="Имя пользователя" required={true} value={userName}
							 onChange={(e) => setUserName(e.target.value)}/>
				<input className="auth-input" type="password" placeholder="Пароль" required={true} value={password}
							 onChange={(e) => setPassword(e.target.value)}/>
				<input className="auth-input" type="password" placeholder="Пароль" required={true} value={confirmPassword}
							 onChange={(e) => setConfirmPassword(e.target.value)}/>
				<div>Уже есть аккаунта? <Link to="/login" className="link">Вход</Link></div>
				<button className="auth-button" onClick={onClickRegister}>Зарегистрироваться</button>
			</div>
		</div>
	);
}

export default RegistrationPage;