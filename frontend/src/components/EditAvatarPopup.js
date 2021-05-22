import PopupWithForm from "./PopupWithForm.js";
import { useRef, useEffect } from "react";

function EditAvatarPopup(props) {
  const linkRef = useRef("");

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar(linkRef.current.value);
  }

  useEffect(() => {
    linkRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="avatarLink"
        type="url"
        name="avatarLink"
        placeholder="Ссылка на изображение"
        autoComplete="off"
        minLength="2"
        maxLength="120"
        required
        ref={linkRef}
      />
      <span id="avatarLink-error" className="error"></span>
      <button className="popup__submit-button" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
