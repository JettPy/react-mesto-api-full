import { backendUrl } from './utils.js';

const checkResponse = (result)  => { // Проверка промиса
  if (result.ok) {
    return result.json();
  }
  return Promise.reject(`Ошибка: ${result.status}`);
}

export const register = (password, email) => { // Регистрация
  return fetch(`${backendUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
  .then((response) => checkResponse(response));
}

export const authorize = (password, email) => { // Авторизация
  return fetch(`${backendUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
  .then((response) => checkResponse(response));
}

export const getContent = (token) => { // Получение пользователя по токену
  return fetch(`${backendUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
  .then((response) => checkResponse(response))
  .then(data => data);
}