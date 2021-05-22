import React from "react";
import { UserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const user = React.useContext(UserContext);
  const isOwn = props.card.owner._id === user._id;

  const isLiked = props.card.likes.some((item) => item._id === user._id);

  const cardLikeButtonClassName = isLiked ? "cards__like-button_liked" : "";

  function handleClick() {
    props.onCardClick({
      id: props.card.id,
      link: props.card.link,
      name: props.card.name,
    });
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="cards__item" id={`${props.card.id}`}>
      <img
        src={`${props.card.link}`}
        alt="Изображение места"
        className="cards__image"
        onClick={handleClick}
      />
      <button
        className="cards__remove-button"
        type="button"
        aria-label="Удалить карточку"
        hidden={!isOwn}
        onClick={handleDeleteClick}
      ></button>
      <div className="cards__body">
        <h2 className="cards__label">{props.card.name}</h2>
        <div className="cards__like-container">
          <button
            className={`cards__like-button ${cardLikeButtonClassName}`}
            onClick={handleLikeClick}
            type="button"
            aria-label="Поставить лайк карточке"
          ></button>
          <p className="cards__likes-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
