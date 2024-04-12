import React from "react";
import logo from "../../assets/picture/fahasa_logo.png";
import { RxMagnifyingGlass } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";
import { Drawer } from "antd";
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
          <div className="navigation">
            <ul className="navigation-content">
              <li className="navigation-content__item custom-shadow">Shounen</li>
              <li className="navigation-content__item custom-shadow">Romance</li>
              <li className="navigation-content__item custom-shadow">Comendy</li>
              <li className="navigation-content__item custom-shadow">Action</li>
              <li className="navigation-content__item custom-shadow">Sports</li>
            </ul>
            <div className="navigation-setting">
              <IoMdSettings className="rotate setting-icon"/>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
