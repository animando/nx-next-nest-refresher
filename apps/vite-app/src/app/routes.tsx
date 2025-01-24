import { Home } from './home';
import { Transactions } from './transactions/transactions';

export const routes = [
  {
    title: 'Home',
    path: '/',
    component: Home,
  },
  {
    title: 'Transactions',
    path: '/transactions',
    component: Transactions,
  },
];
