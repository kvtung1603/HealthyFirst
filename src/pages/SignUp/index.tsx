import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

const SignUpComponent = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    return values;
  };

  return (
    <div className={styles.pageLogin}>
      <div className={styles.loginForm}>
        <div className={styles.tile}>Sign Up</div>
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
            <Input />
          </Form.Item>
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
              // loading={isLoading}
              className={styles.btnSubmit}
              type="primary"
              htmlType="submit"
            >
              Sign Up 
            </Button>
          </Form.Item>
        </Form>

        <p className={styles.signUp} onClick={() => navigate('/login')}>
          {' '}
          Login
        </p>
      </div>
    </div>
  );
};

export default SignUpComponent;
