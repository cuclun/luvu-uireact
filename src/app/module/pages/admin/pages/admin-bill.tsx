import { Header, Navigation } from 'app/module/pages/admin/layouts';
import { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import API from 'app/services/rest-client';

const AdminBill = () => {
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
      label: 'Tên khách hàng',
      field: 'name',
      sort: 'asc'
    },
    {
      label: 'Số điện thoại',
      field: 'phone',
      sort: 'asc'
    },
    {
      label: 'Địa chỉ',
      field: 'address',
      sort: 'asc'
    },
    {
      label: 'Ngày đặt hàng',
      field: 'date_create',
      sort: 'asc'
    },
    {
      label: 'Trạng thái',
      field: 'status',
      sort: 'asc'
    },
    {
      label: 'Xem thông tin',
      field: 'action',
      sort: 'asc'
    }
  ]);
  const [dataTable, setDataTable] = useState<any>();
  const [bills, setBills] = useState<any[]>([]);
  const [bill, setBill] = useState<any>();

  useEffect(() => {
    API.get('api/bill/').then((response: any) => {
      response.data.forEach((item: any) => {
        bills.push({
          id: item.id,
          name: item.name,
          phone: item.phone,
          address: item.address,
          billDetails: item.billDetailsResponses,
          date_create: new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }).format(new Date(item.date_create)),
          action: (
            <div className="btn-action">
              <button
                id={'btn-info-bill-' + item.id}
                className="btn btn-info"
                type="button"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => showInfo(item.id)}
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          ),
          status: item.approved ? 'Đã duyệt' : 'Chưa duyệt'
        });
        bills.sort((a, b) => (a.date_create > b.date_create ? -1 : 1));
        setBills([...bills]);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showInfo = (id: number) => {
    bills.forEach((item: any) => {
      if (item.id === id) {
        setBill(item);
      }
    });
  };

  const approved = () => {
    const userDetails = sessionStorage.getItem('userDetails');
    const accessToken = JSON.parse(userDetails ? userDetails : '').accessToken;
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    };

    API.put('api/bill/' + bill.id, null, { headers }).then(response => document.location.reload());
  };

  useEffect(() => {
    setDataTable({ columns: header, rows: bills });
  }, [bills, header]);

  return (
    <div>
      <Header></Header>
      <div className="admin-content">
        <Navigation></Navigation>
        <div id="admin-collection-page">
          <div className="admin-name-page">
            <p>Hóa đơn</p>
          </div>
          <div>
            <MDBDataTable bordered data={dataTable}></MDBDataTable>
          </div>
          <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header justify-content-center">
                  <h3 className="modal-title " id="exampleModalLabel">
                    Thông tin đơn hàng
                  </h3>
                </div>
                <div className="modal-body">
                  <div className="row py-2">
                    <div className="col-md-4">Tên khách hàng:</div>
                    <div className="col-md-8">{bill?.name}</div>
                  </div>
                  <div className="row py-2">
                    <div className="col-md-4">Số điện thoại:</div>
                    <div className="col-md-8">{bill?.phone}</div>
                  </div>
                  <div className="row py-2">
                    <div className="col-md-4">Địa chỉ:</div>
                    <div className="col-md-8">{bill?.address}</div>
                  </div>
                  <div className="row py-2">
                    <div className="col-md-4">Ngày đặt:</div>
                    <div className="col-md-8">{bill?.date_create}</div>
                  </div>
                  <div className="row py-2">
                    <div className="col-md-4">Sản phẩm đã đặt:</div>
                  </div>
                  <div className="row py-2">
                    <div className="col-md"></div>
                    <table className="table mx-3">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Tên</th>
                          <th scope="col">Giá</th>
                          <th scope="col">Màu</th>
                          <th scope="col">Size</th>
                          <th scope="col">Số lượng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bill?.billDetails.map((item: any, index: number) => {
                          return (
                            <tr key={index}>
                              <th scope="row">{index}</th>
                              <td>{item.product.name}</td>
                              <td>{item.product.price}</td>
                              <td>{item.color}</td>
                              <td>{item.size}</td>
                              <td>{item.quantity}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  {bill?.status === 'Đã duyệt' ? (
                    <div></div>
                  ) : (
                    <button type="button" className="btn btn-primary" onClick={approved}>
                      Duyệt
                    </button>
                  )}
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

export { AdminBill };
