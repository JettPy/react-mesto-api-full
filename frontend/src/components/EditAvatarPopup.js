import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarSrc = React.useRef();

  React.useEffect(() => {
    avatarSrc.current.value = '';
  }, [isOpen]);

  const handleSubmit = (event) => { // Обработчик сабмита формы
    event.preventDefault();
    onUpdateAvatar(avatarSrc.current.value);
  }

  return (
    <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isOpen} buttonText="Сохранить" onClose={onClose} onSubmit={handleSubmit}>
      <input ref={avatarSrc} className="popup__input popup__input_field_avatar" type="url" name="avatar" placeholder="Ссылка на картинку" id="avatar-input" required />
      <span className="popup__error avatar-input-error"></span>
    </PopupWithForm>
  );
   
}

export default EditAvatarPopup;
