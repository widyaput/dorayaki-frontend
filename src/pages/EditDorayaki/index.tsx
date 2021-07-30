import React from "react";
import { Helmet } from "react-helmet";
import swr from 'swr';

import AuthLayout from "@/components/Layout/Auth";
import DorayakiMutate from "@/components/DorayakiMutate";
import { useParams } from "react-router-dom";
import axios from "@/modules/axios";
import { Alert } from "antd";

const getDorayaki = (id: number) => {
  const key =`/dorayakis/${id}`;

  const fetcher = async () => {
    const res = await axios.get(key);
    return res.data;
  }
  return { key, fetcher };
}

const EditDorayaki: React.FC = () => {
  const { id } = useParams() as any;
  const { key, fetcher } = getDorayaki(id);
  const { data, error } = swr(key, fetcher);
  return (
    <AuthLayout>
      <Helmet>
        <title>WeeDorayaki | Edit Dorayaki</title>
        </Helmet>
        <div>
        {error && <Alert message={error.message} type="error" />}
        {!error && data && (
          <DorayakiMutate
          isAdd={false}
          ID={id}
          Rasa={data.data[0].rasa}
          ImgURL= {data.data[0].image_url}
          Desc = {data.data[0].deskripsi}
          ></DorayakiMutate>
        )}
        </div>
    </AuthLayout>
  )
}

export default EditDorayaki;