import React, { useState } from 'react';
// import { useHistory } from 'react-router';
import { Upload, message, Typography, Form, Row, Col, Input, Image, Button } from 'antd';
import { LoadingOutlined, PlusOutlined} from '@ant-design/icons'
import { RcFile} from 'antd/lib/upload';

// import Dorayaki from '@/models/Dorayaki'
import axios from '@/modules/axios';
import { useEffect } from 'react';
import { DEFAULT_API_PREFIX } from '@/config/default';
import FormActions from '@/components/Form/FormActions';
import { AiOutlineDelete } from 'react-icons/ai';

const { Dragger } = Upload;

interface Props {
  ID: number;
  isAdd: boolean;
  Rasa: string;
  Desc: string;
  ImgURL: string;
}

const DorayakiMutate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dorayakiValue, setDorayaki] = useState<Props>({
    ID: props.ID,
    Rasa: props.Rasa,
    Desc: props.Desc,
    ImgURL: props.ImgURL,
    isAdd: props.isAdd
  })
  const [uploadedImgURL, setUploadedImgURL] = useState(dorayakiValue.ImgURL);
  const [uploadedRasa, setURasa] = useState(dorayakiValue.Rasa);
  const [uploadedDesc, setUDesc] = useState(dorayakiValue.Desc);
  
  useEffect(() => {
    setDorayaki(props);
  }, [props]);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPngOrJpeg = file.type === 'image/jpeg'
      || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPngOrJpeg) message.error('You can only upload JPG/PNG/JPEG file!');
    const isLt2M =file.size / 1024 / 1024 < 2;
    if (!isLt2M) message.error('Image must be smaller than 2MB');
    return isJpgOrPngOrJpeg&&isLt2M;
  };

  const handleChange = async () => {
    setLoading(true);
    if (uploadedImgURL !== '' && uploadedImgURL !== dorayakiValue.ImgURL) {
      const nameFile = uploadedImgURL.replace(`${DEFAULT_API_PREFIX}/files/`, '');
      try {
        await axios.delete(`/images/${nameFile}`, {
          withCredentials: true
        })
      } catch (e) {
        console.error(e);
      }
    }
  }

  const handleRemove= async () => {
    if (dorayakiValue.isAdd || uploadedImgURL !== dorayakiValue.ImgURL) {
      const nameFile = uploadedImgURL.replace(`${DEFAULT_API_PREFIX}/files/`, '');
      try {
        const res = await axios.delete(`/images/${nameFile}`, {
          withCredentials: true,
        })
        if (res.status === 200) {
          message.success('Delete image success')
        }
        setUploadedImgURL('');
        setLoading(false);
        return;
      } catch (e) {
        console.error(e);
        return;
      }
    }
    setLoading(false);
    setUploadedImgURL('');
  }

  const handleSubmit = async () => {
    if (uploadedImgURL === '') {
      message.error('Dorayaki must have an image');
      return;
    }
    if (!dorayakiValue.isAdd) {
      try {
        const res = await axios.put(`/dorayakis/${dorayakiValue.ID}`, {
          rasa: uploadedRasa,
          deskripsi: uploadedDesc,
          image_url: uploadedImgURL
        }, {
          withCredentials: true
        });
        if (res.status === 200) {
          message.success(`Dorayaki is edited`);
          window.location.href = `/dorayakis/${dorayakiValue.ID}`;
        }
        return;
      } catch (e) {
        console.error(e);
        return;
      }
    }
    try {
      const res = await axios.post('/dorayakis', {
        rasa: uploadedRasa,
        deskripsi: uploadedDesc,
        image_url: uploadedImgURL
      }, {
        withCredentials: true
      })
      if (res.status === 201) {
        message.success('Dorayaki is added')
        window.location.href = `/dorayakis/${res.data.data[0].id}`
      }
      return;
    } catch (e) {
      console.error(e);
      return;
    }
  }

  const handleCancel = async () => {
    if (uploadedImgURL !== dorayakiValue.ImgURL && uploadedImgURL !== ''){
      const nameFile = uploadedImgURL.replace(`${DEFAULT_API_PREFIX}/files/`, '');
      try {
        const res = await axios.delete(`/images/${nameFile}`, {
          withCredentials: true,
        })
        if (res.status === 200) {
          window.location.href = props.isAdd ? '/dorayakis' : `/dorayakis/${props.ID}`
        }
        setUploadedImgURL('');
        return;
      } catch (e) {
        console.error(e);
        return;
      }
    }
    window.location.href = props.isAdd ? '/dorayakis' : `/dorayakis/${props.ID}`
  }

  const customUploadImage = async (options: any) => {
    const { file } = options;
    const formData = new FormData();
    formData.append("uploadFile", file);
    if (file !== null){
      // const uploadURL = dorayakiValue.isAdd ? '/uploads' : `dorayakis/${dorayakiValue.ID}/upload`;
      try {
        const res = await axios.post('/uploads', formData, {headers:{
          'Content-Type': 'multipart/form-data'
        }, withCredentials: true});
        setUploadedImgURL(res.data.data[0]);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <div>
        <Typography.Title level={1}>
          {' '}
          {dorayakiValue.isAdd ? 'Add New' : 'Edit'} Dorayaki
        </Typography.Title>
        <Form layout="vertical" form={form}>
          <Row gutter={12}>
            <Col xs={16} sm={12}>
              <label className="ant-form-item-label">
                <span className="text-red">*</span>Image
              </label>
              <div>
                <Dragger
                  name="uploadFile"
                  beforeUpload={beforeUpload}
                  showUploadList={false}
                  maxCount={1}
                  listType="picture"
                  onChange={handleChange}
                  customRequest={customUploadImage}
                  onRemove={handleRemove}
                  >
                    {uploadedImgURL !== '' ? (
                      <Image
                      src={uploadedImgURL}
                      alt="dorayaki-img"
                      className="img-thumbnail"
                      style={{maxWidth: '100%', height: 'auto'}} preview={false}/>
                    ): uploadButton}
                </Dragger>
                {uploadedImgURL !== '' &&
                  (<Button type="primary" className="event-action event-delete" style={{float: 'right'}}
                    onClick={handleRemove}
                    >
                      <AiOutlineDelete size={22}/>
                    </Button>)
                }
              </div>    
            </Col>
            <Col span={12} xxl={8}>
              <Form.Item
              label="Flavor"
              name="rasa"
              rules={[{required: true, message: `Dorayaki's flavor cannot be empty`}]}
              initialValue={dorayakiValue.Rasa}
              >
                <Input 
                value={uploadedRasa}
                name="rasa"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setURasa(e.target.value)}
                
              />
              </Form.Item>
              <Form.Item
              label="Description"
              name="deskripsi"
              rules={[{required: true, message: `Dorayaki's description cannot be empty`}]}
              initialValue={dorayakiValue.Desc}
              >
                <Input.TextArea
                value={uploadedDesc}
                name="deskripsi"
                onChange={(e: any) => setUDesc(e.target.value)}
                autoSize={{minRows: 3, maxRows: 7}}
              />
              </Form.Item>
            </Col>
          </Row>
          <FormActions onSubmit={handleSubmit} onCancel={handleCancel}>

          </FormActions>
        </Form>
      </div>
    </>
  )
}

export default DorayakiMutate;