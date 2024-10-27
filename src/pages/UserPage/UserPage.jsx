import React, { useEffect, useState } from 'react';
import { AuthService } from "../../services/authService.js";
import error from "eslint-plugin-react/lib/util/error.js";

function UserPage() {
	const [user, setUser] = useState({
		username: "", password: "", is_admin: false
	});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	async function getUser() {
		setIsLoading(true);
		try {
			const response = await AuthService.me();
			setUser(response.data)
		} catch (e) {
			console.error(e);
			if (e.response.status === 401)
				window.location.replace("/login");
			else
				setError("Непредвиденная ошибка")
		}
		setIsLoading(false);
	}

	useEffect(() => {
		getUser();
	}, [])

	if (isLoading) return (<div>Загрузка...</div>);
	if (error) return (<div>{error}</div>);
	return (
		<div className="user-page">
			<div className="user-info">
				<div className="user-info-wrapper">
					<div>Username: {user.username}</div>
					<div>Email: {user.email}</div>
					<div>Статус: {user.is_admin ? "Администратор" : "Пользователь"}</div>
				</div>
			</div>
		</div>
	);
}

export default UserPage;