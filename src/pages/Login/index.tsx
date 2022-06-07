import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';
import { sendPostLogin } from 'api/auth';
import { TOKEN, REFRESH_TOKEN, USER_INFO } from 'constants/auth';

interface ILogin {
  username: string;
  password: string;
}

const LoginComponent = () => {
  const navigate = useNavigate();

  const isAuthenticated = !!Cookies.get(TOKEN);

  const { mutate: onFinish, isLoading } = useMutation(
    async (value: ILogin) =>
      sendPostLogin({
        username: value.username.trim(),
        password: value.password.trim(),
      }),
    {
      onSuccess: (data) => {
        const { token } = data;

        Cookies.set(TOKEN, token, {
          expires: 10,
        });
        Cookies.set(USER_INFO, JSON.stringify(data), {
          expires: 10,
        });

        navigate('/');
      },
      onError: (error: any) => {
        message.error(error?.response?.data?.message || 'Login failed!');
      },
    }
  );

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.pageLogin}>
      <div className={styles.loginForm}>
        <div className={styles.tile}>Login</div>
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Username"
            name="username"
            className={styles.username}
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} />
          </Form.Item>

          <Form.Item
            label="Password"
            className={styles.password}
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoading}
              className={styles.btnSubmit}
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <p onClick={() => navigate('/sign-up')} className={styles.signUp}>
          Sign Up
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
