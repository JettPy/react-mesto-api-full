import React from 'react';

function PopupWithForm({ title, name, isOpen, buttonText, onClose, children, onSubmit }) {
  
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`} >
      <div className="popup__content dialog-window">
        <button className="button button_type_close" aria-label="Закрыть" type="button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <fieldset className="popup__set">
            {children}
            <button className="button popup__button" aria-label={buttonText} type="submit">{buttonText}</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
