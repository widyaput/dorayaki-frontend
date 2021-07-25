import React from 'react';

import { Button, Typography } from 'antd';

import { Link } from 'react-router-dom';

import AuthLayout from '@/components/Layout/Auth';
import { getDorayakis } from './service';
import { Helmet } from 'react-helmet';
import { AiFillPlusCircle } from 'react-icons/ai';
import PaginateDorayaki from '@/components/PaginateDorayaki';

const Dorayaki: React.FC = () => {
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
      <PaginateDorayaki isViewStock={false} getFunction={getDorayakis} IDShop={0} />
    </main>
  </AuthLayout>) 
}

export default Dorayaki;