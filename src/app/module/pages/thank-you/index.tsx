import { Header, Nav, Footer } from 'app/module/layouts/index';

const ThankYou = () => {
  return (
    <>
      <Header />
      <Nav />
      <div className="content">
        <div className="main">
          <div className="category" style={{ textAlign: 'center' }}>
            <h1 className="category__name">Đặt hàng thành công</h1>
          </div>
          <div style={{ color: '#000' }} className="empty-notify">
            Bạn đã đặt hàng thành công, nhân viên sẽ liên hệ bạn trong thời gian ngắn nhất để xác nhận.
            <br />
            Cảm ơn bạn đã tin tưởng và ủng hộ Luvu.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export { ThankYou };
