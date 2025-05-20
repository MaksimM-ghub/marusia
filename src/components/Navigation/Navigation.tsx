import "./Navigation.scss";
import { NavLink } from "react-router-dom";
import { UserLogin } from "../UserLogin/UserLogin";
import { SearchMovie } from "../SearchMovie/SearchMovie";
import { useState } from "react";
import { svg } from "../SvgComponents/SvgComponents";
import { useMediaQuery } from "@mui/material";

export const Navigation = () => {
  const [showInput, setShowInput] = useState<boolean>(false);

  const isMobile = useMediaQuery("(max-width: 920px)")

  const handleClick = () => {
    setShowInput(true);
  };

  return (
    <nav className="nav header__nav">
      <ul className="nav__list list-reset">
        {!isMobile && (
          <li className="nav__item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "nav__link active link-reset"
                  : "nav__link link-reset"
              }
              to="/"
            >
              Главная
            </NavLink>
          </li>
        )}
        <li className="nav__item">
          {isMobile ? (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "nav__link active link-reset"
                  : "nav__link link-reset"
              }
              to="/genre"
            >
              {svg.genre}
            </NavLink>
          ) : (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "nav__link active link-reset"
                  : "nav__link link-reset"
              }
              to="/genre"
            >
              Жанры
            </NavLink>
          )}
        </li>
        <li className="nav__item">
          {isMobile ? (
            <>
              <span onClick={handleClick} className="nav__icon">
                {svg.search}
              </span>
              {showInput && (
                <SearchMovie
                  showInput={showInput}
                  setShowInput={setShowInput}
                />
              )}
            </>
          ) : (
            <SearchMovie />
          )}
        </li>
        <li className="nav__item">
          <UserLogin isMobile={isMobile} />
        </li>
      </ul>
    </nav>
  );
};
