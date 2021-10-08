export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (result)  => { // Проверка промиса
  if (result.ok) {
    return result.json();
  }
  return Promise.reject(`Ошибка: ${result.status}`);
}

export const register = (password, email) => { // Регистрация
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
  .then((response) => checkResponse(response));
}

export const authorize = (password, email) => { // Авторизация
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
  .then((response) => checkResponse(response));
}

export const getContent = (token) => { // Получение пользователя по токену
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => checkResponse(response));
}