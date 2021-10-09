import React from 'react';
import logo from '../images/logo.svg';
import { Link, Switch, Route } from "react-router-dom";

function Header({ email, onSignOut}) {
  
  return (
    <header className="header page__header">
      <img src={logo} alt="Место" className="header__logo" />
      <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/">
          <ul className="header__container">
            <li><p className="header__email">{email}</p></li>
            <li><Link to="/sign-in" className="header__link" onClick={onSignOut}>Выйти</Link></li>
          </ul>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
