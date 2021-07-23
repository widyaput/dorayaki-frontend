import React, { useState } from 'react';
import swr from 'swr';
import { Alert, Button, Image, Input, Table, Typography } from 'antd';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import AuthLayout from '@/components/Layout/Auth';
import { usePagination } from '@/hooks/usePagination';
import { useSearch } from '@/hooks/useSearch';
import { useSorter } from '@/hooks/useSorter';
import axios from '@/modules/axios';
import { getDorayakis } from './service';
import { DEFAULT_DATE_FORMAT } from '@/config/default';
import { tableResponse } from '@/services/table';
import { Helmet } from 'react-helmet';
import { AiFillPlusCircle } from 'react-icons/ai';

const Dorayaki: React.FC = () => {
  const { page, perPage, setPagination } = usePagination();
  const { search, setSearch } = useSearch();
  const { sortParams, setSort } = useSorter([{field: 'created_at', order: 'descend'}]);
  const { key, fetcher } = getDorayakis(axios, page, perPage, search, sortParams);
  const { data, error } = swr(key, fetcher);
  const handleTableChange = (pagination: any, _: any, sorter: any) => {
    setPagination(pagination);
    setSort(sorter);
  }

  const handleSearch = (value: string) => {
    setPagination({current: 1, pageSize: 10});
    setSearch(value);
  }

  const column: any = [
    {
      title: (): JSX.Element => <b>Dorayaki ID</b>,
      dataIndex: 'id',
      width:'10%',
      render: (id: string): JSX.Element => <p className="text-center">{id}</p>
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
              <Link to={`/dorayakis/${row.id}`}>
                <Button type="primary">
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
      <title>WeeDorayaki | Dorayakis</title>
    </Helmet>
    <main>
      <section className="flex justify-between mb-10">
        <Typography.Title level={1}>
          List of Dorayakis
        </Typography.Title>
        <div>
          <Link to={'/dorayakis/add'}>
            <Button type="primary" size="large">
              <AiFillPlusCircle size={16} />
                Add new dorayaki
            </Button>
          </Link>
        </div>
      </section>
      <Input.Search
        placeholder="Input dorayaki's flavor"
        onSearch={handleSearch}
        className="search-bar"
        />
      <section className="list-section-main">
        {content()}
      </section>
    </main>
  </AuthLayout>) 
}

export default Dorayaki;