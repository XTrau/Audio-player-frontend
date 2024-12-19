import {useState, useRef} from 'react';
import './AddArtistPage.scss';
import {ArtistService} from "../../../services/artistService.js";

function AddArtistPage() {
    const [artistName, setArtistName] = useState('');
    const [artistImageFile, setArtistImageFile] = useState(null);
    const [artistImage, setArtistImage] = useState(null);

    const [error, setError] = useState("");
    const [successCreated, setSuccessCreated] = useState(false);
    const [loading, setLoading] = useState(false)

    const fileInputRef = useRef(null);

    const artistNameHandler = (e) => {
        setArtistName(e.target.value);
        setError("");
    };

    const changeImageButtonClick = () => {
        fileInputRef.current.click();
    };

    const addMoreHandler = () => {
        setArtistName("");
        setError("");
        setArtistImage(null);
        setArtistImageFile(null);
        setSuccessCreated(false);
    };

    const onClickSend = async () => {
        if (artistName.trim() === '') {
            setError("Имя автора пустое");
            return;
        }

        setLoading(true);

        const fd = new FormData();
        fd.append('name', artistName);
        if (artistImageFile) fd.append('image_file', artistImageFile);

        try {
            const response = await ArtistService.createArtist(fd);
            setSuccessCreated(true);
        } catch (e) {
            console.log(e);
            if (e.response?.data?.detail)
                setError(e.response.data.detail);
        }
        setLoading(false);
    };

    const uploadImage = (e) => {
        if (e.target.files[0]) {
            setArtistImageFile(e.target.files[0]);
            setArtistImage(URL.createObjectURL(e.target.files[0]));
        } else {
            setArtistImageFile(null);
            setArtistImage(null);
        }
    };

    if (successCreated) {
        return (<div className="add-artist-page">
            <div className="add-artist-wrapper">
                <div className="success-message">
                    <p>
                        Артист {artistName} успешно добавлен!
                    </p>
                    <button className="add-more" onClick={(e) => addMoreHandler()}>Добавить ещё</button>
                </div>
            </div>
        </div>)
    }

    return (
        <div className="add-artist-page">
            <div className="add-artist-wrapper">
                <h2>Добавить артиста</h2>
                <div className="add-artist-form">
                    <img
                        src={artistImage}
                        alt={''}
                        className="add-artist__artist-image"
                    />
                    <div className="add-artist__right">
                        {error && <div className="error-message">{error}</div>}
                        <input
                            className="add-artist__artist-input"
                            type="text"
                            placeholder="Имя артиста"
                            value={artistName}
                            onChange={(e) => artistNameHandler(e)}
                        />
                        <button className="change-artist-image-button" onClick={changeImageButtonClick}>
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={uploadImage}
                                ref={fileInputRef}
                                hidden
                            />
                            Изменить изображение
                        </button>
                        <button className='send-artist-button' onClick={onClickSend} disabled={loading}>Отправить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddArtistPage
