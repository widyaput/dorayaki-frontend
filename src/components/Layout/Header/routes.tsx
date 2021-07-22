import React from 'react';
import { FiHome, } from 'react-icons/fi';
import { AiFillShopping } from 'react-icons/ai';
import { FaBreadSlice } from 'react-icons/fa';

import { NavItemProps } from './';

/**
 * Routes for header
 */
const routes: NavItemProps[] = [
  {
    icon: <FiHome />,
    name: 'Home',
    to: '/'
  },
  {
    icon: <AiFillShopping />,
    name: 'Shops',
    to: '/shops'
  },
  {
    icon: <FaBreadSlice />,
    name: 'Dorayakis',
    to: '/dorayakis'
  },
];

export default routes;
