export const validateEmail = (email) => {
	const reg = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
	return reg.test(email);
};

export const validateUsername = (username) => {
	const reg = /^[a-zA-Z\d_-]+$/;
	return reg.test(username);
}