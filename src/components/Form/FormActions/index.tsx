import { Button, Col, Row, Space } from 'antd';
import React, { FC } from 'react';
import { FiSend } from 'react-icons/fi';
import { MdCancel } from 'react-icons/md';

/**
 * Form actions properties
 */
interface FormActionsProps {
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * Actions that can be done to a form, there are: submit, check inputs, and cancel
 */
const FormActions: FC<FormActionsProps> = ({ onSubmit, onCancel }) => {
  return (
    <Row
      style={{
        marginTop: '20px'
      }}
    >
      <Col span={12} className="flex ">
        <Button className="" icon={<MdCancel />} onClick={() => onCancel()}>
          Cancel
        </Button>
      </Col>
      <Col span={12} className="flex justify-end">
        <Space>
          <Button type="primary" className="" icon={<FiSend />} onClick={() => onSubmit()}>
            Submit
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

export default FormActions;
