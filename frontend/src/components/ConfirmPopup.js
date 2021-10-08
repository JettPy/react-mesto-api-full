import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onConfirm }) {

  function handleSubmit(event) { // Обработчик сабмита формы
    event.preventDefault();
    onConfirm();
  }

  return (
    <PopupWithForm title="Вы уверены?" name="delete" isOpen={isOpen} buttonText="Да" onClose={onClose} onSubmit={handleSubmit} />
  );
}

export default ConfirmPopup;