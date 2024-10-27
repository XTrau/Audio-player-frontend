import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./UserPage.scss"

function UserPage() {
	const user = useSelector((state) => state.auth.user);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const isLoading = useSelector((state) => state.auth.isLoading);
	const navigate = useNavigate();

	const check = () => {
		if (!isAuthenticated) navigate("/login")
	}

	useEffect(() => {
		setTimeout(check, 100);
	}, [isAuthenticated]);

	if (isLoading) return (
		<div>Загрузка...</div>
	)

	return (
		<div className="user-page">
			<div className="user-page-wrapper">
				<div className="user-info">
					<div>Username: {user?.username}</div>
					<div>Email: {user?.email}</div>
					<div>Статус: {user?.is_admin ? "Администратор" : "Пользователь"}</div>
				</div>
			</div>
		</div>
	);
}

export default UserPage;