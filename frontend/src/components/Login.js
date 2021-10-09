import React from 'react';

function Login({ onLogin }) {

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
    onLogin(password, email);
  };

  return (
    <div className="sign">
      <h2 className="sign__title">Вход</h2>
      <form className="sign__form" name="login" onSubmit={handleSubmit} noValidate>
        <fieldset className="sign__set">
          <input className="sign__input" name="email" type="email" placeholder="Email" value={email} onChange={handleInputEmail} required/>
          <input className="sign__input" name="password" type="password" placeholder="Пароль" value={password} onChange={handleInputPassword} required/>
          <button className="button sign__button" aria-label="Войти"  type="submit">Войти</button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;