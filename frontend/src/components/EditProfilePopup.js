import PopupWithForm from "./PopupWithForm.js";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  const currentUser = useContext(UserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="profileTitle"
        type="text"
        name="profileTitle"
        placeholder="Ваше имя"
        autoComplete="off"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChangeName}
        value={name || "Введите имя"}
      />
      <span id="profileTitle-error" className="error"></span>
      <input
        className="popup__input"
        id="profileSubtitle"
        type="text"
        name="profileSubtitle"
        placeholder="О себе"
        autoComplete="off"
        minLength="2"
        maxLength="200"
        required
        onChange={handleChangeDescription}
        value={description || "Расскажите о себе"}
      />
      <span id="profileSubtitle-error" className="error"></span>
      <button className="popup__submit-button" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
