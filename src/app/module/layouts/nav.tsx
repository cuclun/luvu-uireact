import { RoutesUser } from 'app/constant';
import { generatePath, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from 'app/services/rest-client';
import logo from 'app/static/images/logo.png';
import 'app/static/styles/nav.css';

const Nav = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    API.get('api/collection/').then(res => setCollections(res.data));
  }, []);

  return (
    <>
      <nav>
        <div className="main">
          <div className="nav-first">
            <div className="nav-page">
              <NavLink to={RoutesUser.AboutUs} className="nav-first__link" activeClassName="nav-active">
                VỀ CHÚNG TÔI
              </NavLink>
              <NavLink to={RoutesUser.Address} className="nav-first__link" activeClassName="nav-active">
                ĐỊA CHỈ
              </NavLink>
            </div>
            <NavLink to={RoutesUser.Home} className="nav-first__link">
              <img src={logo} alt="" />
            </NavLink>
            <div className="nav-page">
              <NavLink to={RoutesUser.Blog} className="nav-first__link" activeClassName="nav-active">
                BÀI VIẾT
              </NavLink>
              <a className="nav-first__link" href="/membership">
                THÀNH VIÊN
              </a>
            </div>
          </div>

          <ul className="nav-second">
            {collections.map((collection: any) => (
              <li key={collection.id}>
                <NavLink to={generatePath(RoutesUser.Collection, { id: collection.id })} activeClassName="nav-active">
                  <img src={'http://localhost:8080/api/uploads/image/' + collection.image} alt="" />
                  <p>{collection.name}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export { Nav };
