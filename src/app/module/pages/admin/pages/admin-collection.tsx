import { Header, Navigation } from 'app/module/pages/admin/layouts';
import { useCallback, useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import API from 'app/services/rest-client';
import 'app/static/styles/admin/admin-collection.css';
import { toast } from 'react-toastify';

const AdminCollection = () => {
  if (sessionStorage.getItem('userDetails') === null) {
    window.location.pathname = '/admin/login';
  }

  const [header] = useState([
    {
      label: 'ID',
      field: 'id',
      sort: 'asc'
    },
    {
      label: 'Tên danh mục',
      field: 'name',
      sort: 'asc'
    },
    {
      label: 'Thao tác',
      field: 'action',
      sort: 'asc'
    }
  ]);
  const [dataTable, setDataTable] = useState<any>();
  const [collections, setCollections] = useState<any[]>([]);
  const [id, setId] = useState(-1);
  const [name, setName] = useState('');
  const [image, setImage] = useState<any>();

  const userDetails = sessionStorage.getItem('userDetails');
  const accessToken = 'Bearer ' + JSON.parse(userDetails ? userDetails : '').accessToken;

  useEffect(() => {
    setName('');
    setImage(null);
    setDataTable({ columns: header, rows: collections });
  }, [collections, header]);

  useEffect(() => {
    API.get('api/collection/').then((response: any) => {
      response.data.forEach((item: any) => {
        collections.push({
          id: item.id,
          name: item.name,
          action: (
            <div className="btn-action">
              <button
                className="btn btn-warning"
                id={'btn-edit-photo-' + item.id}
                onClick={() => showFormEdit(item.id)}
                type="button"
                data-toggle="modal"
                data-target="#modal-edit-collection"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button className="btn btn-danger" id={'btn-del-photo-' + item.id} onClick={() => delCollection(item.id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          )
        });
        setCollections([...collections]);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangePhoto = useCallback(e => {
    setImage(e.target.files[0]);
  }, []);

  const onChangeName = useCallback(e => {
    setName(e.target.value);
  }, []);

  const showFormEdit = (id: number) => {
    setId(id);
    collections.forEach(item => {
      if (item.id === id) {
        setName(item.name);
      }
    });
  };

  const insertCollection = () => {
    if (name === '') {
      toast.error('Tên danh mục không được bỏ trống!');
      return;
    }
    if (image === undefined || image === null) {
      toast.error('Hình ảnh danh mục không được bỏ trống!');
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    const headers = {
      Authorization: accessToken,
      'Content-Type': 'multipart/form-data'
    };

    API.post('/api/collection', formData, { headers })
      .then((response: any) => {
        const item: any = response.data;
        collections.push({
          id: item.id,
          name: item.name,
          action: (
            <div className="btn-action">
              <button
                className="btn btn-warning"
                id={'btn-edit-photo-' + item.id}
                onClick={() => showFormEdit(item.id)}
                type="button"
                data-toggle="modal"
                data-target="#modal-edit-collection"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button className="btn btn-danger" id={'btn-del-photo-' + item.id} onClick={() => delCollection(item.id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          )
        });
        setCollections([...collections]);
        document.getElementById('close-add-modal')?.click();
        toast.success('Thêm danh mục thành công.');
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };

  const editCollection = () => {
    if (name === '') {
      toast.error('Tên danh mục không được bỏ trống!');
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    image != null ? formData.append('image', image) : formData.delete('image');

    const headers = {
      Authorization: accessToken,
      'Content-Type': 'multipart/form-data'
    };

    API.put('/api/collection/' + id, formData, { headers })
      .then(() => {
        collections.find(item => item.id === id).name = name;
        setCollections([...collections]);
        document.getElementById('close-add-edit')?.click();
        toast.success('Chỉnh sửa danh mục thành công.');
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };

  const delCollection = (id: number) => {

    if (!window.confirm('Bạn muốn xóa danh mục?')) return;

    const headers = {
      Authorization: accessToken,
    };

    API.delete('/api/collection/' + id, { headers })
      .then(() => {
        setCollections([...collections.filter(item => item.id !== id)]);
        toast.success('Xóa danh mục thành công.');
      })
      .catch(() => {
        toast.error('Vẫn còn sản phẩm trong danh mục này, yêu cầu xóa hết sản phẩm trước.');
      });
  };

  return (
    <div>
      <Header></Header>
      <div className="admin-content">
        <Navigation></Navigation>
        <div id="admin-collection-page">
          <div className="admin-name-page">
            <p>Danh mục</p>
            <div>
              <button className="admin__btn-add" type="button" data-toggle="modal" data-target="#modal-add-collection">
                Thêm danh mục<i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div>
            <MDBDataTable bordered data={dataTable}></MDBDataTable>
          </div>
          <div className="modal fade" id="modal-add-collection">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header justify-content-center">
                  <h3 className="modal-title">Thêm danh mục</h3>
                </div>
                <div className="modal-body model-add">
                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <div className="col-md-3">Tên danh mục</div>
                    <input className="col-md-8" type="text" name="" id="" value={name} onChange={onChangeName} />
                  </div>
                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <div className="col-md-3">Ảnh</div>
                    <div className="col-md-8 p-0 mr-2">
                      <label htmlFor="add__upload-photo" id="lable-upload-photo">
                        <input className="w-100" disabled={true} id="file-name" value={image ? image.name : ''}></input>
                        <span className="position-absolute" style={{ top: '8px', right: '4px' }}>
                          <i className="fas fa-upload">Chọn ảnh</i>
                        </span>
                      </label>
                    </div>
                    <input type="file" name="" id="add__upload-photo" onChange={onChangePhoto} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-success" onClick={insertCollection}>
                    Thêm
                  </button>
                  <button id="close-add-modal" type="button" className="btn btn-secondary" data-dismiss="modal">
                    Thoát
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="modal-edit-collection">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header justify-content-center">
                  <h3 className="modal-title">Sửa danh mục</h3>
                </div>
                <div className="modal-body model-edit">
                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <div className="col-md-3">Tên danh mục</div>
                    <input className="col-md-8" type="text" name="" id="" value={name} onChange={onChangeName} />
                  </div>
                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <div className="col-md-3">Ảnh</div>
                    <div className="col-md-8 p-0 mr-2">
                      <label htmlFor="edit__upload-photo" id="lable-upload-photo">
                        <input className="w-100" disabled={true} id="file-name" value={image ? image.name : ''}></input>
                        <span className="position-absolute" style={{ top: '8px', right: '4px' }}>
                          <i className="fas fa-upload">Chọn ảnh</i>
                        </span>
                      </label>
                    </div>
                    <input type="file" name="" id="edit__upload-photo" onChange={onChangePhoto} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-success" onClick={editCollection}>
                    Sửa
                  </button>
                  <button id="close-add-edit" type="button" className="btn btn-secondary" data-dismiss="modal">
                    Thoát
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AdminCollection };
