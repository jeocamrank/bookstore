import React from "react";
import logo from "../../assets/picture/fahasa_logo.png";
import { RxMagnifyingGlass } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";
import { Drawer, Dropdown, Space } from "antd";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";

const Header = () => {
  const user = useSelector((state) => state.account.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(doLogoutAction());
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };

  const itemsDropdown = [
    {
      label: <label style={{ cursor: "pointer" }}>Quản lý tài khoản</label>,
      key: "account",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
  ];

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
              <li className="navigation-content__item custom-shadow">
                Shounen
              </li>
              <li className="navigation-content__item custom-shadow">
                Romance
              </li>
              <li className="navigation-content__item custom-shadow">
                Comendy
              </li>
              <li className="navigation-content__item custom-shadow">Action</li>
              <li className="navigation-content__item custom-shadow">Sports</li>
            </ul>
            <nav className="user-setting">
              <ul>
                <li></li>
                <li></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
