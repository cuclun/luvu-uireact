import { Header, Navigation } from 'app/module/pages/admin/layouts';

const Forbidden = () => {
  return (
    <div>
      <Header></Header>
      <div className="admin-content">
        <Navigation></Navigation>
        <div id="admin-collection-page">
          <div className="admin-name-page">
            <p style={{ color: 'red' }}>403 - Forbidden</p>
          </div>
          <div>
            <h3>Bạn không có quyền truy cập vào trang này</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Forbidden };
