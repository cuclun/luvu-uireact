/* eslint-disable react/jsx-no-target-blank */
import 'app/static/styles/footer.css';
import { RoutesUser } from 'app/constant';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="pt-16">
        <div className="content-footer main">
          <div className="contact">
            <div className="company-name">
              <NavLink to={RoutesUser.Home} className="c-orange">
                Luvu
              </NavLink>
            </div>
            <ul className="address">
              <i className="fas fa-map-marker-alt c-orange p-2">
                <a
                  className="p-2"
                  href="https://www.google.com/maps/place/%C4%90%C3%A0+N%E1%BA%B5ng,+Vi%E1%BB%87t+Nam/@16.0717633,107.9376978,11z/data=!3m1!4b1!4m5!3m4!1s0x314219c792252a13:0x1df0cb4b86727e06!8m2!3d16.0544563!4d108.0717219?hl=vi-VN"
                  target="_blank"
                >
                  Store 1: Thành Phố Đà Nẵng.
                </a>
              </i>
              <i className="fas fa-map-marker-alt c-orange p-2">
                <a
                  className="p-2"
                  href="https://www.google.com/maps/place/H%E1%BB%93+Ch%C3%AD+Minh,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.7546658,106.4143495,10z/data=!3m1!4b1!4m5!3m4!1s0x317529292e8d3dd1:0xf15f5aad773c112b!8m2!3d10.8230989!4d106.6296638?hl=vi-VN"
                  target="_blank"
                >
                  Store 2: Thành phố Hồ Chí Minh.
                </a>
              </i>
              <i className="fas fa-phone c-orange p-2">
                <p className="p-2">Hotline: </p>
                <a className="p-2" href="tel:19001052">
                  0774565149
                </a>
              </i>
              <i className="fas fa-envelope c-orange p-2">
                <a className="p-2" href="mailto:luvuvn@gmail.com">
                  Email: tranthithanhcuc19it@gmail.com
                </a>
              </i>
            </ul>
          </div>
          <div className="notify">
            <h1>ĐĂNG KÍ NHẬN TIN</h1>
            <form>
              <input type="email" name="email" />
              <button type="submit">
                <i className="fab fa-telegram-plane"></i>
              </button>
            </form>
            <p>Cập nhật những sản phẩm mới nhất từ Luvu nhé!</p>
            <div className="icon-social">
              <a href="https://facebook.com" target="_blank">
                <i className="p-2 fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank">
                <i className="p-2 fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank">
                <i className="p-2 fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="other">
            <h1>BẠN NÊN XEM</h1>
            <ul className="p-2">
              <li className="p-2">
                <a href="/">Giới thiệu</a>
              </li>
              <li className="p-2">
                <a href="/">Phương thức giao hàng</a>
              </li>
              <li className="p-2">

                <a href="/">Phương thức thanh toán</a>
              </li>
              <li className="p-2">
                <a href="/">Chính sách bảo hành</a>
              </li>
              <li className="p-2">
                <a href="/">Chính sách đổi trả</a>
              </li>
              <li className="p-2">
                <a href="/">Chính sách bảo mật</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="copyrights">
          Copyrights © 2023 by <NavLink to={RoutesUser.Home}>Luvu</NavLink>
        </p>
      </footer>
    </>
  );
};

export { Footer };
