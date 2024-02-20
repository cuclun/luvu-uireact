import { Header, Navigation } from 'app/module/pages/admin/layouts';
import { MDBDataTable } from 'mdbreact';
import { useEffect, useState } from 'react';
import API from 'app/services/rest-client';
import { toast } from 'react-toastify';

const checkAuth = () => {
  let check = 'mod';
  const userDetails = sessionStorage.getItem('userDetails');
  const authorities = JSON.parse(userDetails ? userDetails : '').authorities;
  authorities.forEach((item: any) => {
    if (item.authority === 'ROLE_ADMIN') {
      check = 'admin';
    }
  });
  if (check === 'mod') {
    document.location.pathname = '/admin/403';
  }
};

const AdminAccount = () => {
  if (sessionStorage.getItem('userDetails') === null) {
    window.location.pathname = '/admin/login';
  }
  checkAuth();
  const userDetails = sessionStorage.getItem('userDetails');
  const accessToken = 'Bearer ' + JSON.parse(userDetails ? userDetails : '').accessToken;

  const [header] = useState([
    {
      label: 'ID',
      field: 'id',
      sort: 'asc'
    },
    {
      label: 'Tên',
      field: 'name',
      sort: 'asc'
    },
    {
      label: 'Tài khoản',
      field: 'username',
      sort: 'asc'
    },
    {
      label: 'E-mail',
      field: 'email',
      sort: 'asc'
    },
    {
      label: 'Thao tác',
      field: 'action',
      sort: 'asc'
    }
  ]);

  const [dataTable, setDataTable] = useState<any>();
  const [account, setAccount] = useState<any[]>([]);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const headers = {
      Authorization: accessToken
    };

    API.get('/rest/auth', { headers }).then((response: any) => {
      response.data.forEach((item: any) => {
        account.push({
          id: item.id,
          name: item.name,
          username: item.username,
          email: item.email,
          action: (
            <div className="btn-action">
              <button className="btn btn-danger" onClick={() => deleteAccount(item.id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          )
        });
        setAccount([...account]);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDataTable({ columns: header, rows: account });
  }, [account, header]);

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangeUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const createAccount = () => {
    if (name === '' || email === '' || username === '' || password === '') {
      toast.error('Chưa nhập đầy đủ thông tin.');
      return;
    }

    const headers = {
      Authorization: accessToken
    };

    const formAccount = {
      name,
      email,
      username,
      password
    };

    API.post('/rest/auth/signup', formAccount, { headers })
      .then(response => {
        let newAccount = response.data;
        account.push({
          id: newAccount.id,
          name: newAccount.name,
          username: newAccount.username,
          email: newAccount.email,
          action: (
            <div className="btn-action">
              <button className="btn btn-danger" onClick={() => deleteAccount(newAccount.id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          )
        });
        setAccount([...account]);
        document.getElementById('close-model-add')?.click();
        toast.success('Thêm tài khoản thành công!');
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };

  const deleteAccount = (id: Number) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa')) return;

    const headers = {
      Authorization: accessToken
    };

    API.delete('/rest/auth/' + id, { headers })
      .then(() => {
        toast.success('Xóa tài khoản thành công.');
        setAccount([...account.filter(item => item.id !== id)]);
      })
      .catch(() => {
        toast.error('Xóa tài khoản thất bại.');
      });
  };

  return (
    <div>
      <Header></Header>
      <div className="admin-content">
        <Navigation></Navigation>
        <div id="admin-collection-page">
          <div className="admin-name-page">
            <p>Tài khoản</p>
            <div>
              <button className="admin__btn-add" type="button" data-toggle="modal" data-target="#modal-add-account">
                Thêm tài khoản<i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div>
            <MDBDataTable bordered data={dataTable}></MDBDataTable>
          </div>
          <div
            className="modal fade"
            id="modal-add-account"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content justify-content-center">
                <div className="modal-header">
                  <h3 className="modal-title " id="exampleModalLabel">
                    Thêm tài khoản
                  </h3>
                </div>
                <div className="modal-body model-add">
                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <label className="col-md-4" htmlFor="">
                      Tên
                    </label>
                    <input className="col-md-8" type="text" name="name" id="" value={name} onChange={onChangeName} />
                  </div>
                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <label className="col-md-4" htmlFor="">
                      Email
                    </label>
                    <input className="col-md-8" type="email" name="email" id="" value={email} onChange={onChangeEmail} />
                  </div>
                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <label className="col-md-4" htmlFor="">
                      Tài khoản
                    </label>
                    <input className="col-md-8" type="text" name="username" id="" value={username} onChange={onChangeUsername} />
                  </div>
                  <div className="row p-2 m-2 align-items-center justify-content-between">
                    <label className="col-md-4" htmlFor="">
                      Mật khẩu
                    </label>
                    <input className="col-md-8" type="text" name="password" id="" value={password} onChange={onChangePassword} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="model-btn btn btn-success" onClick={createAccount}>
                    Thêm
                  </button>
                  <button id="close-model-add" type="button" className="btn btn-secondary" data-dismiss="modal">
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

export { AdminAccount };
