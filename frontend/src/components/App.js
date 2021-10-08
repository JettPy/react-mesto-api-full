import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import api from '../utils/api.js';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import * as auth from "../utils/auth.js";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [delitingCard, setDelitingCard] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registerd, setRegisterd] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  
  React.useEffect(() => { // Запросы к серверу за данными пользователя и карточек
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then((results) => {
        const [user, cards] = results;
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((error) => {
        console.log(error);
      });
    tokenCheck();
  }, []);

  const handleEditAvatarClick = () => { // Обработчик кнопки редактирования аватара
    setIsEditAvatarPopupOpen(true);
  };

  const handleUpdateAvatar = (avatar) => { // Обработчик обнавления аватара пользователя
    api.updateAvatar(avatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditProfileClick = () => { // Обработчик кнопки редактирования профиля
    setIsEditProfilePopupOpen(true);
  };

  const handleUpdateUser = (userData) => { // Обработчик обнавления данных пользователя
    api.updateUserInfo(userData.name, userData.about)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddPlaceClick = () => { // Обработчик кнопки добавления карточки
    setIsAddPlacePopupOpen(true);
  };

  const handleAddPlace = (name, link) => { // Обработчик добавления карточки
    api.addCard(name, link)
      .then((result) => {
        setCards([result, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirm = () => { // Обработчик подтверждения удаления карточки
    api.deleteCard(delitingCard._id)
    .then(() => {
      setCards(cards.filter((c) => c._id !== delitingCard._id));
      closeAllPopups();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleCardClick = (card) => { // Обработчик нажатия на карточку
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  function handleCardLike(card) { // Обработчик лайка картчки
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.dislike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    } else {
      api.like(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    }
  }

  function handleCardDelete(card) { // Обработчик удаления картчки
    setIsConfirmPopupOpen(true);
    setDelitingCard(card);
  }

  const handleSignOut = () => { // Обработчик выхода из системы
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  const handleRegistration = (password, email) => { // Обработчик регистрации
    auth.register(password, email)
    .then(() => {
      setRegisterd(true);
      history.push('/sign-in');
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(()=> {
      setIsInfoTooltipOpen(true);
    });
  }

  const handleLogin = (password, email) => { // Обработчик входа в систему
    auth.authorize(password, email)
    .then((response) => {
      setLoggedIn(true);
      setEmail(email);
      localStorage.setItem('jwt', response.token);
      history.push('/');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const tokenCheck = () => { // Проверка на сохраненный токен
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
      .then((response) => {
        if (response) {
          setLoggedIn(true);
          setEmail(response.data['email']);
          history.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  const closeAllPopups = () => { // Закрытие всех попапов
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onSignOut={handleSignOut}/>
      <Switch>
        <Route path="/sign-up">
          <Register onRegister={handleRegistration}/>
        </Route>
        <Route path="/sign-in">
          <Login onLogin={handleLogin}/>
        </Route>
        <ProtectedRoute
          path="/"
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}>
        </ProtectedRoute>
      </Switch>
      <Footer />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isRegistered={registerd}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      <ImagePopup
        card={selectedCard}
        name="image"
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onConfirm={handleConfirm}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
