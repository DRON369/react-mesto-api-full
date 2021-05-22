import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";

function Header(props) {
  const [nextPage, setNextPage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    nextPageHandler();
    setUserEmail(props.userData.email);
  }, [currentPath]);

  function nextPageHandler() {
    if (currentPath === "/sign-in") {
      setNextPage("/sign-up");
      return;
    }
    if (currentPath === "/sign-up") {
      setNextPage("/sign-in");
      return;
    }
  }

  function logoutHandler() {
    props.onLogout();
  }

  return (
    <header className="header">
      <Link to="/" className="header__logo"></Link>
      <div className="header__auth-wrap">
        <p className="header__username">
          {currentPath === "/" ? userEmail : ""}
        </p>
        <Link
          to={nextPage}
          className="header__link"
          onClick={props.loggedIn ? logoutHandler : nextPageHandler}
        >
          {currentPath === "/" ? "Выйти" : ""}
          {currentPath === "/sign-in" ? "Регистрация" : ""}
          {currentPath === "/sign-up" ? "Войти" : ""}
        </Link>
      </div>
    </header>
  );
}

export default Header;
