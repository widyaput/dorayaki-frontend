import React from 'react';
import { Helmet } from 'react-helmet';

import Auth from '@/components/Layout/Auth';
import ShopMutate from '@/components/ShopMutate';

const AddShop: React.FC = () => {
  return (
    <Auth>
      <Helmet>
        <title>WeeDorayaki | Add Shop</title>
      </Helmet>
      <ShopMutate isAdd={true} ID={0} Nama="" Jalan="" Kecamatan="" Provinsi=""/>
    </Auth>
  )
}

export default AddShop;