import React, { useState } from 'react';
import swr from 'swr';
import { Alert, Button, Image, Input, Table, Tooltip, Modal, Radio, InputNumber, Row, Col, Typography, Select, message } from 'antd';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { AiFillPlusCircle, AiOutlineEdit } from 'react-icons/ai';
import { CgDetailsMore } from 'react-icons/cg';
import { BiTransfer } from 'react-icons/bi';

import { usePagination } from '@/hooks/usePagination';
import { useSearch } from '@/hooks/useSearch';
import { useSorter } from '@/hooks/useSorter';
import axios from '@/modules/axios';
import { DEFAULT_DATE_FORMAT } from '@/config/default';
import { tableResponse } from '@/services/table';
import { ColumnType } from 'antd/lib/table';
import { mutateStock, transferStock } from '@/pages/Stocks/service';

const { Option } = Select;


interface Props {
  isViewStock: boolean,
  IDShop: number,
  getFunction: (...params: any) => any,
  nameOfShop?: string,
  dataDorayaki?: {dataDorayaki: {data: {id: number}[]}, errorDorayaki: any},
  dataShop?: {dataShop: {data: {id: number}[]}, errorShop: any},
}

const PaginateDorayaki: React.FC<Props> = (props: Props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [tfModal, setTfModal] = useState(false);
  const [addDorayakiID, setAddDorayakiID] = useState(0);
  const [tfShopID, setTfShopID] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isAddStock, setAddStock] = useState(true);
  const [OGStock, setOGStock] = useState(0);
  const [changeStock, setChangeStock] = useState(1);
  const [rowIndex, setRowIndex] = useState(1);

  const { page, perPage, setPagination } = usePagination();
  const { search, setSearch } = useSearch();
  const { sortParams, setSorter } = !props.isViewStock ?
    useSorter([{field: 'created_at', order: 'descend'}]) : useSorter([{field: 'updated_at', order: 'descend'}]);
  const { key, fetcher } = !props.isViewStock ?
    props.getFunction(axios, page, perPage, search, sortParams) :
    props.getFunction(axios, props.IDShop, page, perPage, search, sortParams);
  const { data, error } = swr(key, fetcher);
  

  const handleTableChange = (pagination: any, _: any, sorter: any) => {
    setSorter(sorter);
    setPagination(pagination);
  }
  
  const showModalMutate = (row: any) => {
    setRowIndex(row.dorayaki_id);
    setOGStock(row.stok);
    setVisibleModal(true);
  }

  const showModalTF = (row: any) => {
    setRowIndex(row.dorayaki_id);
    setOGStock(row.stok);
    setTfModal(true);
  }

  const handleMutateStock = async () => {
    const mutator = mutateStock(axios, props.IDShop, rowIndex, isAddStock ? changeStock : changeStock*-1, key);
    setConfirmLoading(true);
    await mutator();
    setConfirmLoading(false);
    setVisibleModal(false);
    setChangeStock(1);
    setAddStock(true);
  }

  const handleAddDorayaki = async () => {
    if (!addDorayakiID) {message.error('Should choose a variant of dorayaki'); return;}
    const mutator = mutateStock(axios, props.IDShop, addDorayakiID,changeStock,key);
    setConfirmLoading(true);
    await mutator();
    setConfirmLoading(false);
    setAddModal(false);
    setChangeStock(1);
  }

  const handleTransferDorayaki = async () => {
    if (!tfShopID) {message.error('Should choose a target shop'); return;}
    const mutator = transferStock(axios, props.IDShop, tfShopID, rowIndex, changeStock, key);
    setConfirmLoading(true);
    await mutator();
    setConfirmLoading(false);
    setTfModal(false);
    setChangeStock(1);
  }

  const handleSearch = (value: string) => {
    setSearch(value);
    setPagination({current: 1, pageSize: 10});
  }



  const columnDorayaki: ColumnType<any>[] = [
    {
      title: (): JSX.Element => <b>Dorayaki ID</b>,
      dataIndex: 'id',
      width:'10%',
      render: (id: string): JSX.Element =>
        <p className="text-center">{id}</p>
    },
    {
      title: (): JSX.Element => <b>Image</b>,
      dataIndex: 'image_url',
      render: (url: string): JSX.Element => (
        <div className= "img-thumbnail">
          <Image src={url} alt="dorayaki-img" />
        </div>
      )
    },
    {
      title: (): JSX.Element => <b>Flavor</b>,
      dataIndex: 'rasa',
      render: (rasa: string): JSX.Element => <p>{rasa}</p>
    },
    {
      title: (): JSX.Element => <b>Added at</b>,
      dataIndex: 'created_at',
      render: (time: number): JSX.Element =>
        <p>{format(new Date(time*1000), DEFAULT_DATE_FORMAT)}</p>,
      sorter: true,
      defaultSortOrder: 'descend',
      sortDirections: ['ascend', 'descend', 'ascend']
    },
    {
      title: (): JSX.Element => <b>Action</b>,
      width: '22%',
      render: (row: any, index: any): JSX.Element => {
        
        return (
          <React.Fragment key={index}>
            <div className="button-table-wrapper">
              <Link to={`/dorayakis/${row.id}`}>
                <Button
                className="event-action pgdorayaki-details"
                type="primary"
                icon={<CgDetailsMore/>}
                >
                  Details
                </Button>
              </Link>
            </div>
          </React.Fragment>
        )
      }
    }
  ];

  const columnStok: ColumnType<any>[] = [
    {
      title: (): JSX.Element => <b>Dorayaki ID</b>,
      dataIndex: 'dorayaki_id',
      width:'10%',
      render: (id: string): JSX.Element =>
        <p className="text-center">{id}</p>
    },
    {
      title: (): JSX.Element => <b>Image</b>,
      dataIndex: 'dorayaki_image_url',
      render: (url: string): JSX.Element => (
        <div className= "img-thumbnail">
          <Image src={url} alt="dorayaki-img" />
        </div>
      )
    },
    {
      title: (): JSX.Element => <b>Flavor</b>,
      dataIndex: 'dorayaki_rasa',
      render: (rasa: string): JSX.Element => <p>{rasa}</p>
    },
    {
      title: (): JSX.Element => <b>Restocked at</b>,
      dataIndex: 'updated_at',
      render: (time: number): JSX.Element =>
        <p>{format(new Date(time*1000), DEFAULT_DATE_FORMAT)}</p>,
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend']
    }, {
      title: (): JSX.Element => <b>Stock</b>,
      dataIndex: 'stok',
      render: (stok: number): JSX.Element => <p>{stok}</p>,
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend']
    },{
      title: (): JSX.Element => <b>Action</b>,
      render: (row: any, index: any): JSX.Element => {
        return (
          <React.Fragment key={index}>
            <div className="button-table-wrapper">
              <Tooltip placement="topLeft" title="Mutate stock">
                <Button
                icon={<AiOutlineEdit size={14} />}
                type="primary"
                className="event-action event-edit"
                onClick={() => showModalMutate(row)}>
                  Mutate Stock
                </Button>
              </Tooltip>
              <Tooltip placement="topLeft" title="Details">
                <Button
                icon={<CgDetailsMore size={14}/>} 
                type="primary"
                className="event-action pgdorayaki-details"
                onClick={() =>
                  window.location.href= `/dorayakis/${row.dorayaki_id}`}>
                  Details
                </Button>
              </Tooltip>
              <Tooltip placement="topLeft" title="Transfer stock">
                <Button
                icon={<BiTransfer size={14}/>} 
                type="primary"
                className="event-action pgdorayaki-transfer"
                onClick={() => showModalTF(row)}>
                  Transfer
                </Button>
              </Tooltip>
            </div>
          </React.Fragment>
        )
      }
    }
  ];

  const content = () => {
    if (error) <Alert message={error.message} type="error" />;

    const { tableData, pagination } = tableResponse(data);
    return (
      <Table
        rowKey={!props.isViewStock ?
          (entry:any) => entry.id : (entry: any) => entry.dorayaki_id}
        dataSource={tableData}
        columns={!props.isViewStock ? columnDorayaki : columnStok}
        pagination= {pagination}
        loading={!data}
        onChange={handleTableChange}
        size="large"
        bordered={true}/>
    )
  }
  return (
  <>
    <section className="flex justify-between mb-10">
      <Typography.Title level={1} style={{maxWidth: '50%'}}>
        {props.isViewStock ? `Dorayaki's stock of ${props.nameOfShop} Shop` : 'List of Dorayakis'}
      </Typography.Title>
      <div>
          {!props.isViewStock &&
          <Link to={'/dorayakis/add'}>
            <Button
            type="primary"
            size="large"
            icon={<AiFillPlusCircle size={16} />}
            >             
              Add new dorayaki
            </Button>
          </Link>}
          {props.isViewStock && 
          <Button
          type="primary"
          size="large"
          onClick={() => setAddModal(true)}
          >
            Add new variant
          </Button>
          }
      </div>
    </section>
    <Input.Search
      placeholder="Input dorayaki's flavor"
      onSearch={handleSearch}
      className="search-bar"
      enterButton
      allowClear
      />
    <section className="list-section-main">
      {content()}
      {props.isViewStock &&
      <div>
        <Modal
        title="Edit stock"
        visible={visibleModal}
        confirmLoading={confirmLoading}
        onCancel={() => setVisibleModal(false)}
        footer={
          [
            <Row key="1" style={{marginTop: '20px'}}>
              <Col span={12} className="flex">
                <Button
                type="primary"
                key="1"
                className="flex"
                onClick={() => {setVisibleModal(false); setChangeStock(1)}}
                >
                  Cancel
                </Button>
              </Col>
              <Col span={12} className="flex justify-end">
                <Button
                type="primary"
                key="2"
                className="flex justify-between"
                onClick={() => handleMutateStock()}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          ]
        }
      >
        <div className="modal-form">
          <Radio.Group defaultValue="add"
          onChange={(e) => setAddStock(e.target.value === "add")}>
            <Radio.Button value="add">Add Stock</Radio.Button>
            <Radio.Button value="subs" disabled={OGStock<=0}>
              Reduce Stock
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className="modal-form">
          <p className="modal-label">Input amount of stock</p>
          <InputNumber min={isAddStock ? 1 : Math.min(1, OGStock)}
          max={isAddStock ? Number.MAX_SAFE_INTEGER : OGStock}
          value={changeStock} onChange={setChangeStock}
          />
        </div>
      </Modal>
      <Modal
        title="Add new dorayaki variant to the shop"
        visible={addModal}
        confirmLoading={confirmLoading}
        onCancel={() => {setAddModal(false); setChangeStock(1); setAddDorayakiID(0);}}
        footer={
          [
            <Row key="1" style={{marginTop: '20px'}}>
              <Col span={12} className="flex">
                <Button
                type="primary"
                key="1"
                className="flex"
                onClick={() => {
                  setAddModal(false);
                  setChangeStock(1);
                  setAddDorayakiID(0);}
                }>
                  Cancel
                </Button>
              </Col>
              <Col span={12} className="flex justify-end">
                <Button
                type="primary"
                key="2"
                className="flex justify-between"
                onClick={() => handleAddDorayaki()}
                >
                  Add
                </Button>
              </Col>
            </Row>
          ]
        }
      >
        <div className="modal-form">
          <Select
          onChange={(value) => {
            if (!value) setAddDorayakiID(0);
            else setAddDorayakiID(Number(value))}
          }
          value={!addDorayakiID ? undefined : addDorayakiID}
          allowClear
          showSearch
          className="search-bar"
          optionFilterProp="children"
          placeholder="Search dorayaki's flavor or id"
          >
            {props.dataDorayaki?.dataDorayaki.data.map((dorayaki: any, index:number) =>
              {return <Option
                value={dorayaki.id}
                key={index}
              >
                {`${dorayaki.id} - ${dorayaki.rasa}`}
              </Option>}
            )}
          </Select>
        </div>
        <div className="modal-form">
          <p className="modal-label">Input amount of stock</p>
          <InputNumber min={1}
          max={Number.MAX_SAFE_INTEGER}
          value={changeStock} onChange={setChangeStock}
          />
        </div>
      </Modal>
      <Modal
        title="Transfer dorayaki to the other shop"
        visible={tfModal}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setTfModal(false);
          setChangeStock(1);
          setTfShopID(0);}
        }
        footer={
          [
            <Row key="1" style={{marginTop: '20px'}}>
              <Col span={12} className="flex">
                <Button
                type="primary"
                key="1"
                className="flex"
                onClick={() => {setTfModal(false); setChangeStock(1); setTfShopID(0);}}
                >
                  Cancel
                </Button>
              </Col>
              <Col span={12} className="flex justify-end">
                <Button
                type="primary"
                key="2"
                className="flex justify-between"
                onClick={() => handleTransferDorayaki()}
                >
                  Confirm
                </Button>
              </Col>
            </Row>
          ]
        }
      >
        <div className="modal-form">
          <Select
          onChange={(value) => {
            if (!value) setTfShopID(0);
            else setTfShopID(Number(value))}
          }
          value={!tfShopID ? undefined : tfShopID }
          allowClear
          showSearch
          placeholder="Search shop's name or id"
          className="search-bar"
          optionFilterProp="children"
          >
            {props.dataShop?.dataShop.data.map((shop: any, index:number) =>
              {return <Option
                value={shop.id}
                disabled={shop.id===Number(props.IDShop)}
                key={index}
                >
                  {`${shop.id} - ${shop.nama}`}
                </Option>}
            )}
          </Select>
        </div>
        <div className="modal-form">
          <p className="modal-label">Input amount of stock</p>
          <InputNumber min={Math.min(1, OGStock)}
          max={OGStock}
          value={changeStock} onChange={setChangeStock}
          />
        </div>
      </Modal>
      </div>
      
    }
    </section>
  </>
  )
}

export default PaginateDorayaki;