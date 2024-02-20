import 'app/static/styles/admin/admin-navigation.css';
import { NavLink } from 'react-router-dom';
import { RoutesUser } from 'app/constant';

const Navigation = () => {
  const managerDropdown = () => {
    const elemenIconManager = document.getElementById('js-icon-dropdown');
    const managerDropdown = document.getElementById('manager-dropdown');
    if (managerDropdown) {
      if (managerDropdown.style.display === 'none' || managerDropdown.style.display === '') {
        managerDropdown.style.display = 'flex';
        elemenIconManager?.classList.remove('fa-angle-right');
        elemenIconManager?.classList.add('fa-angle-down');
      } else {
        managerDropdown.style.display = 'none';
        elemenIconManager?.classList.remove('fa-angle-down');
        elemenIconManager?.classList.add('fa-angle-right');
      }
    }
  };

  return (
    <div id="admin-nav">
      <div>
        <NavLink className="admin-nav-link" to={RoutesUser.AdminDashboard} activeClassName="admin-nav-active">
          <i className="fas fa-tachometer-alt"></i>
          Dashboard
        </NavLink>
      </div>
      <div id="manager" onClick={managerDropdown}>
        <div className="admin-nav-link">
          <i className="fas fa-tasks"></i>
          Quản lí
          <i id="js-icon-dropdown" className="fas fa-angle-right float-r"></i>
          <div id="manager-dropdown">
            <NavLink className="manager-link" to={RoutesUser.AdminCollection} activeClassName="admin-nav-active">
              Danh mục
            </NavLink>
            <NavLink className="manager-link" to={RoutesUser.AdminProduct} activeClassName="admin-nav-active">
              Sản phẩm
            </NavLink>
            <NavLink className="manager-link" to={RoutesUser.AdminBanner} activeClassName="admin-nav-active">
              Banner
            </NavLink>
            <NavLink className="manager-link" to={RoutesUser.AdminImage} activeClassName="admin-nav-active">
              Image
            </NavLink>
            <NavLink className="manager-link" to={RoutesUser.AdminBill} activeClassName="admin-nav-active">
              Hoá đơn
            </NavLink>
            <NavLink className="manager-link" to={RoutesUser.AdminAccount} activeClassName="admin-nav-active">
              Tài khoản
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Navigation };
