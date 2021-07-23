import React from 'react';
import { Typography, Row, Col, Image, Button, Space, Popconfirm } from 'antd';
import { BiArrowBack } from 'react-icons/bi';
import { RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';

import axios from '@/modules/axios';
import ViewActions from '../View/ViewActions';


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
      await axios.delete(`/dorayakis/${props.ID}`, {withCredentials: true});
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
          <Col xs={16} sm={12} >
            <h2>Image</h2>
            <Image
              src={props.ImgURL}
              alt="dorayaki-img"
              className = "img-thumbnail"
              style={{maxWidth: '100%', height: 'auto'}} preview={true}/>
          </Col>
          <Col span={12} xxl={8}>
            <h2>Flavor</h2>
            <p>{props.Rasa}</p>
            <h2>Description</h2>
            <p>{props.Desc}</p>
          </Col>
        </Row>
        <ViewActions
        onBack={() => window.location.href = '/dorayakis'}
        onEdit={() => window.location.href =`/dorayakis/${props.ID}/edit`}
        onDelete={handleDelete}
        >
        </ViewActions>
      </div>
    </div>
  
  </>)
}

export default DorayakiView;