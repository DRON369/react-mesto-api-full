function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image ${props.card ? "popup_opened" : ""}`}
    >
      <figure className="popup__container popup__container_type_image">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть просмотр изображения"
          onClick={props.onClose}
        ></button>
        <img
          src={props.card.link}
          alt="Увеличенное изображение места"
          className="popup__image"
        />
        <figcaption className="popup__label popup__label_type_image">
          {props.card.name}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
