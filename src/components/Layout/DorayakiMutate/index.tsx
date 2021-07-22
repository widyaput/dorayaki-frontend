import React, { useState } from 'react';
// import { useHistory } from 'react-router';
import { Upload, message, Typography, Form, Row, Col, Input, Image } from 'antd';
import { LoadingOutlined, PlusOutlined} from '@ant-design/icons'
import { RcFile} from 'antd/lib/upload';

// import Dorayaki from '@/models/Dorayaki'
import axios from '@/modules/axios';
import { useEffect } from 'react';
import { DEFAULT_API_PREFIX } from '@/config/default';
import FormActions from '@/components/Form/FormActions';

const { Dragger } = Upload;

interface Props {
  ID: number;
  isAdd: boolean;
}

const DorayakiMutate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();

  const [Rasa, setRasa] = useState('');
  const [Desc, setDesc] = useState('');
  const [ImgURL, setImgUrl] = useState('');
  const [uploadedImgURL, setUploadedImgURL] = useState('');
  const [uploadedRasa, setURasa] = useState('');
  const [uploadedDesc, setUDesc] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    (async () => {
      if (!props.isAdd) {
        try {
          const res = await axios.get(`/dorayakis/${props.ID}`);
          if (res.status===200){
            const { data } = res;
            setRasa(data.data.rasa);
            setDesc(data.data.deskripsi);
            setImgUrl(data.data.image_url);
          }
        } catch (error) {
          return (<h1>404</h1>);
        }
      }
    })();
  }, []);

  useEffect(() => {
    setUploadedImgURL(ImgURL);
    setUDesc(Desc);
    setURasa(Rasa);
  }, [ImgURL, Rasa, Desc])

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPngOrJpeg = file.type === 'image/jpeg'
      || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPngOrJpeg) message.error('You can only upload JPG/PNG file!');
    const isLt2M =file.size / 1024 / 1024 < 2;
    if (!isLt2M) message.error('Image must be smaller than 2MB');
    return isJpgOrPngOrJpeg&&isLt2M;
  };

  const handleChange = () => {
    setLoading(true);
  }

  const handleRemove= async () => {
    if (props.isAdd || uploadedImgURL !== ImgURL) {
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
    if (!props.isAdd) {
      if (uploadedImgURL !== ImgURL){
        const nameFile = ImgURL.replace(`${DEFAULT_API_PREFIX}/files/`, '');
        try {
          await axios.delete(`/images/${nameFile}`, {
            withCredentials: true
          })
        } catch (e) {
          console.error(e);
        }
      }
      try {
        const res = await axios.put(`/dorayakis/${props.ID}`, {
          rasa: uploadedRasa,
          deskripsi: uploadedDesc,
          image_url: uploadedImgURL
        }, {
          withCredentials: true
        })
        if (res.status === 200) {
          message.success(`Edit dorayaki berhasil`)
          window.location.href ='/dorayakis';
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
        message.success('Tambah dorayaki berhasil')
        window.location.href = '/dorayakis'
      }
      return
    } catch (e) {
      console.error(e);
      return;
    }
  }

  const handleCancel = async () => {
    if (uploadedImgURL !== ImgURL && uploadedImgURL !== ''){
      const nameFile = uploadedImgURL.replace(`${DEFAULT_API_PREFIX}/files/`, '');
      try {
        const res = await axios.delete(`/images/${nameFile}`, {
          withCredentials: true,
        })
        if (res.status === 200) {
          window.location.href = '/dorayakis'
        }
        setUploadedImgURL('');
        return;
      } catch (e) {
        console.error(e);
        return;
      }
    }
    window.location.href = '/dorayakis'
  }

  const customUploadImage = async (options: any) => {
    const { file } = options;
    const formData = new FormData();
    formData.append("uploadFile", file);
    if (file !== null){
      // const uploadURL = props.isAdd ? '/uploads' : `dorayakis/${props.ID}/upload`;
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
      <div className="dorayaki-container">
        <Typography.Title level={1}>
          {' '}
          {props.isAdd ? 'Add New' : 'Edit'} Dorayaki
        </Typography.Title>
        <Form className="dorayaki-content" layout="vertical" form={form}>
          <Row gutter={12}>
            <Col span={12}>
              <label className="ant-form-item-label"> Gambar</label>
              <div className="dorayaki-drop-container">
                <Dragger
                  className="dropzone-container"
                  name="uploadFile"
                  beforeUpload={beforeUpload}
                  showUploadList={{showRemoveIcon: true, showPreviewIcon:false}}
                  maxCount={1}
                  listType="picture"
                  onChange={handleChange}
                  customRequest={customUploadImage}
                  onRemove={handleRemove}
                  >
                    {uploadedImgURL !== '' ? (
                      <Image
                      src={uploadedImgURL}
                      alt="foto-dorayaki"
                      style={{width: '100%'}} preview={false}/>
                    ): uploadButton}
                </Dragger>
              </div>    
            </Col>
            <Col span={12}>
              <Form.Item
              label="Rasa"
              name="rasa"
              rules={[{required: true, message: 'Rasa dorayaki tidak boleh kosong'}]}
              initialValue={Rasa}
              >
                <Input 
                value={uploadedRasa}
                name="rasa"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setURasa(e.target.value)}
                
              />
              </Form.Item>
              <Form.Item
              label="Deskripsi"
              name="deskripsi"
              rules={[{required: true, message: 'Deskripsi dorayaki tidak boleh kosong'}]}
              initialValue={Desc}
              >
                <Input.TextArea
                value={uploadedDesc}
                name="deskripsi"
                onChange={(e: any) => setUDesc(e.target.value)}
                rows= {5}
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