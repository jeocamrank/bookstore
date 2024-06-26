import React from "react";
import logo from "../../assets/picture/fahasa_logo.png";
import { RxMagnifyingGlass } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";
import { Avatar, Badge, Drawer, Dropdown, Popover, Space, message } from "antd";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { FiShoppingCart } from "react-icons/fi";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { callLogout } from "../../services/api";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.order.carts);

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(doLogoutAction());
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };

  let items = [
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
  if (user?.role === "ADMIN") {
    items.unshift({
      label: <Link to="/admin">Trang quản trị</Link>,
      key: "admin",
    });
  }
  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    user?.avatar
  }`;

  const contentPopver = () => {
    return (
      <div className="pop-cart-body">
        <div className="pop-cart-content">
          {carts?.map((book, index) => {
            return (
              <div className="book" key={`book-${index}`}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                    book?.detail?.thumbnail
                  }`}
                />
                <div className="title">{book?.detail?.mainText}</div>
                <div className="price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(book?.detail?.price)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="pop-cart-footer">
          <Link to="/order">
            <button style={{cursor: 'pointer'}}>Xem giỏ hàng</button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="header-container">
      <header className="page-header">
        <div className="page-header__top">
          <div className="page-header__logo">
            <span className="logo">
              <a href="/">
                <img className="fahasa-logo" src={logo} alt="" />
              </a>
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
            <nav className="navigation-setting">
              <ul>
                <li className="navigation-setting__item">
                  <Popover
                    className="popover-carts"
                    placement="topRight"
                    rootClassName="popover-carts"
                    title={"Sản phẩm mới thêm"}
                    content={contentPopver}
                    arrow={true}
                  >
                    <Badge count={carts?.length ?? 0} size={"small"} showZero>
                      <Link to="/order">
                        <FiShoppingCart
                          color="rgb(158, 13, 29)"
                          className="icon-cart"
                        />
                      </Link>
                    </Badge>
                  </Popover>
                </li>
                <li
                  className="navigation-setting__item btn-login text-ellipsis"
                  style={{ maxWidth: 152 }}
                >
                  {!isAuthenticated ? (
                    <span className="" onClick={() => navigate("/login")}>
                      {" "}
                      Đăng Nhập
                    </span>
                  ) : (
                    <Dropdown menu={{ items }} trigger={["click"]}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <Avatar src={urlAvatar} />
                          {user?.fullName}
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
