import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleInputName = (event) => { // Обработчик поля ввода имени
    setName(event.target.value)
  };

  const handleInputStatus = (event) => { // Обработчик поля ввода статуса
    setDescription(event.target.value)
  };
  
  const handleSubmit = (event) => { // Обработчик сабмита формы
    event.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="profile" isOpen={isOpen} buttonText="Сохранить" onClose={onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_field_name" type="text" name="name" placeholder="Имя" id="name-input" minLength="2" maxLength="40" value={name || ''} onChange={handleInputName} required />
      <span className="popup__error name-input-error"></span>
      <input className="popup__input popup__input_field_status" type="text" name="status" placeholder="Статус" id="status-input" minLength="2" maxLength="200" value={description || ''} onChange={handleInputStatus} required />
      <span className="popup__error status-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
