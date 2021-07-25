import React from "react";
import { Helmet } from "react-helmet";
import swr from 'swr';

import Auth from '@/components/Layout/Auth';
import ShopMutate from "@/components/ShopMutate";
import { useParams } from 'react-router-dom';
import axios from '@/modules/axios';
import { Alert } from 'antd';

const getShop = (id: number) => {
  const key = `/shops/${id}`
  const fetcher = async () => {
    const res = await axios.get(key);
    return res.data;
  }
  return { key, fetcher };
}

const EditShop: React.FC = () => {
  const { id } = useParams() as any;
  const { key, fetcher } = getShop(id);
  const { data, error } = swr(key, fetcher);

  return (
    <Auth>
      <Helmet>
        <title>WeeDorayaki | Edit Shop</title>
      </Helmet>
      <div>
        {error && <Alert message={error.message} type="error" />}
        {!error && data && (
          <ShopMutate
          isAdd={false}
          ID={id}
          Nama={data.data[0].nama}
          Jalan={data.data[0].jalan}
          Kecamatan={data.data[0].kecamatan}
          Provinsi={data.data[0].provinsi}/>
        )}
      </div>
    </Auth>
  )
}

export default EditShop;