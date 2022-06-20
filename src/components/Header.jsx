import React from 'react';
import { Link, NavLink } from 'react-router-dom';
export const Header = () => {
    return (
        <div className="header header__container">
            <div className="header__logo">
                <img className="header__logo-img" src="/img/logo_book.png" alt="#" />
                <Link to="/" className="header__logo-link">
                    Библиотека
                </Link>
            </div>
            <nav>
                <ul className="header__nav-panel">
                    <li>
                        <NavLink className={({ isActive }) => `header__nav-list${isActive ? ' active' : ''}`} to="/">
                            Главная
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => `header__nav-list${isActive ? ' active' : ''}`}
                            to="favorites"
                        >
                            Избранное
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
