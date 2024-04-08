import React from "react";
import logo from "../../assets/picture/fahasa_logo.png";
import { RxMagnifyingGlass } from "react-icons/rx";
import "./header.scss";

const Header = () => {
  return (
    <div className="header-container">
      <header className="page-header">
        <div className="page-header__top">
          <div className="page-header__logo">
            <span className="logo">
              <img className="fahasa-logo" src={logo} alt="" />
              <RxMagnifyingGlass className="icon-search" />
            </span>
            
            <input
              className="input-search custom-shadow"
              type="text"
              placeholder="Tìm kiếm ..."
            />
          </div>
        </div>

        <div className="page-header__bottom">
          <ul className="navigation">
            <li className="navigation__item custom-shadow">Shounen</li>
            <li className="navigation__item custom-shadow">Romance</li>
            <li className="navigation__item custom-shadow">Comendy</li>
            <li className="navigation__item custom-shadow">Action</li>
            <li className="navigation__item custom-shadow">Sports</li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
