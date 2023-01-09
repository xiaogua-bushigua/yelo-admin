import axios from 'axios';

const service = axios.create({
	baseURL: 'https://mock.mengxuegu.com/mock/638d4e9b93a67b5f1066926f/admin',
	timeout: 80000,
});

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		config.headers = config.headers || {};
		if (localStorage.getItem('token')) {
			config.headers.token = localStorage.getItem('token') || '';
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

// 响应拦截器
service.interceptors.response.use(
	(res) => {
		return res.data;
	},
	(err) => {
		return Promise.reject(err);
	}
);

export default service;
