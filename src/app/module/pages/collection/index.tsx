import { useEffect, useState } from 'react';
import { Header, Nav, Footer } from 'app/module/layouts/index';
import { ProductList } from 'app/module/components/index';
import 'app/static/styles/category.css';
import API from 'app/services/rest-client';

const Collection = () => {
  const [collection, setCollection] = useState<any>();
  const [products, setProducts] = useState<any[]>([]);
  const id = window.location.pathname.substr(12);

  useEffect(() => {
    API.get('api/collection/' + id)
      .then(response => {
        setCollection(response.data);
        setProducts(response.data.products);
      })
      .catch(() => {
        document.location.href = '/not-found';
      });
  }, [id]);

  const onSortChange = (e: any) => {
    if (e.target.value === 'cheaper') {
      products.sort((a, b) => (a.price < b.price ? -1 : 1));
      setProducts([...products]);
    } else if (e.target.value === 'expensive') {
      products.sort((a, b) => (a.price > b.price ? -1 : 1));
      setProducts([...products]);
    } else {
      products.sort((a, b) => (a.id < b.id ? -1 : 1));
      setProducts([...products]);
    }
  };

  return (
    <div>
      <Header />
      <Nav />
      <div className="content">
        <div className="main">
          <div className="category">
            <h1 className="category__name">{collection?.name}</h1>
            <div className="category__sort">
              <p>Sắp xếp theo</p>
              <select name="sort" id="sort" onChange={onSortChange}>
                <option value="popular">Sản phẩm bán chạy</option>
                <option value="cheaper">Giá từ thấp đến cao</option>
                <option value="expensive">Giá từ cao đến thấp</option>
              </select>
            </div>
          </div>
          {products.length !== 0 ? (
            <ProductList products={products} />
          ) : (
            <div className="empty-notify">Hiện tại chưa có sản phẩm của loại hàng này.</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { Collection };
