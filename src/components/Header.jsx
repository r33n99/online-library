import React from "react";
import { Link, NavLink } from "react-router-dom";
export const Header = () => {
  return (
    <div className="header">
      <div className="header__logo" href="#">
        <img className="header__logo-img" src="/img/logo_book.png" alt="#" />
        <Link to="/" className="header__logo-link">
          Online library
        </Link>
      </div>
      <nav>
        <ul className="header__nav-panel">
          <li>
            <NavLink
              className="header__nav-list"
              activeClassName={"active"}
              to="/"
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              className="header__nav-list"
              activeClassName={"active"}
              to="wishList"
            >
              Wish list
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
