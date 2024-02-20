import API from 'app/services/rest-client';
import { ProductItem } from 'app/module/components/index';
import { useEffect, useState } from 'react';
import { RoutesUser } from 'app/constant';
import { generatePath, NavLink } from 'react-router-dom';

const Content = () => {
  const [collections, setCollections] = useState<any>([]);

  useEffect(() => {
    API.get('api/collection/').then(response => {
      setCollections(response.data);
    });
  }, []);

  return (
    <>
      <div className="home content py-100">
        <div className="main">
          {collections.map((collection: any) => {
            if (collection.products?.length) {
              return (
                <div key={collection.id}>
                  <NavLink to={generatePath(RoutesUser.Collection, { id: collection.id })} className="home__product-list">
                    <h2>{collection.name}</h2>
                    <div></div>
                  </NavLink>
                  <div className="product-list main">
                    {collection.products?.map((product: any, index: number) =>
                      index < 8 ? <ProductItem key={product?.id} product={product} /> : <div key={product?.id}></div>
                    )}
                  </div>
                </div>
              );
            } else {
              return <div key={collection.id}></div>;
            }
          })}
        </div>
      </div>
    </>
  );
};

export { Content };
