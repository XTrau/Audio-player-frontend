import React, { useState } from 'react';
import './auth.scss';

function RegistrationPage(props) {
	const [email, setEmail] = useState("")
	const [userName, setUserName] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
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
				<div>Уже есть аккаунта? <a href="/login" className="link">Вход</a></div>
				<button className="auth-button">Зарегистрироваться</button>
			</div>
		</div>
	);
}

export default RegistrationPage;