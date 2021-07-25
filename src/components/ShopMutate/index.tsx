import React, { useState, useEffect } from "react";
import { message, Typography, Form, Row, Col, Input } from "antd";

import axios from '@/modules/axios';
import FormActions from "../Form/FormActions";

interface Props {
  ID: number,
  isAdd: boolean,
  Nama: string,
  Jalan: string,
  Kecamatan: string,
  Provinsi: string,
}

const ShopMutate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [shopValue, setShop] = useState<Props>({
    ID: props.ID,
    isAdd: props.isAdd,
    Nama: props.Nama,
    Jalan: props.Jalan,
    Kecamatan: props.Kecamatan,
    Provinsi: props.Provinsi
  })

  const [nama, setNama] = useState(shopValue.Nama);
  const [jalan, setJalan] = useState(shopValue.Jalan);
  const [kec, setKec] = useState(shopValue.Kecamatan);
  const [prov, setProv] = useState(shopValue.Provinsi);

  useEffect(() => {
    setShop(props)
  }, [props]);

  const handleSubmit = async () => {
    if (!shopValue.isAdd) {
      try {
        const res = await axios.put(`/shops/${shopValue.ID}`, {
          nama,
          jalan,
          kecamatan: kec,
          provinsi: prov,
        });
        if (res.status === 200) {
          message.success(`Shop is edited`);
          window.location.href = `/shops/${shopValue.ID}`
        }
        return;
      } catch (e) {
        console.error(e);
        return;
      }
    }
    try {
      const res = await axios.post(`/shops`, {
        nama,
        jalan,
        kecamatan: kec,
        provinsi: prov,
      });
      if (res.status === 201) {
        message.success(`Shop is added`);
        window.location.href = `/shops/${res.data.data[0].id}`
      }
      return;
    } catch (e) {
      console.error(e);
    }
  }

  const handleCancel = async () => {
    window.location.href = props.isAdd ? '/shops' : `/shops/${shopValue.ID}`;
  }

  return (
    <>
      <div>
        <Typography.Title level={1}>
          {' '}
          {shopValue.isAdd ? 'Add New' : 'Edit'} Shop
        </Typography.Title>
        <Form layout="vertical" form={form}>
          <Row gutter={12}>
            <Col xs={16} sm={12}>
              <Form.Item
              label="Name"
              name="nama"
              rules={[{required: true, message: `Shop's name cannot be empty`}]}
              initialValue={shopValue.Nama}>
                <Input
                value={nama}
                name="nama"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNama(e.target.value)}
                / >
              </Form.Item>
              <Form.Item
              label="St. Address"
              name="jalan"
              rules={[{required: true, message: `Shop's street address cannot be empty`}]}
              initialValue={shopValue.Jalan}>
                <Input
                value={jalan}
                name="jalan"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJalan(e.target.value)}
                / >
              </Form.Item>
            </Col>
            <Col span={12} xxl={8}>
              <Form.Item
              label="Subdistrict"
              name="kecamatan"
              rules={[{required: true, message: `Shop's subdistrict cannot be empty`}]}
              initialValue={shopValue.Kecamatan}>
                <Input
                value={kec}
                name="kecamatan"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKec(e.target.value)}
                / >
              </Form.Item>
              <Form.Item
              label="Province"
              name="provinsi"
              rules={[{required: true, message: `Shop's province cannot be empty`}]}
              initialValue={shopValue.Provinsi}>
                <Input
                value={prov}
                name="provinsi"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProv(e.target.value)}
                / >
              </Form.Item>
            </Col>
          </Row>
          <FormActions onSubmit={handleSubmit} onCancel={handleCancel} />
        </Form>
      </div>
    </>
  )
}

export default ShopMutate;  