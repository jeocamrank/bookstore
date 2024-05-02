import React, { useEffect, useState } from "react";
import {
  Button,
  Carousel,
  Col,
  Form,
  Pagination,
  Row,
  Spin,
  Tabs,
} from "antd";
import banner1 from "../../assets/picture/banner1.jpg";
import banner2 from "../../assets/picture/banner2.jpg";
import banner3 from "../../assets/picture/banner3.jpg";
import banner4 from "../../assets/picture/banner4.jpg";
import banner5 from "../../assets/picture/pic1.jpg";
import banner6 from "../../assets/picture/pic2.jpg";
import banner7 from "../../assets/picture/pic3.jpg";
import banner8 from "../../assets/picture/pic4.jpg";
import "./home.scss";
import { callFetchCategory, callFetchListBook } from "../../services/api";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { FcBookmark } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const contentStyle = {
  height: "320px",
  width: "100%",
  borderRadius: "8px",
};

const Home = () => {
  const [listCategory, setListCategory] = useState([]);
  const [listBook, setListBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-sold");

  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const initCategory = async () => {
      const res = await callFetchCategory();
      if (res && res.data) {
        const d = res.data.map((item) => {
          return { label: item, value: item };
        });
        setListCategory(d);
      }
    };
    initCategory();
  }, []);

  useEffect(() => {
    fetchBook();
  }, [current, pageSize, filter, sortQuery]);

  const fetchBook = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await callFetchListBook(query);
    if (res && res.data) {
      setListBook(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const handleOnchangePage = (pagination) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }

    if (pagination && pagination.pageSize != pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  const items = [
    {
      key: "sort=-sold",
      label: `Phổ biến`,
      children: <></>,
    },
    {
      key: "sort=-updatedAt",
      label: `Hàng Mới`,
      children: <></>,
    },
    {
      key: "sort=price",
      label: `Giá Thấp Đến Cao`,
      children: <></>,
    },
    {
      key: "sort=-price",
      label: `Giá Cao Đến Thấp`,
      children: <></>,
    },
  ];

  const nonAccentVietnamese = (str) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  };

  const convertSlug = (str) => {
    str = nonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    const to =
      "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };

  const handleRedirectBook = (book) => {
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}?id=${book._id}`);
  };

  return (
    <div className="homepage-container">
      <div className="top-banner">
        <div className="left-content">
          <Carousel autoplay className="left-content__banner custom-shadow">
            <div>
              <img src={banner1} style={contentStyle} alt="" />
            </div>
            <div>
              <img src={banner2} style={contentStyle} alt="" />
            </div>
            <div>
              <img src={banner3} style={contentStyle} alt="" />
            </div>
            <div>
              <img src={banner4} style={contentStyle} alt="" />
            </div>
          </Carousel>
        </div>
        <div className="right-content custom-shadow">
          <div className="right-content__header-text custom-shadow">
            <h3>Bảng xếp hạng bán chạy tuần</h3>
            <p>Naruto</p>
          </div>
          <div className="right-content__body-content">
            <div className="body_content-right custom-shadow">
              <img
                src="http://localhost:8080/images/book/3-cd33ea8d2a87955b4aed93c3f56f41af.jpg"
                alt=""
              />
            </div>
            <div className="body_content-left custom-shadow">
              <h4>Tác giả:</h4>
              <p> Kishimoto Masashi</p>
              <div className="black-line" />
              <h4>Nhà xuất bản:</h4>
              <p>Kim Đồng</p>
              <div className="black-line" />
              <h4>Hình Thức:</h4>
              <p>Bìa cứng</p>
              <div className="black-line" />
              <h2 style={{ color: "rgb(158, 13, 29)" }}>45.000 đ</h2>
              <Button className="btn-xemthem">Xem Thêm</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="second-banner">
        <div className="second-banner__content-item">
          <a href="">
            <img src={banner5} alt="" />
          </a>
        </div>
        <div className="second-banner__content-item">
          <a href="">
            <img src={banner6} alt="" />
          </a>
        </div>
        <div className="second-banner__content-item">
          <a href="">
            <img src={banner7} alt="" />
          </a>
        </div>
        <div className="second-banner__content-item-last">
          <a href="">
            <img src={banner8} alt="" />
          </a>
        </div>
      </div>
      <div className="content-bar">
        <div style={{ marginRight: "5px" }}>
          <FcBookmark />
        </div>
        <span>Xu Hướng</span>
      </div>
      <Col style={{ marginBottom: "10px" }}>
        <Spin spinning={isLoading} tip="Loading...">
          <div>
            <Row>
              <Tabs
                defaultActiveKey="sort=-sold"
                items={items}
                onChange={(value) => {
                  setSortQuery(value);
                }}
                style={{ overflowX: "auto", fontWeight: "bold" }}
              />
            </Row>
            <Row className="customize-row">
              {listBook?.map((item, index) => {
                return (
                  <div
                    className="book-item custom-shadow"
                    key={`book-${index}`}
                    onClick={() => handleRedirectBook(item)}
                  >
                    <div className="book-item__thumbnail">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                          item.thumbnail
                        }`}
                        alt=""
                      />
                    </div>
                    <div className="book-item__title" title={item.mainText}>
                      <h4 style={{ maxHeight: "43px" }} className="two-line-h4">
                        {item.mainText}
                      </h4>
                      <p className="text-ellipsis">{item.author}</p>
                    </div>
                    <div className="book-item__order">
                      <div className="book-item__price">
                        <h4>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item?.price ?? 0)}
                        </h4>
                      </div>
                      <div>
                        <span style={{ marginRight: "8px" }}>
                          <HeartOutlined />
                        </span>
                        <span className="cart-item">
                          <ShoppingCartOutlined />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Row>
            <div style={{ marginTop: 30 }}></div>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                current={current}
                total={total}
                pageSize={pageSize}
                responsive
                onChange={(p, s) =>
                  handleOnchangePage({ current: p, pageSize: s })
                }
              />
            </Row>
          </div>
        </Spin>
      </Col>
      {/* <div className="book-item custom-shadow">
        <div className="book-item__thumbnail">
          <img src="http://localhost:8080/images/book/3-cd33ea8d2a87955b4aed93c3f56f41af.jpg" alt="" />
        </div>
        <div className="book-item__title">
          <h4 style={{maxHeight: '43px'}} className="two-line-h4">
          Naruto - Tập 59 - Ngũ Kage Hợp Lực…!! (Tái Bản 2022)
          </h4>
          <p>
          Kishimoto Masashi
          </p>
        </div>
        <div className="book-item__order">
          <div className="book-item__price">
            <h4>45.000 đ</h4>
          </div>
          <div>
            <span style={{marginRight: '8px'}}><HeartOutlined /></span>
            <span><ShoppingCartOutlined /></span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
