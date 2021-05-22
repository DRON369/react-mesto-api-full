function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      id={props.name}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть форму"
          onClick={props.onClose}
        ></button>
        <h3 className="popup__label">{props.title}</h3>
        <form
          className="popup__form"
          method="POST"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children};
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
