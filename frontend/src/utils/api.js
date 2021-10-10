import { backendUrl } from './utils.js';

class Api {

  constructor(baseUrl) {
    this._cardsUrl = baseUrl + '/cards';
    this._userUrl = baseUrl + '/users/me';
  }

  _checkResponse(result) { // Проверка промиса
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`);
  }

  getUserInfo(token) { // Загрузка информации о пользователе с сервера
    return fetch(this._userUrl, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._checkResponse);
  }

  getInitialCards(token) { // Загрузка карточек с сервера
    return fetch(this._cardsUrl, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._checkResponse);
  }

  updateUserInfo(name, about, token) { // Редактирование профиля
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._checkResponse);
  }

  addCard(name, link, token) { // Добавление новой карточки
      return fetch(this._cardsUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId, token) { // Удаление карточки
    return fetch(this._cardsUrl + '/' + cardId, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._checkResponse);
  }

  like(cardId, token) { // Постановка лайка
    return fetch(this._cardsUrl + '/' + cardId + '/likes', {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._checkResponse);
  }

  dislike(cardId, token) { // Снятие лайка
    return fetch(this._cardsUrl + '/' + cardId + '/likes', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._checkResponse);
  }

  updateAvatar(avatar, token) { // Обновление аватара пользователя
    return fetch(this._userUrl + '/avatar', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._checkResponse);
  }
}

const api = new Api(backendUrl);

export default api;
