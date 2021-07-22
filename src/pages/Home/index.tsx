import React from 'react';
import { Helmet } from 'react-helmet';

import AuthLayout from '@/components/Layout/Auth';

const Home: React.FC = () => {
  return (
    <AuthLayout>
      <Helmet>
        <title>WeeDorayaki | Home</title>
      </Helmet>
    </AuthLayout>
  );
};

export default Home;
