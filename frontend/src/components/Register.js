import React from 'react';
import { Link } from "react-router-dom";

function Register({ onRegister }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleInputEmail = (event) => { // Обработчик поля ввода эмейла
    setEmail(event.target.value);
  };

  const handleInputPassword = (event) => { // Обработчик поля ввода пароля
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => { // Обработчик сабмита формы
    event.preventDefault();
    onRegister(password, email);
  };

  return (
    <div className="sign">
      <h2 className="sign__title">Регистрация</h2>
      <form className="sign__form" name="login" onSubmit={handleSubmit} noValidate>
        <fieldset className="sign__set">
          <input className="sign__input" name="email" type="email" placeholder="Email" value={email} onChange={handleInputEmail} required/>
          <input className="sign__input" name="password" type="password" placeholder="Пароль" value={password} onChange={handleInputPassword} required/>
          <button className="button sign__button" aria-label="Зарегистрироваться"  type="submit">Зарегистрироваться</button>
        </fieldset>
      </form>
      <p className="sign__caption">Уже зарегистрированы?
        <Link to="/sign-in" className="sign__link"> Войти</Link>
      </p>
    </div>
  );
}

export default Register;