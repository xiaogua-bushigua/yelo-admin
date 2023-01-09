import router from '@/router';
import cl from './index.module.scss';
import { useEffect } from 'react';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';

function ToDashboard() {
	const navigateTo = useNavigate();
	useEffect(() => {
		navigateTo('/dashboard');
	}, []);
	return <div></div>;
}

function ToLogin() {
	const navigateTo = useNavigate();
	useEffect(() => {
		navigateTo('/login');
	}, []);
	return <div></div>;
}

function BeforeRouterEnter() {
	const outlet = useRoutes(router);
	const location = useLocation();
	let token = localStorage.getItem('token');
	if (token && location.pathname === '/login') {
		return <ToDashboard></ToDashboard>;
	}
	if (!token && location.pathname !== '/login') {
		return <ToLogin></ToLogin>;
	}
	return outlet;
}

function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
          // ant design组件的样式基色
					colorPrimary: '#4e3cc9',
				},
			}}
		>
			<div className={cl.App}>
				<BeforeRouterEnter></BeforeRouterEnter>
			</div>
		</ConfigProvider>
	);
}

export default App;
