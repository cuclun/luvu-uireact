import { ProductItem } from 'app/module/components';
import 'app/static/styles/product-list.css';

const ProductList = (props: any) => {
  const products = props.products;

  return (
    <>
      <div className="product-list main">
        {products?.map((product: any) => (
          <ProductItem key={product?.id} product={product} />
        ))}
      </div>
    </>
  );
};

export { ProductList };
