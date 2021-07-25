import React from 'react';
import swr from 'swr';
import { Alert } from 'antd';
import { useParams } from 'react-router-dom';

import Auth from '@/components/Layout/Auth';
import { getStock } from './service';
import { getShop } from '@/services/getShop';

import { Helmet } from 'react-helmet';
import PaginateDorayaki from '@/components/PaginateDorayaki';


const Stock: React.FC = () => {
  const { id } = useParams() as any;
  const { key, fetcher } = getShop(id);
  const { data, error } = swr(key, fetcher);

  return (
    <Auth>
      <Helmet>
        <title>WeeDorayaki | View Stock</title>
      </Helmet>
      {error && <Alert message={error.message} type="error"/>}
      {!error && data &&
      <PaginateDorayaki
      isViewStock={true}
      getFunction={getStock}
      IDShop={id}
      />}
    </Auth>
  )
}

export default Stock;