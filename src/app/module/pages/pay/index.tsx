import 'app/static/styles/pay.css';
import { useEffect, useState } from 'react';
import API from 'app/services/rest-client';
import { toast } from 'react-toastify';

const getCart = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return (cart = JSON.parse(cart));
  } else {
    return [];
  }
};

const Pay = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cart, setCart] = useState<any[]>(getCart);
  const [cartChecked, setCartChecked] = useState<any[]>([]);
  const [sumMoney, setSumMoney] = useState(0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    let sum = 0;
    cartChecked.forEach(item => {
      sum += item.productInCart.product.price * item.productInCart.qty;
    });
    setSumMoney(sum);
  }, [cartChecked]);

  const onNameChange = (e: any) => {
    setName(e.target.value);
  };

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const onPhoneChange = (e: any) => {
    setPhone(e.target.value);
  };

  const onAddressChange = (e: any) => {
    setAddress(e.target.value);
  };

  const onClickPaymentMethods = (e: any) => {
    const content_atm = document.getElementById('content-atm');
    const content_vdt = document.getElementById('content-vdt');

    if (e.target.id === 'payment-method-cod') {
      if (content_atm && content_vdt) {
        content_atm.style.display = 'none';
        content_vdt.style.display = 'none';
      }
    } else if (e.target.id === 'payment-method-atm') {
      if (content_atm && content_vdt) {
        content_atm.style.display = 'block';
        content_vdt.style.display = 'none';
      }
    } else if (e.target.id === 'payment-method-vdt') {
      if (content_atm && content_vdt) {
        content_atm.style.display = 'none';
        content_vdt.style.display = 'block';
      }
    }
  };

  const onClickCheckedProduct = (e: any) => {
    const id = Number(e.target.id.split('-')[1]);
    if (e.target.checked) {
      setCartChecked([...cartChecked, cart.find(item => item.productInCart.product.id === id)]);
    } else {
      setCartChecked([...cartChecked.filter(item => item.productInCart.product.id !== id)]);
    }
  };

  const onClickComplete = () => {
    if (cartChecked.length === 0) {
      toast.error('Chọn sản phẩm để thanh toán!');
      return;
    }

    if (name === '' || phone === '' || address === '') {
      toast.error('Nhập đầy đủ thông tin!');
      return;
    }

    const paymentMethod = document
      .querySelector('input[name="payment-method"]:checked')
      ?.id.split('-')[2]
      .toUpperCase();

    const listProduct: any[] = [];

    cartChecked.forEach(item => {
      listProduct.push({
        id: item.productInCart.product.id,
        color: item.productInCart.color,
        size: item.productInCart.size,
        qty: item.productInCart.qty
      });
    });

    const dataBill = {
      name,
      email,
      phone,
      address,
      paymentMethod,
      listProduct
    };

    API.post('api/bill', dataBill)
      .then(() => {
        cartChecked.forEach(item => {
          cart.splice(item, 1);
          setCart([...cart]);
        });
        document.location.href = '/pay-success';
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div id="pay">
      <div className="pay-content">
        <div className="pay-wrap">
          <div className="form-info">
            <h1>LUVU</h1>

            <h3>Thông tin khách hàng</h3>
            <input type="text" placeholder="Tên của bạn" onChange={onNameChange} value={name} />
            <div>
              <input type="email" placeholder="Email (không bắt buộc)" onChange={onEmailChange} value={email} />
              <input type="tel" pattern="(\+84|0)\d{9,10}" placeholder="Số điện thoại" onChange={onPhoneChange} value={phone} />
            </div>
            <input type="text" placeholder="Địa chỉ nhận hàng" onChange={onAddressChange} value={address} />

            <h3>Thông tin vận chuyển</h3>
            <p>Vận chuyển trong 3 - 7 ngày. (Miễn phí ship)</p>

            <h3>Phương thức thanh toán</h3>
            <div id="payment-methods">
              <div>
                <label htmlFor="payment-method-cod">
                  <input type="radio" defaultChecked name="payment-method" id="payment-method-cod" onClick={onClickPaymentMethods} />
                  Thanh toán tiền mặt khi nhận hàng.
                </label>
              </div>
              <div>
                <label htmlFor="payment-method-atm">
                  <input type="radio" name="payment-method" id="payment-method-atm" onClick={onClickPaymentMethods} />
                  Chuyển khoản ngân hàng.
                  <div id="content-atm" style={{ display: 'none' }}>
                    <p>
                      Quý khách vui lòng chuyển tiền vào:
                      <br />
                      <br />
                      Ngân hàng: Agribank
                      <br />
                      Số tài khoản: 2002220111956
                      <br />
                      Chủ tài khoản: Trần Thị Thanh Cúc
                      <br />
                      Nội dung chuyển khoản: Số điện thoại của bạn
                      <br />
                      <br />
                      Sau đó, bấm nút 'Hoàn tất' phía dưới.
                    </p>
                  </div>
                </label>
              </div>
              <div>
                <label htmlFor="payment-method-vdt">
                  <input type="radio" name="payment-method" id="payment-method-vdt" onClick={onClickPaymentMethods} />
                  Chuyển khoản ví điện tử.
                  <div id="content-vdt" style={{ display: 'none' }}>
                    <p>
                      Quý khách vui lòng chuyển tiền vào:
                      <br />
                      <br />
                      Momo: 0774565149
                      <br />
                      Chủ tài khoản: Trần Thị Thanh Cúc
                      <br />
                      Nội dung chuyển khoản: Số điện thoại của bạn
                      <br />
                      <br />
                      Sau đó, bấm nút 'Hoàn tất' phía dưới.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <a href="/cart">Giỏ hàng</a>
              <button onClick={onClickComplete}>Hoàn tất</button>
            </div>
          </div>
          <div className="form-cart">
            <div>
              {cart.map((item: any, index) => {
                return (
                  <label key={index} id={'js-item-' + index} className="item" htmlFor={'product-' + item.productInCart.product.id}>
                    <label className="container-checkbox">
                      <input id={'product-' + item.productInCart.product.id} type="checkbox" onChange={onClickCheckedProduct} />
                      <span className="checkmark"></span>
                    </label>
                    <img src={'http://localhost:8080/api/uploads/' + item.productInCart.product.images[0].id} alt="" />
                    <div style={{ flexBasis: '100%' }} className="info-product">
                      <h5>{item.productInCart.product.name}</h5>
                      <p>Màu sắc: {item.productInCart.color}</p>
                      <p>Kích cỡ: {item.productInCart.size}</p>
                      <p>Số lượng: {item.productInCart.qty}</p>
                    </div>
                    <div>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                        item.productInCart.product.price * item.productInCart.qty
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
            <div id="sum-money">
              <h2>Tổng tiền</h2>
              <h3>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumMoney)}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Pay };
