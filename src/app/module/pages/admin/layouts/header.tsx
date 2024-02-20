import 'app/static/styles/admin/admin-header.css';
import logo from 'app/static/images/logo.png';
import { NavLink } from 'react-router-dom';
import { RoutesUser } from 'app/constant';

const Header = () => {
  if (sessionStorage.getItem('userDetails') === null) {
    window.location.pathname = '/admin/login';
  }
  const userDetails = sessionStorage.getItem('userDetails');

  const logout = () => {
    sessionStorage.removeItem('userDetails');
    window.location.reload();
  };

  return (
    <div className="admin-header">
      <NavLink className="admin-nav-link" to={RoutesUser.AdminDashboard} activeClassName="nav-active">
        <img src={logo} alt="" />
      </NavLink>
      <div className="dropdown row" style={{ marginRight: '20px', alignItems: 'center' }}>
        <p style={{ margin: '0px', padding: '8px', fontSize: '16px' }}>{JSON.parse(userDetails ? userDetails : '').username}</p>
        <button
          className="btn btn-secondary avatar-admin"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {JSON.stringify(JSON.parse(userDetails ? userDetails : '').username)
            .substring(2, 1)
            .toUpperCase()}
        </button>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
          <button className="dropdown-item" style={{ paddingTop: '8px' }}>
            <i className="fas fa-user"></i>Profile
          </button>
          <button className="dropdown-item" style={{ paddingTop: '8px' }}>
            <i className="fas fa-cogs"></i>Setting
          </button>
          <hr />
          <button className="dropdown-item" onClick={logout} style={{ paddingTop: '8px' }}>
            <i className="fas fa-sign-out-alt"></i>Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export { Header };
