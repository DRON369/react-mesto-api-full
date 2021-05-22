import authOkImage from "../images/auth-ok.svg"
import authFailImage from "../images/auth-fail.svg"

function InfoTooltip(props) {
  const background = props.isRegOk ? authOkImage : authFailImage;
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть форму"
          onClick={props.onClose}
        ></button>
        <div className="popup__auth-image" style={{backgroundImage: `url(${background})`}}></div>
        <h3 className="popup__label popup__label_type_info">
          {props.isRegOk
            ? "Вы успешно зарегестрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
