import React, { useEffect, useState } from 'react';
import { Row, Spin } from 'antd';
import { Redirect } from 'react-router-dom';

import Axios from '@/modules/axios';
import BaseLayout from '@/components/Layout/index';
import Container from '@/components/Container';
import { DEFAULT_API_PREFIX } from '@/config/default';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Auth: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAuthenticatedStatus() {
      setLoading(true);
      try {
        const res = await Axios.get(`${DEFAULT_API_PREFIX}/checkProfile`, {
          withCredentials: true
        });

        if (res.status === 200) setIsAuthenticated(true);
      } finally {
        setLoading(false);
      }
    }

    getAuthenticatedStatus();
    return () => {console.log()}
  }, []);

  if (loading)
    return (
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Spin size="large" />
      </Row>
    );

  if (!isAuthenticated) return <Redirect to={{ pathname: '/login' }} />;

  return (
    <BaseLayout>
      <Container>{children}</Container>
    </BaseLayout>
  );
};

export default Auth;
