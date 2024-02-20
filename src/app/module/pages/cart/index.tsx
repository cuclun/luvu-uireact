import { Header, Nav, Footer } from 'app/module/layouts/index';
import { useEffect, useState } from 'react';
import { RoutesUser } from 'app/constant';
import { generatePath, NavLink } from 'react-router-dom';
import 'app/static/styles/cart.css';

const getCart = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return (cart = JSON.parse(cart));
  } else {
    return [];
  }
};

const getSumPrice = (cart: any[]) => {
  let sum = 0;
  cart.forEach(item => {
    sum += item.productInCart.qty * item.productInCart.product.price;
  });
  return sum;
};

const Cart = () => {
  const [cart, setCart] = useState<any[]>(getCart);
  const [sumPrice, setSumPrice] = useState(getSumPrice(cart));
  const [qty, setQty] = useState(getCart.length);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    setSumPrice(getSumPrice(cart));
    setQty(cart.length);
  }, [cart]);

  const onSubClick = (index: any) => {
    cart[+index].productInCart.qty--;
    setCart([...cart]);
  };

  const onAddClick = (index: any) => {
    cart[+index].productInCart.qty++;
    setCart([...cart]);
  };

  const onChangeQty = (e: any) => {
    const idElement: string = e.target.id;
    const posProduct = idElement.split('.')[1];
    const value = +e.target.value;
    if (value < 1) {
      cart[+posProduct].productInCart.qty = 1;
      setCart([...cart]);
    } else {
      cart[+posProduct].productInCart.qty = value;
      setCart([...cart]);
    }
  };

  const moveProduct = (e: any) => {
    const idElement: string = e.target.id;
    const posProduct = idElement.split('.')[1];
    cart.splice(+posProduct, 1);
    setCart([...cart]);
  };

  return (
    <>
      <Header qty={qty} />
      <Nav />
      <div className="content">
        <div className="main">
          <div className="category">
            <h1 className="category__name">Giỏ hàng</h1>
          </div>
          <div className="main-cart">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Chưa có sản phẩm nào trong giỏ</p>
                <p>
                  Mua hàng <a href="/">tại đây</a>
                </p>
              </div>
            ) : (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th colSpan={2}>Thông tin chi tiết sản phẩm</th>
                      <th>Đơn giá</th>
                      <th>Số lượng</th>
                      <th>Tổng giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td style={{ width: '25%' }}>
                            <img src={'http://localhost:8080/api/uploads/' + item.productInCart.product.images[0].id} alt="" />
                          </td>
                          <td style={{ width: '30%' }} className="info-product">
                            <b>
                              <h4>
                                <NavLink to={generatePath(RoutesUser.Product, { id: item.productInCart.product.id })}>
                                  {item.productInCart.product.name}
                                </NavLink>
                              </h4>
                            </b>
                            <p>Màu sắc: {item.productInCart.color}</p>
                            <p>Cỡ: {item.productInCart.size}</p>
                            <button className="del-product-cart" id={'move.' + index} onClick={moveProduct}>
                              Xoá
                            </button>
                          </td>
                          <td style={{ width: '15%' }}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                              item.productInCart.product.price
                            )}
                          </td>
                          <td style={{ width: '15%' }}>
                            <div style={{ display: 'flex' }}>
                              <button className="sub" onClick={() => onSubClick(index)} disabled={item.productInCart.qty <= 1}>
                                -
                              </button>
                              <input type="number" id={'qty.' + index} value={item.productInCart.qty} onChange={onChangeQty} />
                              <button className="add" id={'add.qty.' + index} onClick={onAddClick}>
                                +
                              </button>
                            </div>
                          </td>
                          <td style={{ width: '15%' }}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                              item.productInCart.product.price * item.productInCart.qty
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="end-cart">
                  <h3>Tổng tiền:</h3>
                  <h2>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)}</h2>
                  <NavLink to={RoutesUser.Pay}>
                    <button>Thanh toán</button>
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export { Cart };
