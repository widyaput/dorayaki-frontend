import React from 'react';
import { Typography, Row, Col } from 'antd';
import axios from '@/modules/axios';
import ViewActions from '../View/ViewActions';

interface Props {
  ID: number,
  Nama: string,
  Jalan: string,
  Kecamatan: string,
  Provinsi: string,
}

const ViewShop: React.FC<Props> = (props: Props) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/shops/${props.ID}`);
      window.location.href = '/shops'
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
    <div>
      <Typography.Title level={1}>
        {' '}
        View Shop
      </Typography.Title>
      <div>
        <Row gutter={12}>
          <Col xs={16} sm={12}>
            <h2>Name</h2>
            <p>{props.Nama}</p>
            <h2>St. Address</h2>
            <p>{props.Jalan}</p>
          </Col>
          <Col span={12} xxl={8}>
            <h2>Subdistrict</h2>
            <p>{props.Kecamatan}</p>
            <h2>Province</h2>
            <p>{props.Provinsi}</p>
          </Col>
        </Row>
        <ViewActions 
        onBack={() => window.location.href = '/shops'}
        onEdit={() => window.location.href = `/shops/${props.ID}/edit`}
        onDelete={handleDelete}
        />
      </div>
    </div>
    </>
  )
}

export default ViewShop;