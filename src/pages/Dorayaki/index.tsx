import React from 'react';

import AuthLayout from '@/components/Layout/Auth';
import { getDorayakis } from './service';
import { Helmet } from 'react-helmet';
import PaginateDorayaki from '@/components/PaginateDorayaki';

const Dorayaki: React.FC = () => {
  return (<AuthLayout>
    <Helmet>
      <title>WeeDorayaki | Dorayakis</title>
    </Helmet>
    <main>
      <PaginateDorayaki isViewStock={false} getFunction={getDorayakis} IDShop={0} />
    </main>
  </AuthLayout>) 
}

export default Dorayaki;