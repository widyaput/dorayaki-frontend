import React from 'react';
import swr from 'swr';
import { Alert, Button, Input, Table, Typography } from 'antd';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { CgDetailsMore } from 'react-icons/cg';

import AuthLayout from '@/components/Layout/Auth';
import { usePagination } from '@/hooks/usePagination';
import { useSearch } from '@/hooks/useSearch';
import { useSorter } from '@/hooks/useSorter';
import axios from '@/modules/axios';
import { getShops } from './service';
import { DEFAULT_DATE_FORMAT } from '@/config/default';
import { tableResponse } from '@/services/table';
import { Helmet } from 'react-helmet';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useEffect } from 'react';

const Shop: React.FC = () => {
  const { page, perPage, setPagination } = usePagination();
  const { search: kecamatan, setSearch: setKecamatan } = useSearch();
  const { search: provinsi, setSearch: setProvinsi } = useSearch();
  const { sortParams, setSorter } = useSorter([{field: 'created_at', order: 'descend'}]);
  const { key, fetcher } = getShops(axios, page, perPage, kecamatan, provinsi, sortParams);
  const { data, error } = swr(key, fetcher);
  const handleTableChange = (pagination: any, _: any, sorter: any) => {
    setPagination(pagination);
    setSorter(sorter);
  }
  
  useEffect(() => {
    setPagination({current: 1, pageSize: 10});
  }, [kecamatan,provinsi])

  const column: any = [
    {
      title: (): JSX.Element => <b>Shop ID</b>,
      dataIndex: 'id',
      width:'10%',
      render: (id: string): JSX.Element => <p className="text-center">{id}</p>
    },
    {
      title: (): JSX.Element => <b>Name</b>,
      dataIndex: 'nama',
      render: (name: string): JSX.Element => <p>{name}</p>
    },
    {
      title: (): JSX.Element => <b>Address</b>,
      dataIndex: 'jalan',
      render: (jalan: string): JSX.Element => <p>{jalan}</p>
    },
    {
      title: (): JSX.Element => <b>Sub-District</b>,
      dataIndex: 'kecamatan',
      render: (kec: string): JSX.Element => <p>{kec}</p>
    },
    {
      title: (): JSX.Element => <b>Province</b>,
      dataIndex: 'provinsi',
      render: (prov: string): JSX.Element => <p>{prov}</p>
    },
    {
      title: (): JSX.Element => <b>Added at</b>,
      dataIndex: 'created_at',
      render: (time: number): JSX.Element => <p>{format(new Date(time*1000), DEFAULT_DATE_FORMAT)}</p>,
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
              <Link to={`/shops/${row.id}`}>
                <Button type="primary" icon={<CgDetailsMore/>}>
                  Details
                </Button>
              </Link>
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
        rowKey={(entry:any) => entry.id}
        dataSource={tableData}
        columns={column}
        pagination= {pagination}
        loading={!data}
        onChange={handleTableChange}
        size="large"
        bordered={true}/>
    )
  }
  return (<AuthLayout>
    <Helmet>
      <title>WeeDorayaki | Shops</title>
    </Helmet>
    <main>
      <section className="flex justify-between mb-10">
        <Typography.Title level={1}>
          List of Shops
        </Typography.Title>
        <div>
          <Link to={'/shops/add'}>
            <Button type="primary" size="large">
              <AiFillPlusCircle size={16} />
                Add new shop
            </Button>
          </Link>
        </div>
      </section>
      <Input.Group compact>
        <Input
        style={{width: '50%'}}
        allowClear
        placeholder="Input shop's subdistrict"
        className="search-bar"
        onChange={(e) => setKecamatan(e.target.value)}
        />
        <Input
        style={{width: '50%'}}
        allowClear
        placeholder="Input shop's province"
        className="search-bar"
        onChange={(e) => setProvinsi(e.target.value)}
        />
      </Input.Group>
      <section className="list-section-main">
        {content()}
      </section>
    </main>
  </AuthLayout>) 
}

export default Shop;