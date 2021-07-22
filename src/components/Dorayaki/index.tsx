import React from 'react';
import { Modal, Typography, Row, Col, Image, Button, Space, Popconfirm } from 'antd';
import { BiArrowBack } from 'react-icons/bi';
import { RiDeleteBin6Line, RiEdit2Line, RiEditLine } from 'react-icons/ri';

// import Dorayaki from '@/models/Dorayaki'
import axios from '@/modules/axios';
import { useEffect } from 'react';
import { DEFAULT_API_PREFIX } from '@/config/default';


interface Props {
  ID: number;
  Rasa: string;
  Desc: string;
  ImgURL: string;
}

const DorayakiView: React.FC<Props> = (props: Props) => {
  const handleDelete = async () => {
    try {
      console.log('HI dari delete');
      await axios.delete(`dorayakis/${props.ID}`, {withCredentials: true});
      window.location.href ='/dorayakis';
    } catch (e) {
      console.error(e);
    }
  }
  
  return (<>
    <div>
      <Typography.Title level={1}>
        {' '}
        View Dorayaki
      </Typography.Title>
      <div>
        <Row gutter={12}>
          <Col span={12}>
            <h2>Image</h2>
            <Image
              src={props.ImgURL}
              alt="dorayaki-img"
              style={{maxWidth: '100%', height: 'auto'}} preview={true}/>
          </Col>
          <Col span={12}>
            <h2>Flavor</h2>
            <p>{props.Rasa}</p>
            <h2>Description</h2>
            <p>{props.Desc}</p>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col span={12} className="flex">
            <Button icon={<BiArrowBack/>} onClick={() => window.location.href = '/dorayakis'} >Back</Button>
          </Col>
          <Col span={12} className="flex justify-end">
            <Space>
              <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={()=>handleDelete()}>
                <Button danger type="primary" icon={<RiDeleteBin6Line/>}>
                  Delete
                </Button>
              </Popconfirm>
              <Button type="primary" icon={<RiEditLine />} 
                onClick={() => window.location.href =`/dorayakis/${props.ID}/edit`}>
                Edit
              </Button>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  
  </>)
}

export default DorayakiView;