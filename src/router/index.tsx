import { lazy, Suspense } from 'react';
import Loading from '@/components/Loading';

const Login = lazy(() => import('@/views/Login'));
const Home = lazy(() => import('@/views/Home'));
const Dashboard = lazy(() => import('@/views/Dashboard'));

const Sales = lazy(() => import('@/views/Sales'));
const Orders = lazy(() => import('@/views/Sales/Orders'));
const Invoices = lazy(() => import('@/views/Sales/Invoices'));
const OrdersInfo = lazy(()=>import('@/views/Sales/Orders/OrdersInfo/OrdersInfo'))

const Customers = lazy(() => import('@/views/Customers'));
const CustomersTable = lazy(() => import('@/views/Customers/CustomerPage'));
const CustomersInfo = lazy(() => import('@/views/Customers/InfoPage'));
const CustomersCreate = lazy(() => import('@/views/Customers/CreatePage'));

const Reviews = lazy(() => import('@/views/Reviews'));
const Configuration = lazy(() => import('@/views/Configuration'));
  
const lazyLoading = (child: JSX.Element) => (
	<Suspense fallback={<Loading></Loading>}>{child}</Suspense>
);

const routes = [
	{
		path: '/login',
		element: lazyLoading(<Login />),
	},
	{
		path: '/',
		element: lazyLoading(<Home />),
		children: [
			{
				path: '/dashboard',
				element: lazyLoading(<Dashboard />),
			},
			{
				path: '/sales',
				element: lazyLoading(<Sales />),
				children: [
					{
						path: '/sales/orders',
						element: lazyLoading(<Orders />),
					},
          {
            path: '/sales/orders/info',
            element: lazyLoading(<OrdersInfo />),
          },
					{
						path: '/sales/invoices',
						element: lazyLoading(<Invoices />),
					},
				],
			},
			{
				path: '/customers',
				element: lazyLoading(<Customers />),
				children: [
					{
						path: '/customers',
						element: lazyLoading(<CustomersTable />),  
					},
					{
						path: '/customers/info',
						element: lazyLoading(<CustomersInfo />),
					},
          {
						path: '/customers/create',
						element: lazyLoading(<CustomersCreate />),
					},
				],
			},
			{
				path: '/reviews',
				element: lazyLoading(<Reviews />),
			},
			{
				path: '/configuration',
				element: lazyLoading(<Configuration />),
			},
		],
	},
];

export default routes;
