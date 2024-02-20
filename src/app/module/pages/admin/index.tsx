import { Header, Navigation } from 'app/module/pages/admin/layouts';
import 'app/static/styles/admin/admin.css';

const Admin = () => {
  return (
    <div className="admin-page">
      <Header />
      <div className="admin-content">
        <Navigation></Navigation>
        <div id="admin-collection-page"></div>
      </div>
    </div>
  );
};

export { Admin };
