import React from 'react';
import swr, { mutate } from 'swr';
import { Alert, Button, Image, Input, Table } from 'antd';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { usePagination } from '@/hooks/usePagination';
import { useSearch } from '@/hooks/useSearch';
import { useSorter } from '@/hooks/useSorter';
import axios from '@/modules/axios';
import { DEFAULT_DATE_FORMAT } from '@/config/default';
import { tableResponse } from '@/services/table';

interface Props {
  isViewStock: boolean,
  IDShop: number,
  getFunction: (...params: any) => any,
}

const PaginateDorayaki: React.FC<Props> = (props: Props) => {
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
  
  const handleSearch = (value: string) => {
    setSearch(value);
    setPagination({current: 1, pageSize: 10});
  }

  const columnDorayaki: any = [
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

  const columnStok: any = [
    {
      title: (): JSX.Element => <b>Dorayaki ID</b>,
      dataIndex: 'dorayaki_id',
      width:'10%',
      render: (id: string): JSX.Element => <p className="text-center">{id}</p>
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
      render: (time: number): JSX.Element => <p>{format(new Date(time*1000), DEFAULT_DATE_FORMAT)}</p>,
      sorter: {
        multiple: 2
      },
      defaultSortOrder: 'descend',
      sortDirections: ['ascend', 'descend', 'ascend']
    }, {
      title: (): JSX.Element => <b>Stock</b>,
      dataIndex: 'stok',
      render: (stok: number): JSX.Element => <p>{stok}</p>,
      sorter: {
        multiple: 3
      },
      defaultSortOrder: 'descend',
      sortDirections: ['ascend', 'descend', 'ascend']
    }
  ];

  const content = () => {
    if (error) <Alert message={error.message} type="error" />;

    const { tableData, pagination } = tableResponse(data);
    return (
      <Table
        rowKey={!props.isViewStock ? (entry:any) => entry.id : (entry: any) => entry.dorayaki_id}
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
    <Input.Search
      placeholder="Input dorayaki's flavor"
      onSearch={handleSearch}
      className="search-bar"
      enterButton
      allowClear
      />
    <section className="list-section-main">
      {content()}
    </section>
  </>
  )
}

export default PaginateDorayaki;