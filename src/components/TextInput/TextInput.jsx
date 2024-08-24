import "./TextInput.scss"

const TextInput = ({placeholder, data, setData, onFocus}) => {
	return (
		<div className="text-input-wrapper">
			<input
				className="text-input"
				placeholder={placeholder}
				value={data}
				onChange={(e) => setData(e.target.value)}
				onFocus={onFocus}
			/>
		</div>
	);
};

export default TextInput;