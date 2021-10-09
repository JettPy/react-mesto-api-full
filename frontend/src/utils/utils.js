export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const options = {
  baseUrl: 'https://server.suslika.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
    'Origin': 'https://mesto.suslika.nomoredomains.club',
    'Host': 'https://server.suslika.nomoredomains.club',
  }
};
