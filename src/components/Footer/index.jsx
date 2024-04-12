import "./footer.scss";
import logo from "../../assets/picture/fahasa_footer-logo.png";
import { ImLocation } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import bocongthuong from "../../assets/picture/bocongthuong.png"
import social_logo from "../../assets/picture/social-icon.png"

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="page-footer custom-shadow">
        <div className="page-footer__contact">
          <div className="page-footer__contact-logo">
            <img src={logo} alt="" />
          </div>
          <div className="page-footer__contact-content">
            <div className="contact-title">
              <p>Liên Hệ</p>
              <div className="contact-line"></div>
            </div>
            <ul className="contact-info">
              <li>
                <ImLocation />
                <p>Ngõ 1 Bát Tràng - Gia Lâm - Hà Nội</p>
              </li>
              <li>
                <MdEmail />
                <p>pupumelu12345@gmail.com</p>
              </li>
              <li>
                <FaPhoneVolume />
                <p>0961847863</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="page-footer__info">
          <div className="page-footer__info-content">
            <div className="page-footer__content-title">
              <h3>Hỗ trợ</h3>
            </div>
            <div className="page-footer__content-static">
              <ul>
                <li>
                  <a href="">Điều khoản sử dụng</a>
                </li>
                <li>
                  <a href="">Chính sách bảo mật thông tin</a>
                </li>
                <li>
                  <a href="">chính sách bảo mật thanh toán</a>
                </li>
                <li>
                  <a href="">Giới thiệu về chúng tôi</a>
                </li>
                <li>
                  <a href="">Hệ thống của chúng tôi</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-footer__info-content">
            <div className="page-footer__content-title">
              <h3>Dịch vụ</h3>
            </div>
            <div className="page-footer__content-static">
              <ul>
                <li>
                  <a href="">Chính sách đổi - trả - hoàn tiền</a>
                </li>
                <li>
                  <a href="">Chính sách bảo hành</a>
                </li>
                <li>
                  <a href="">Chính sách vận chuyển</a>
                </li>
                <li>
                  <a href="">Chính sách khách hàng</a>
                </li>
                <li>
                  <a href="">Phươn thức thanh toán và xuất HĐ</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-footer__info-content">
            <div className="page-footer__content-title">
              <h3>Tài khoản</h3>
            </div>
            <div className="page-footer__content-static">
              <ul>
                <li>
                  <a href="">Đăng nhập / tạo tài khoản</a>
                </li>
                <li>
                  <a href="">Chi tiết tài khoản</a>
                </li>
                <li>
                  <a href="">Lịch sử mua hàng</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="page-footer__last-content">
            <div className="last-content__left">
                <div className="last-content__left-icon1">
                    <img src={bocongthuong} alt="" />
                </div>
                <div className="last-content__left-icon2">
                    <img src={social_logo} alt="" />
                </div>
            </div>
            <div className="last-content__right">
                <div className="last-content__right-first">
                    <p>Số nhà 15, 387-389 Bát Tràng - Giang cao Công Ty Cổ Phần Phát Hành Sách TP HCM - Gwenchanayo ngõ 263 thôn 3 giang cao bát tràng gia lâm hà nội</p>
                </div>
                <div className="last-content__right-second">
                    <p>AcchanManga nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống Fahasa trên toàn quốc.</p>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
