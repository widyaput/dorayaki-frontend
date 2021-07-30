
import Dorayaki from '@/pages/Dorayaki';
import AddDorayaki from '@/pages/AddDorayaki';
import ViewDorayaki from '@/pages/ViewDorayaki';
import EditDorayaki from '@/pages/EditDorayaki';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Shop from '@/pages/Shop';
import AddShop from '@/pages/AddShop';
import EditShop from '@/pages/EditShop';
import ViewShop from '@/pages/ViewShop';
import Stock from '@/pages/Stocks';

export const route = [
  {
    path: '/login',
    component: Login,
    exact: true,
  }, {
    path: '/dorayakis/add',
    component: AddDorayaki,
    exact: true,
  }, {
    path: '/dorayakis/:id/edit',
    component: EditDorayaki,
    exact: true,
  }, {
    path: '/dorayakis/:id',
    component: ViewDorayaki,
    exact: true,
  },{
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/shops/add',
    component: AddShop,
    exact: true,
  },{
    path: '/shops/:id/edit',
    component: EditShop,
    exact: true,
  },{
    path: '/shops/:id/stocks',
    component: Stock,
    exact: true,
  },{
    path: '/shops/:id',
    component: ViewShop,
    exact: true,
  },{
    path: '/dorayakis',
    component: Dorayaki,
    exact: true,
  },
  {
    path: '/shops',
    component: Shop,
    exact: true,
  },
];
