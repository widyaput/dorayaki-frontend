import { Button, Col, Row, Space, Popconfirm } from 'antd';
import React, { FC } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';
import { MdCancel } from 'react-icons/md';


interface ViewActionProps {
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ViewActions: FC<ViewActionProps> = ({ onBack, onEdit, onDelete }) => {
  return (
    <Row style={{marginTop: '20px'}}>
      <Col xs={16} sm={12} className="flex">
        <Button icon={<BiArrowBack/>} onClick={onBack} >Back</Button>
      </Col>
      <Col span={12} className="flex submit-edit-btn">
        <Space>
          <Popconfirm
            title="Are you sure?"
            okText="Yes" cancelText="No"
            onConfirm={onDelete}
            cancelButtonProps={{shape:'round', icon: <MdCancel/>, size:"small"}}
            okButtonProps={{danger:true, shape:'round', icon: <RiDeleteBin6Line/>, size:"small"}}
            >
            <Button danger type="primary" icon={<RiDeleteBin6Line/>}>
              Delete
            </Button>
          </Popconfirm>
          <Button type="primary" icon={<RiEditLine />} 
            onClick={onEdit}>
            Edit
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default ViewActions;