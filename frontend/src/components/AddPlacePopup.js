import PopupWithForm from "./PopupWithForm.js";
import { useState, useEffect } from "react";

function AddPlacePopup(props) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  function handleChangeCardName(event) {
    setCardName(event.target.value);
  }

  function handleChangeCardLink(event) {
    setCardLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="placeLabel"
        type="text"
        name="placeLabel"
        autoComplete="off"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleChangeCardName}
        value={cardName || ""}
      />
      <span id="placeLabel-error" className="error"></span>
      <input
        className="popup__input"
        id="placeImage"
        type="url"
        name="placeImage"
        autoComplete="off"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangeCardLink}
        value={cardLink || ""}
      />
      <span className="error" id="placeImage-error"></span>
      <button className="popup__submit-button" type="submit">
        Создать
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
