import React from 'react';
import { Helmet } from 'react-helmet';
import swr from 'swr';
import { Alert } from 'antd';
import { useParams } from 'react-router-dom';

import Auth from '@/components/Layout/Auth';
import ViewShop from '@/components/Shop';
import { getShop } from '@/services/getShop';


const Shop: React.FC = () => {
  const { id } = useParams() as any;
  const { key, fetcher } = getShop(id);
  const { data, error } = swr(key, fetcher);

  return (
    <Auth>
      <Helmet>
        <title>WeeDorayaki | View Shop</title>
      </Helmet>
      <div>
        {error && <Alert message={error.message} type="error" />}
        {!error && data && (
          <ViewShop
          ID={id}
          Nama={data.data[0].nama}
          Jalan={data.data[0].jalan}
          Kecamatan={data.data[0].kecamatan}
          Provinsi={data.data[0].provinsi}
          >
          </ViewShop>
        )}
      </div>
    </Auth>
  )
}

export default Shop;