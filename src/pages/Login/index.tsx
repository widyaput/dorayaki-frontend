import React, { useState } from 'react';
import { Button, Card, Form, Typography, PageHeader, Alert, Input } from 'antd';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

import NonAuthLayout from '@/components/Layout/NonAuth';
import { DEFAULT_AUTH_ADMIN } from '@/config/default';

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [isError, setError] = useState(false);

  const error = new URLSearchParams(useLocation().search).get('error');
  const onFinish = async (values: {username: string, password: string}) => {
    try {
      const res = await axios.post(DEFAULT_AUTH_ADMIN, values, {withCredentials: true});
      if (res.status === 200) {
        window.location.href = '/'
        return
      }
    } catch (e) {
      setError(true);
    }
  };
  return (
    <NonAuthLayout>
      <Helmet>
        <title>WeeDorayaki | Login</title>
      </Helmet>

      <div className="loginPage">
        {error && <Alert message="Error" description={error} type="error" showIcon closable />}

        <img src="/images/hoobex-office-login.svg" className="loginLogo" />
        <Card className="loginCard" bordered={false}>
          <PageHeader>
            <Typography.Title level={5} style={{textAlign: 'center'}}>
              Login to your account
            </Typography.Title>
            {!isError && <p className="sm-text text-center">
              Please use your registered credentials.
            </p>}
            {isError && <p className="sm-text text-center" style={{color: 'red'}}>Invalid credentials</p>}
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item label="Username" name="username" rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                }
              ]}>
                <Input value={user} onChange={e => setUser(e.target.value)}/>
              </Form.Item>
              <Form.Item label="Password" name="password" rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                }
              ]}>
                <Input.Password value={pass} onChange={e => setPass(e.target.value)} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </PageHeader>
        </Card>
      </div>
    </NonAuthLayout>
  );
};

export default LoginPage;
