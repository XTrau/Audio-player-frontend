import { useState, useRef } from 'react'

import { createArtist } from '../../services/artistService'

import './AddArtistPage.scss'

function AddArtistPage() {
  const [artistName, setArtistName] = useState('')
  const [artistImageFile, setArtistImageFile] = useState(null)
  const [artistImage, setArtistImage] = useState(null)
  const fileInputRef = useRef(null)

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const sendArtist = async () => {
    if (artistName.trim() === '') {
      alert('Некорректное имя автора')
      return
    }

    const artist = {
      name: artistName.trim(),
      image_file: artistImageFile,
    }

    try {
      await createArtist(artist)
      alert('Артист успешно создан')
    } catch (e) {
      alert(e)
    }
  }

  const uploadImage = (e) => {
    setArtistImageFile(e.target.files[0])
    if (e.target.files[0])
      setArtistImage(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div className="add-artist-wrapper">
      <h2>Добавить артиста</h2>
      <div className="add-artist">
        <img
          src={artistImage}
          alt={''}
          className="add-artist__artist-image"
        />
        <div className="add-artist__right">
          <input
            className="text-input"
            type="text"
            placeholder="Имя артиста"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
          <button onClick={handleButtonClick}>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={uploadImage}
              ref={fileInputRef}
              hidden
            />
            Изменить изображение
          </button>
          <button onClick={sendArtist}>Отправить</button>
        </div>
      </div>
    </div>
  )
}

export default AddArtistPage
