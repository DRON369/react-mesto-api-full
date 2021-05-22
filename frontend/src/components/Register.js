import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function emailHandler(event) {
    setEmail(event.target.value);
  }

  function passwordHandler(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onRegister({ email, password });
  }

  return (
    <div className="authpage">
      <div className="authpage__container">
        <h3 className="authpage__title">Регистрация</h3>
        <form
          className="authpage__form"
          method="POST"
          name="register"
          onSubmit={handleSubmit}
        >
          <input
            className="authpage__input"
            id="email"
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            minLength="2"
            maxLength="30"
            required
            onChange={emailHandler}
            value={email || ""}
          />
          <span id="email-error" className="error"></span>

          <input
            className="authpage__input"
            id="password"
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Пароль"
            required
            onChange={passwordHandler}
            value={password || ""}
          />
          <span className="error" id="password-error"></span>

          <button className="authpage__button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <Link className="authpage__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </div>
    </div>
  );
}

export default Register;
