
import AddDorayaki from '@/pages/AddDorayaki';
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
  },{
    path: '/',
    component: Home,
    exact: true,
  }, 
];
