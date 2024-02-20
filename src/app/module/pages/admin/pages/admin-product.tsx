import { Header, Navigation } from 'app/module/pages/admin/layouts';
import { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { useDropzone } from 'react-dropzone';
import API from 'app/services/rest-client';
import 'app/static/styles/admin/admin-product.css';
import { toast } from 'react-toastify';

const AdminProduct = () => {
  if (sessionStorage.getItem('userDetails') === null) {
    window.location.pathname = '/admin/login';
  }
  const userDetails = sessionStorage.getItem('userDetails'); // chỗ này lấy cái token nè
  // chỗ ni làm cái chi.. khi lưu vô session sẽ chuyển kiểu Json thành String chỗ nớ đổi strin lại thành Json xong lấy accessToken
  //userDetails ? userDetails : '' nếu userDetail != underfine hay != null thì parse userDetails ngược lại parse ''
  const accessToken = 'Bearer ' + JSON.parse(userDetails ? userDetails : '').accessToken;
  const [header] = useState([
    {
      label: 'ID',
      field: 'id',
      sort: 'asc'
    },
    {
      label: 'Tên sản phẩm',
      field: 'name',
      sort: 'asc'
    },
    {
      label: 'Giá',
      field: 'price',
      sort: 'asc'
    },
    {
      label: 'Số lượng',
      field: 'quantity',
      sort: 'asc'
    },
    {
      label: 'Thao tác',
      field: 'action',
      sort: 'asc'
    }
  ]);

  const [dataTable, setDataTable] = useState<any>();

  const [products, setProducts] = useState<any[]>([]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [collection, setCollection] = useState(-1);
  const [specification, setSpecification] = useState('');
  const [id, setId] = useState(0);

  const [collections, setCollections] = useState<any[]>([]);
  const [specifications, setSpecifications] = useState<any[]>([]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file, index) => (
    <li key={'file-' + index}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const eSpecifications = specifications.map((spec, index) => (
    <li key={'spec-' + index}>
      {spec}
      <button className="btn-rm-item" onClick={() => removeSpecification(index)}>
        x
      </button>
    </li>
  ));

  const showFormEdit = (id: number) => {
    resetForm();
    API.get('api/product/' + id).then((response: any) => {
      let item = response.data;
      setId(item.id);
      setName(item.name);
      setPrice(item.price);
      setQuantity(item.quantity);
      setDescription(item.description);
      setCollection(item.collectionId);

      item.specifications.forEach((item: any) => {
        specifications.push(item.name);
      });
      setSpecifications([...specifications]);
    });
  };

  const onNameChange = (e: any) => {
    setName(e.target.value);
  };

  const onPriceChange = (e: any) => {
    setPrice(e.target.value);
  };

  const onQuantityChange = (e: any) => {
    setQuantity(e.target.value);
  };

  const onDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const onCollectionChange = (e: any) => {
    setCollection(e.target.value);
  };

  const onSpecificationChange = (e: any) => {
    setSpecification(e.target.value);
  };

  const onAddSpecificationClick = () => {
    setSpecifications([...specifications, specification]);
    setSpecification('');
  };

  const removeSpecification = (index: any) => {
    specifications.splice(index, 1);
    setSpecifications([...specifications]);
  };

  useEffect(() => {
    API.get('api/product?keyword').then((response: any) => {
      response.data.forEach((item: any) => {
        products.push({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          action: (
            <div className="btn-action" key={item.id}>
              <button
                className="btn btn-warning"
                id={'btn-edit-photo-' + item.id}
                type="button"
                data-toggle="modal"
                data-target="#modal-edit-product"
                onClick={() => showFormEdit(item.id)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button className="btn btn-danger" id={'btn-del-photo-' + item.id} onClick={() => delProduct(item.id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          )
        });
        setProducts([...products]);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    API.get('api/collection/').then((response: any) => {
      setCollections(response.data);
    });
  }, []);

  useEffect(() => {
    setDataTable({ columns: header, rows: products });
  }, [products, header]);

  const insertProduct = () => {
    if (name === '') {
      toast.error('Tên sản phẩm không được bỏ trống!');
      return;
    }
    if (description === '') {
      toast.error('Mô tả không được bỏ trống!');
      return;
    }
    const formProduct = new FormData();
    formProduct.append('name', name);
    formProduct.append('price', price.toString());
    formProduct.append('description', description);
    formProduct.append('quantity', quantity.toString());
    formProduct.append('collectionId', collection.toString());

    acceptedFiles.forEach(item => {
      formProduct.append('images', item);
    });

    formProduct.append('specifications', '');

    specifications.forEach(item => {
      formProduct.append('specifications', item);
    });

    const headers = {
      Authorization: accessToken, // mỗi lần post put hay delete sẽ gửi kèm cái header có chưa accessToken
      'Content-Type': 'multipart/form-data'
    };

    API.post('api/product/', formProduct, { headers })// chỗ này gắn cái header ne
      .then((response: any) => {
        let item = response.data;
        products.push({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          action: (
            <div className="btn-action" key={item.id}>
              <button
                className="btn btn-warning"
                id={'btn-edit-photo-' + item.id}
                type="button"
                data-toggle="modal"
                data-target="#modal-edit-product"
                onClick={() => showFormEdit(item.id)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button className="btn btn-danger" id={'btn-del-photo-' + item.id} onClick={() => delProduct(item.id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          )
        });
        setProducts([...products]);
        resetForm();
        document.getElementById('close-modal-add')?.click();
        toast.success('Thêm sản phẩm thành công!');
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const editProduct = () => {
    if (name === '') {
      toast.error('Tên sản phẩm không được bỏ trống!');
      return;
    }
    if (description === '') {
      toast.error('Mô tả không được bỏ trống!');
      return;
    }
    const formProduct = new FormData();
    formProduct.append('name', name);
    formProduct.append('price', price.toString());
    formProduct.append('description', description);
    formProduct.append('quantity', quantity.toString());
    formProduct.append('collectionId', collection.toString());

    formProduct.append('specifications', '');

    specifications.forEach(item => {
      formProduct.append('specifications', item);
    });

    const headers = {
      Authorization: accessToken,
      'Content-Type': 'multipart/form-data'
    };

    API.put('api/product/' + id, formProduct, { headers })
      .then((response: any) => {
        let item = products.find(item => item.id === id);
        item.name = name;
        item.price = price;
        item.quantity = quantity;

        resetForm();
        document.getElementById('close-modal-edit')?.click();
        toast.success(response.data.message);
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };

  const delProduct = (id: number) => {
    if (!window.confirm('Bạn muốn xóa sản phẩm?')) return;
    const headers = {
      Authorization: accessToken
    };
    API.delete('/api/product/' + id, { headers })
      .then(() => {
        setProducts([...products.filter(item => item.id !== id)]);
        toast.success('Xóa sản phẩm thành công.');
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };

  const resetForm = () => {
    setName('');
    setPrice(0);
    setQuantity(0);
    setDescription('');
    let length = specifications.length;
    for (let index = 0; index < length; index++) {
      specifications.pop();
    }
    setSpecifications([...specifications]);
  };

  return (
    <div>
      <Header></Header>
      <div className="admin-content">
        <Navigation></Navigation>
        <div id="admin-collection-page">
          <div className="admin-name-page">
            <p>Sản phẩm</p>
            <div>
              <button className="admin__btn-add" type="button" data-toggle="modal" data-target="#modal-add-product" onClick={resetForm}>
                Thêm sản phẩm<i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div>
            <MDBDataTable bordered data={dataTable}></MDBDataTable>
          </div>

          <div className="modal fade" id="modal-add-product">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header justify-content-center">
                  <h3 className="modal-title ">Thêm sản phẩm</h3>
                </div>
                <div className="modal-body model-add">
                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <label className="col-md-2" htmlFor="">
                      Tên
                    </label>
                    <input className="col-md-10" type="text" name="name" id="" onChange={onNameChange} value={name} />
                  </div>

                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <label className="col-md-2" htmlFor="">
                      Danh mục
                    </label>
                    <select
                      className="col-md-10"
                      style={{ marginRight: '4px' }}
                      name="collections"
                      id=""
                      onChange={onCollectionChange}
                      defaultValue={collection}
                    >
                      <option key={-1} value={-1}>
                        Chọn danh mục
                      </option>
                      {collections.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <label className="col-md-2" htmlFor="price">
                      Giá
                    </label>
                    <input className="col-md-3" type="number" name="price" id="price" onChange={onPriceChange} value={price} />
                    <label className="col-md-2" htmlFor="quantity">
                      Số lượng
                    </label>
                    <input className="col-md-3" type="number" name="quantity" id="quantity" onChange={onQuantityChange} value={quantity} />
                  </div>

                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <label className="col-md-2" htmlFor="">
                      Mô tả
                    </label>
                    <textarea
                      style={{ marginRight: '4px' }}
                      className="col-md-10 model-textarea"
                      name="description"
                      id=""
                      onChange={onDescriptionChange}
                      value={description}
                    />
                  </div>

                  <div className="row px-2 mx-2 pt-2 mt-2 align-items-center justify-content-between" style={{ paddingBottom: '0px' }}>
                    <label className="col-md-2" htmlFor="">
                      Ảnh
                    </label>
                  </div>

                  <section className="container">
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <p>Chọn hình ảnh</p>
                    </div>
                    <aside>
                      <ul style={{ listStyle: 'none' }}>{files}</ul>
                    </aside>
                  </section>

                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <label className="col-md-2">Chi tiết</label>
                    <input className="col-md-8" type="text" onChange={onSpecificationChange} value={specification} />
                    <button className="btn btn-primary col-md-2" onClick={onAddSpecificationClick} disabled={!specification}>
                      Thêm
                    </button>
                  </div>

                  <section className="container">
                    <aside>
                      <ul style={{ listStyle: 'none' }}>{eSpecifications}</ul>
                    </aside>
                  </section>

                  <div className="modal-footer">
                    <button className="model-btn btn btn-success" onClick={insertProduct}>
                      Thêm
                    </button>
                    <button id="close-modal-add" type="button" className="btn btn-secondary" data-dismiss="modal">
                      Thoát
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="modal-edit-product">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header justify-content-center">
                  <h3 className="modal-title ">Thêm sản phẩm</h3>
                </div>
                <div className="modal-body model-add">
                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <label className="col-md-2" htmlFor="">
                      Tên
                    </label>
                    <input className="col-md-10" type="text" name="name" id="" onChange={onNameChange} value={name} />
                  </div>

                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <label className="col-md-2" htmlFor="">
                      Danh mục
                    </label>
                    <select
                      className="col-md-10"
                      style={{ marginRight: '4px' }}
                      id="collection-edit"
                      onChange={onCollectionChange}
                      value={collection}
                    >
                      <option key={-1} value={-1}>
                        Chọn danh mục
                      </option>
                      {collections.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <label className="col-md-2" htmlFor="price">
                      Giá
                    </label>
                    <input className="col-md-3" type="number" name="price" id="price" onChange={onPriceChange} value={price} />
                    <label className="col-md-2" htmlFor="quantity">
                      Số lượng
                    </label>
                    <input className="col-md-3" type="number" name="quantity" id="quantity" onChange={onQuantityChange} value={quantity} />
                  </div>

                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <label className="col-md-2" htmlFor="">
                      Mô tả
                    </label>
                    <textarea
                      style={{ marginRight: '4px' }}
                      className="col-md-10 model-textarea"
                      name="description"
                      id=""
                      onChange={onDescriptionChange}
                      value={description}
                    />
                  </div>

                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <label className="col-md-2">Chi tiết</label>
                    <input className="col-md-8" type="text" onChange={onSpecificationChange} value={specification} />
                    <button className="btn btn-primary col-md-2" onClick={onAddSpecificationClick} disabled={!specification}>
                      Thêm
                    </button>
                  </div>

                  <section className="container">
                    <aside>
                      <ul style={{ listStyle: 'none' }}>{eSpecifications}</ul>
                    </aside>
                  </section>

                  <div className="modal-footer">
                    <button className="model-btn btn btn-success" onClick={editProduct}>
                      Sửa
                    </button>
                    <button id="close-modal-edit" type="button" className="btn btn-secondary" data-dismiss="modal">
                      Thoát
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AdminProduct };
