import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('')
  }, [isOpen]);

  const handleInputName = (event) => { // Обработчик поля ввода названия
    setName(event.target.value)
  };

  const handleInputLink = (event) => { // Обработчик поля ввода ссылки
    setLink(event.target.value)
  };
  
  const handleSubmit = (event) => { // Обработчик сабмита формы
    event.preventDefault();
    onAddPlace(name, link);
  }

  return (
    <PopupWithForm title="Новое место" name="element" isOpen={isOpen} buttonText="Сохранить" onClose={onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_field_title" type="text" name="title" placeholder="Название" id="title-input" minLength="2" maxLength="30" onChange={handleInputName} value={name} required />
      <span className="popup__error title-input-error"></span>
      <input className="popup__input popup__input_field_image" type="url" name="image" placeholder="Ссылка на картинку" id="image-input" onChange={handleInputLink} value={link} required />
      <span className="popup__error image-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
