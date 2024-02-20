import { Header, Navigation } from 'app/module/pages/admin/layouts';
import { useEffect, useState } from 'react';
import API from 'app/services/rest-client';
import 'app/static/styles/admin/admin-image.css';
import { MDBDataTable } from 'mdbreact';

const AdminBanner = () => {
    if (sessionStorage.getItem('userDetails') === null) {
        window.location.pathname = '/admin/login';
    }
    const userDetails = sessionStorage.getItem('userDetails');
    const accessToken = 'Bearer ' + JSON.parse(userDetails ? userDetails : '').accessToken;

    const [header] = useState([
        {
            label: 'ID',
            field: 'id',
            sort: 'asc'
        },
        {
            label: 'Tên ảnh',
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
    const [photos, setPhotos] = useState<any[]>([]);
    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        API.get('api/banner').then((response: any) => {
            console.log(response.data);
            response.data.forEach((item: any) => {
                photos.push({
                    id: item.id,
                    name: item.image,
                    action: (
                        <div className="btn-action">
                            <button className="btn btn-danger" id={'btn-del-photo-' + item.id} onClick={() => delPhoto(item.id)}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    )
                });
                setPhotos([...photos]);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setDataTable({ columns: header, rows: photos });
    }, [photos, header]);

    const onFileChange = (e: any) => {
        if (e.target.files[0]) setImages([...images, { id: images.length, file: e.target.files[0], check: true }]);
    };

    const removeImage = (id: any) => {
        images[id].check = false;
        setImages([...images]);
    };

    const delPhoto = (id: number) => {
        const headers = {
            Authorization: accessToken,
            'Content-Type': 'multipart/form-data;'
        };
        API.delete('api/uploads/' + id, { headers }).then((response: any) => document.location.reload());
    };

    const insertPhoto = () => {
        const files: File[] = [];
        const dataForm = new FormData();

        images.map(item => (item.check ? files.push(item.file) : ''));
        files.map(item => dataForm.append('files', item));

        const headers = {
            Authorization: accessToken,
            'Content-Type': 'multipart/form-data;'
        };
        API.post('api/banner', dataForm, { headers }).then((response: any) => {
            document.location.reload();
        });
    };

    return (
        <div>
            <Header></Header>
            <div className="admin-content">
                <Navigation></Navigation>
                <div id="admin-collection-page">
                    <div className="admin-name-page">
                        <p>Ảnh</p>
                        <div>
                            <button className="admin__btn-add" type="button" data-toggle="modal" data-target="#modal-add-photo">
                                Thêm ảnh<i className="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>

                    <div>
                        <MDBDataTable bordered data={dataTable}></MDBDataTable>
                    </div>

                    <div
                        className="modal fade"
                        id="modal-add-photo"
                        tabIndex={-1}
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content justify-content-center">
                                <div className="modal-header">
                                    <h3 className="modal-title " id="exampleModalLabel">
                                        Thêm ảnh
                                    </h3>
                                </div>
                                <div className="modal-body model-add">
                                    <div className="row p-2 m-2 align-items-center justify-content-between">
                                        <div className="col-md-2">Ảnh</div>
                                        <div className="col-md-10 p-0">
                                            <label htmlFor="add__upload-photo" id="lable-upload-photo">
                                                <input className="w-100" disabled={true} id="file-name" value={images[images.length - 1]?.file?.name}></input>
                                                <span className="position-absolute" style={{ top: '8px', right: '4px' }}>
                                                    <i className="fas fa-upload">Chọn ảnh</i>
                                                </span>
                                            </label>
                                        </div>
                                        <input type="file" name="" id="add__upload-photo" onChange={onFileChange} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="model-btn btn btn-success" onClick={insertPhoto}>
                                        Thêm
                                    </button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">
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

export { AdminBanner };
