import React from 'react';
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <img alt="Аватар профиля" className="profile__avatar" src={currentUser.avatar}/>
          <button className="profile__avatar-button" onClick={onEditAvatar}></button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__status">{currentUser.about}</p>
            <button className="button button_type_edit" aria-label="Редактировать профиль" type="button" onClick={onEditProfile}></button>
          </div>
        </div>
        <button className="button button_type_add" aria-label="Добавить картинку" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="content__section">
        <ul className="elements">
          {cards.map((item) => (
            <Card card={item} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={item._id}/>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
