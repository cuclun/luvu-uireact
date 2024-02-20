import 'app/static/styles/header.css';
import { RoutesUser } from 'app/constant';
import { generatePath, NavLink } from 'react-router-dom';
import history from 'app/services/history';
import { useState } from 'react';
import API from 'app/services/rest-client';

const getQuantity = () => {
  let quantity = localStorage.getItem('cart');
  if (quantity) {
    return JSON.parse(quantity).length;
  } else {
    return 0;
  }
};

const Header = (props: any) => {
  const [keyword, setKeyword] = useState('');
  const [quantity] = useState(getQuantity);
  const [products, setProducts] = useState<any[]>([]);

  const onChangeSearch = (e: any) => {
    setKeyword(e.target.value);
    const keyword: String = e.target.value;
    const element = document.getElementById('id-products-search');
    if (e.target.value !== '') {
      if (element) {
        element.style.display = 'block';
      }
      API.get('api/product?keyword=' + keyword.toLowerCase()).then((response: any) => {
        setProducts(response.data);
      });
    } else {
      if (element) {
        element.style.display = 'none';
      }
    }
  };

  const onClickSearch = (e: any) => {
    e.preventDefault();
    history.push('/search?keyword=' + keyword);
  };

  return (
    <header>
      <div className="header-content main">
        <div className="contact-header">
          <div className="phone">
            <i className="fas fa-phone c-red pr-4"></i>
            <a className="hover-transition" href="tel:19001052">
              0774565149
            </a>
          </div>
          <div className="email">
            <i className="fas fa-envelope c-red pr-4"></i>
            <a className="hover-transition" href="mailto:thecameliavn@gmail.com">
              tranthithanhcuc19it@gmail.com
            </a>
          </div>
        </div>
        <div className="sub-header">
          <div className="search">
            <input type="text" name="" id="" placeholder="Nhập tên sản phẩm..." value={keyword} onChange={onChangeSearch} />
            <button onClick={onClickSearch}>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <ul id="id-products-search" className="products-search">
            {products.map((item: any, index: number) => {
              if (index > 4) {
                return <div key={item.id}></div>;
              } else {
                return (
                  <li key={item.id}>
                    <NavLink to={generatePath(RoutesUser.Product, { id: item.id })}>
                      <img src={'http://localhost:8080/api/uploads/' + item.images[0].id} alt="" />
                      <div>
                        <p className="search__product-name">{item.name}</p>
                        <p className="search__product-price">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                        </p>
                      </div>
                    </NavLink>
                  </li>
                );
              }
            })}
            {products.length > 5 ? <li onClick={onClickSearch}>Xem thêm {products.length - 5} sản phẩm.</li> : <div></div>}
          </ul>
          <div className="cart">
            <NavLink to={RoutesUser.Cart} activeClassName="nav-active">
              <i className="fa fa-shopping-basket c-red">
                <span className="quatity">{props.qty >= 0 ? props.qty : quantity}</span>
              </i>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
