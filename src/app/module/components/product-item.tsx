import 'app/static/styles/product-item.css';
import { RoutesUser } from 'app/constant';
import { generatePath, NavLink } from 'react-router-dom';

const ProductItem = (props: any) => {
  const product: any = props.product;

  return (
    <>
      <NavLink to={generatePath(RoutesUser.Product, { id: product.id })} className="product-item">
        <img src={'http://localhost:8080/api/uploads/' + product.images[0].id} alt="" />
        <div>
          <p className="product-item__name">{product.name}</p>
          <p className="product-item__price">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
          </p>
        </div>
      </NavLink>
    </>
  );
};

export { ProductItem };
