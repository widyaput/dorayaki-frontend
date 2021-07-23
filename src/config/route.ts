
import AddDorayaki from '@/pages/AddDorayaki';
import ViewDorayaki from '@/pages/ViewDorayaki';
import EditDorayaki from '@/pages/EditDorayaki';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Dorayaki from '@/pages/Dorayaki';

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
    path: '/dorayakis',
    component: Dorayaki,
    exact: true,
  }
];
