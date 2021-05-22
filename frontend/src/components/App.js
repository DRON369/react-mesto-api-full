import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import * as authorization from "../utils/authorization.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { useEffect, useState } from "react";
import { UserContext } from "../contexts/CurrentUserContext.js";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

function App() {
  //!==============================================
  const [isRegOk, setIsRegOk] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [userData, setUserData] = useState({
    id: "",
    email: "",
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  function logout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserData({
      id: "",
      email: "",
    });
    history.push("/sign-in")
  }

  function handleLogin({ email, password }) {
    authorization
      .authorize(email, password)
      .then((data) => {
        if (!data) throw new Error("Неверные имя пользователя или пароль");
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          tokenCheck();
          history.push("/");
        }
      })
      .catch((err) =>
        console.log(`При загрузке данных возникла ошибка: ${err.status}`)
      );
  }

  function handleRegister({ email, password }) {
    authorization
      .register({ email, password })
      .then((res) => {
        if (!res || res.statusCode === 400) {
          throw new Error("Что-то пошло не так");
        }
      })
      .then(() => {
        setIsRegOk(true);
        setInfoTooltipPopupOpen(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        setIsRegOk(false);
        setInfoTooltipPopupOpen(true);
        console.log(`При загрузке данных возникла ошибка: ${err.status}`);
      });
  }

  const tokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      let jwt = localStorage.getItem("jwt");
      authorization
        .getContent(jwt)
        .then(({ data }) => {
          if (data._id) {
            setLoggedIn(true);
            setUserData({ id: data._id, email: data.email });
          }
        })
        .catch((err) =>
          console.log(`При загрузке данных возникла ошибка: ${err.status}`)
        );
    }
  };
  //!==============================================

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) =>
        console.log(`При загрузке данных возникла ошибка: ${err.status}`)
      );
  }, []);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleAddPlaceSubmit(newCard) {
    api
      .createCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`При загрузке данных возникла ошибка: ${err.status}`)
      );
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setSelectedCard(null);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipPopupOpen(false);
  }

  function handleUpdateUser(user) {
    api
      .setUserInfo(user)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`При загрузке данных возникла ошибка: ${err.status}`)
      );
  }

  function handleUpdateAvatar(avatar) {
    api
      .setAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`При загрузке данных возникла ошибка: ${err.status}`)
      );
  }

  const [cards, setCards] = useState([]);

  const cardsHandler = () => {
    api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) =>
        console.log(`При загрузке данных возникла ошибка: ${err.status}`)
      );
  };

  useEffect(() => {
    cardsHandler();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) =>
        console.log(`При загрузке данных возникла ошибка: ${err.status}`)
      );
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((delCard) => {
        setCards((state) =>
          state.filter((currentCard) =>
            currentCard._id === card._id ? delCard._id : currentCard
          )
        );
      })
      .catch((err) =>
        console.log(`При загрузке данных возникла ошибка: ${err.status}`)
      );
  }

  return (
    <UserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <div className="page__container">
            <Header loggedIn={loggedIn} userData={userData} onLogout={logout} />
            <Switch>
              <ProtectedRoute
                exact
                path="/"
                loggedIn={loggedIn}
                component={Main}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />

              <Route path="/sign-in">
                <Login onLogin={handleLogin} />
              </Route>

              <Route path="/sign-up">
                <Register onRegister={handleRegister} />
              </Route>

              <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>
            <Footer />

            <InfoTooltip
              isOpen={isInfoTooltipPopupOpen}
              onClose={closeAllPopups}
              isRegOk={isRegOk}
            />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            ></AddPlacePopup>

            {selectedCard ? (
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
