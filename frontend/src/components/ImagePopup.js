import React from 'react';

function ImagePopup({ card, name, isOpen, onClose }) {
  
  return(
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`} >
      <figure className="popup__figure dialog-window">
        <button className="button button_type_close" aria-label="Закрыть" type="button" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name}/>
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup
