import { Header, Nav, Footer } from 'app/module/layouts/index';
import { NavLink } from 'react-router-dom';
import { RoutesUser } from 'app/constant';

const NotFound = () => {
  return (
    <>
      <Header />
      <Nav />
      <div className="content">
        <div className="main">
          <div className="category" style={{ textAlign: 'center' }}>
            <h1 className="category__name">Không tìm thấy trang</h1>
          </div>
          <div style={{ color: '#000' }} className="empty-notify">
            Trang không tồn tại. Click vào{' '}
            <NavLink to={RoutesUser.Home} className="nav-first__link" style={{ color: '#f64c72', fontSize: '24px' }}>
              đây
            </NavLink>{' '}
            để tiếp tục mua hàng.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export { NotFound };
