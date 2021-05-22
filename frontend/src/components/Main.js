import Card from "./Card.js";
import React from "react";
import { UserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const user = React.useContext(UserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button
            className="profile__avatar-button"
            type="button"
            aria-label="Изменить аватар"
            onClick={props.onEditAvatar}
          >
            <img
              src={`${user.avatar}`}
              alt="Фото профиля"
              className="profile__avatar"
            />
          </button>
          <div className="profile__info">
            <div className="profile__title-container">
              <h1 className="profile__title">{user.name}</h1>
              <button
                className="profile__edit-button"
                aria-label="Редактировать профиль"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{user.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить карточку"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {props.cards.map((item) => (
            <Card
              card={item}
              key={item._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
