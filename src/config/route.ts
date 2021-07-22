
import AddDorayaki from '@/pages/AddDorayaki';
import Dorayaki from '@/pages/Dorayaki';
import EditDorayaki from '@/pages/EditDorayaki';
import Home from '@/pages/Home';
import Login from '@/pages/Login';

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
    component: Dorayaki,
    exact: true,
  },{
    path: '/',
    component: Home,
    exact: true,
  }, 
];
