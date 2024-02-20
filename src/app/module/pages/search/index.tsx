import { useEffect, useState } from 'react';
import { Header, Nav, Footer } from 'app/module/layouts/index';
import { ProductList } from 'app/module/components/index';
import API from 'app/services/rest-client';
import 'app/static/styles/category.css';

const Search = (props: any) => {
  const [products, setProducts] = useState<any[]>([]);
  const searchParams = new URLSearchParams(props.location.search);
  const keyword = searchParams.get('keyword');

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

  useEffect(() => {
    API.get('api/product?keyword=' + keyword?.toLowerCase()).then((response: any) => {
      setProducts(response.data);
    });
  }, [keyword]);

  return (
    <div>
      <Header />
      <Nav />
      <div className="content">
        <div className="main">
          <div className="category">
            <h1 className="category__name">KẾT QUẢ TÌM KIẾM: {keyword}</h1>
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
            <div className="empty-notify">KHÔNG TÌM THẤY KẾT QUẢ TÌM KIẾM PHÙ HỢP CHO: {keyword}</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { Search };
