import API from 'app/services/rest-client';
import { useCallback, useEffect, useState } from 'react';
import 'app/static/styles/admin/admin-login.css';
import logo from 'app/static/images/logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameChange = useCallback(e => {
    setUsername(e.target.value);
  }, []);

  const onPasswordChange = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  function login() {
    const formData = {
      username,
      password
    };

    const headers = {
      'Content-Type': 'application/json'
    };

    API.post('rest/auth/signin', formData, { headers })
      .then((response: any) => {
        sessionStorage.setItem('userDetails', JSON.stringify(response.data));
        window.location.pathname = '/admin/dashboard';
      })
      .catch((response: any) => {
        const loginError = document.getElementById('login-error');
        if (loginError) {
          loginError.style.color = 'red';
        }
      });
  }

  useEffect(() => {
    if (sessionStorage.getItem('userDetails') !== null) {
      window.location.pathname = '/admin';
    }
  }, []);

  return (
    <div className="login-page">
      <div className="form-login">
        <div>
          <img src={logo} alt="" />
        </div>
        <div className="form-login__main">
          <h1>Chào mừng trở lại!</h1>
          <input type="text" placeholder="Nhập tên đăng nhập..." onChange={onUsernameChange} />
          <input type="password" placeholder="Mật khẩu..." onChange={onPasswordChange} />
          <div className="remember-me">
            <div id="login-error">Sai tài khoản hoặc mật khẩu</div>
            <div>
              <input type="checkbox" name="" id="" />
              <p style={{ display: 'contents' }}>Ghi nhớ</p>
            </div>
          </div>
          <button className="login-btn" onClick={login}>
            Đăng nhập
          </button>
          <hr />
          <div className="login-with">
            <button className="login-btn btn-google">
              <i className="fab fa-google"></i>Đăng nhập với Google
            </button>
            <button className="login-btn btn-facebook">
              <i className="fab fa-facebook"></i>Đăng nhập với Facebook
            </button>
          </div>
          <hr />
          <a href=".">Quên mật khẩu?</a>
          <a href=".">Tạo tài khoản!</a>
        </div>
      </div>
    </div>
  );
};

export { Login };
