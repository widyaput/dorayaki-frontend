import React from "react";
import { Helmet } from "react-helmet";
import swr from 'swr';
import { Alert } from "antd";
import { useParams } from "react-router-dom";

import AuthLayout from "@/components/Layout/Auth";
import axios from "@/modules/axios";
import DorayakiView from "@/components/Dorayaki";

const getDorayaki = (id: number) => {
  const key =`/dorayakis/${id}`;

  const fetcher = async () => {
    const res = await axios.get(key);
    return res.data;
  }
  return { key, fetcher };
}

const Dorayaki: React.FC = () => {
  const { id } = useParams() as any;
  const { key, fetcher } = getDorayaki(id);
  const { data, error } = swr(key, fetcher);
  return (
    <AuthLayout>
      <Helmet>
        <title>WeeDorayaki | View dorayaki</title>
        </Helmet>
        <div>
        {error && <Alert message={error.message} type="error" />}
        {!error && data && (
          <DorayakiView
          ID={id}
          Rasa={data.data[0].rasa}
          ImgURL={data.data[0].image_url}
          Desc={data.data[0].deskripsi}
          >

          </DorayakiView>
        )}
        </div>
    </AuthLayout>
  )
}

export default Dorayaki;