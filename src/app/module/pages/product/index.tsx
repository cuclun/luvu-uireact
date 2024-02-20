import { useCallback, useEffect, useState } from 'react';
import { Header, Nav, Footer } from 'app/module/layouts/index';
import { Carousel } from 'react-responsive-carousel';
import { toast } from 'react-toastify';
import API from 'app/services/rest-client';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import 'app/static/styles/product.css';

const getCart = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return (cart = JSON.parse(cart));
  } else {
    return [];
  }
};

const Product = () => {
  const [qtyInput, setQtyInput] = useState(1);
  const [productInfo, setProductInfo] = useState<any>();
  const [colorSelected, setColorSelected] = useState();
  const [sizeSelected, setSizeSelected] = useState();
  const [cart, setCart] = useState<any[]>(getCart);
  const [qty, setQty] = useState(getCart.length);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    setQty(cart.length);
  }, [cart]);

  useEffect(() => {
    if (qtyInput <= 0) setQtyInput(1);
  }, [qtyInput]);

  const onQtyInputChange = useCallback(e => {
    setQtyInput(Number(e.target.value));
  }, []);

  function changeQty(n: any) {
    const qtyNow = Number(qtyInput);
    setQtyInput(qtyNow + n);
  }

  useEffect(() => {
    const id = window.location.pathname.substr(9);
    API.get('api/product/' + id + '/')
      .then(res => {
        setProductInfo(res.data);
      })
      .catch((response: any) => {
        document.location.href = '/not-found';
      });
  }, []);

  const onClickSize = (e: any) => {
    const elementOld = document.getElementById(sizeSelected ? sizeSelected : '');
    elementOld?.classList.remove('bg-red');
    setSizeSelected(e.target.innerHTML);
    const elementNew = document.getElementById(e.target.innerHTML);
    elementNew?.classList.add('bg-red');
  };

  const onClickColor = (e: any) => {
    const elementOld = document.getElementById(colorSelected ? colorSelected : '');
    elementOld?.classList.remove('bg-red');
    setColorSelected(e.target.innerHTML);
    const elementNew = document.getElementById(e.target.innerHTML);
    elementNew?.classList.add('bg-red');
  };

  const onClickAddCart = () => {
    if (!colorSelected && productInfo.colors.length > 0) {
      toast.error('Chưa chọn màu á ^^');
      return;
    }
    if (!sizeSelected && productInfo.sizes.length > 0) {
      toast.error('Chưa chọn size á ^^');
      return;
    }
    const productInCart = {
      product: productInfo,
      color: colorSelected,
      size: sizeSelected,
      qty: qtyInput
    };

    cart.forEach(product => {
      if (
        product.productInCart.product.id === productInCart.product.id &&
        product.productInCart.color === productInCart.color &&
        product.productInCart.size === productInCart.size
      ) {
        productInCart.qty += product.productInCart.qty;
        cart.splice(cart.indexOf(product), 1);
      }
    });

    setCart([...cart, { productInCart }]);
    toast.success('Đã thêm sản phẩm vào giỏ hàng!');
  };

  return (
    <div>
      <Header qty={qty} />
      <Nav />
      <div className="content">
        <div className="main">
          <div className="product">
            <div className="product__img">
              <Carousel showStatus={false} emulateTouch={true} autoPlay={false}>
                {productInfo?.images.map((image: any) =>
                  image ? <img key={image.id} src={'http://localhost:8080/api/uploads/' + image.id} alt="" /> : ''
                )}
              </Carousel>
            </div>
            <div id="info" className="product-info">
              <h2 className="product__name">{productInfo?.name}</h2>
              <h2 className="product__price">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productInfo ? productInfo.price : 0)}
              </h2>
              <div className="product__desc">
                <pre style={{ fontFamily: 'sfy' }}>{productInfo?.description}</pre>
                {/* <ul className="detail">
                  {productInfo?.specifications.map((item: any) => (item ? <li key={item.id}>{item.name}</li> : ''))}
                </ul> */}
              </div>
              <div className="buy">
                {productInfo?.colors.length > 0 ? (
                  <div className="product__color">
                    <h5 style={{ marginRight: '2px' }}>Màu sắc</h5>
                    {productInfo?.colors.map((color: string, index: number) => {
                      return (
                        <button id={color} key={index} onClick={onClickColor}>
                          {color}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <span></span>
                )}
                {productInfo?.sizes.length > 0 ? (
                  <div className="product__size">
                    <h5 style={{ marginRight: '41px' }}>Cỡ</h5>
                    {productInfo?.sizes.map((size: string, index: number) => {
                      return (
                        <button id={size} key={index} onClick={onClickSize}>
                          {size}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <span></span>
                )}
                <div className="product__qty">
                  <h5>Số lượng</h5>
                  <button className="sub" onClick={() => changeQty(-1)}>
                    -
                  </button>
                  <input type="number" name="qty" id="qty" min="0" value={qtyInput} onChange={onQtyInputChange} />
                  <button className="add" onClick={() => changeQty(1)}>
                    +
                  </button>
                </div>
                <div className="buy-btn">
                  <button className="add-cart" onClick={onClickAddCart}>
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { Product };
