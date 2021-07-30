import React from 'react';
import swr from 'swr';
import { Alert, Button, Row, Spin, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import Auth from '@/components/Layout/Auth';
import { getStock, getAllDorayaki, getAllShop } from './service';
import { getShop } from '@/services/getShop';

import { Helmet } from 'react-helmet';
import PaginateDorayaki from '@/components/PaginateDorayaki';
import { BiArrowBack } from 'react-icons/bi';


const Stock: React.FC = () => {
  const { id } = useParams() as any;
  const { key, fetcher } = getShop(id);
  const { data, error } = swr(key, fetcher);
  const { key: keyD, fetcher: fetchD} = getAllDorayaki();
  const { data: dataDorayaki, error: errorDorayaki } = swr(keyD, fetchD);
  const { key: keyS, fetcher: fetchS} = getAllShop();
  const { data: dataShop, error: errorShop } = swr(keyS, fetchS);
  return (
    <Auth>
      <Helmet>
        <title>WeeDorayaki | View Stock</title>
      </Helmet>
      {error && <Alert message={error.message} type="error"/>}
      {!error && (!data || !dataDorayaki || !dataShop) && <Spin size="large"/>}
      {!error && data && dataDorayaki && dataShop &&
      <main>
        <PaginateDorayaki
        isViewStock={true}
        getFunction={getStock}
        IDShop={id}
        nameOfShop={data.data[0].nama}
        dataDorayaki={{dataDorayaki, errorDorayaki}}
        dataShop={{dataShop, errorShop}}
        />
        <div style={{marginTop: '20px'}}>
        <Button
        icon={<BiArrowBack/>}
        onClick={() => window.location.href=`/shops/${id}`}
        >
          Back
        </Button>
        </div>
      </main>
      }
    </Auth>
  )
}

export default Stock;