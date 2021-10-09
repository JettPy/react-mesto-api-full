import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  const handleClick = () => { // Обработчик нажатия на картчку
    onCardClick(card);
  };

  const handleLikeClick = () => { // Обработчик лайка картчки
    onCardLike(card);
  };

  const handleDeleteClick = () => { // Обработчик удаления картчки
    onCardDelete(card);
  };

  return (
    <li className="element">
      <button className="button button_type_image" type="button" onClick={handleClick}></button>
      {isOwn && <button className="button button_type_delete" aria-label="Удалить" type="button" onClick={handleDeleteClick}></button>}
      <img className="element__image" src={card.link} alt={card.name} />
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-group">
          <button className={`button button_type_like ${isLiked && "button_active"}`} aria-label="Лайк" type="button" onClick={handleLikeClick}></button>
          <p className="element__likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
