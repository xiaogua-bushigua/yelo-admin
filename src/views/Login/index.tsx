import cl from './index.module.scss';
import { Avatar, notification } from 'antd';
import Input from '@/components/Input';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { axiosLogin, setName, setPwd } from '@/store/modules/login';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
	const dispatch = useAppDispatch();
	const navigateTo = useNavigate();
	const username = useAppSelector((state) => state.login.username);
	const password = useAppSelector((state) => state.login.password);
	const [uborderStyle, setuBorderStyle] = useState('');
	const [pborderStyle, setpBorderStyle] = useState('');
	const [api, contextHolder] = notification.useNotification();

	const handleLogin = (placement: NotificationPlacement) => {
		if (!username || !password) {
      setuBorderStyle('2px solid #4e3cc9');
			setpBorderStyle('2px solid #4e3cc9');
			if (!username) {
				setuBorderStyle('2px solid #D0104C');
			}
			if (!password) {
				setpBorderStyle('2px solid #D0104C');
			}
			api.error({
				message: `登陆提示`,
				description: '密码或数字不能为空！',
				placement,
			});
		} else {
			setuBorderStyle('2px solid #4e3cc9');
			setpBorderStyle('2px solid #4e3cc9');
			dispatch(axiosLogin());
			let interval = setInterval(() => {
				if (localStorage.getItem('token')) {
					clearInterval(interval);
					navigateTo('/dashboard');
				}
			}, 0);
		}
	};
	const handleNameChange = (val: string) => {
		dispatch(setName(val));
	};
	const handlePwdChange = (val: string) => {
		dispatch(setPwd(val));
	};
	return (
		<div className={cl.back}>
			<div className={cl.backLogo}></div>
			<div className={cl.backWrap}>
				<div className={cl.backImg}>
					<div className={cl.img}></div>
				</div>
				<div className={cl.backForm}>
					<div className={cl.Icon}>
						<Avatar
							src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
							style={{
								width: 50,
								height: 50,
								marginBottom: '10px',
								border: '1px solid rgb(199,199,199)',
							}}
						/>
						<div>admin / 123456</div>
					</div>
					<Input
						inputType="Username"
						mode="moveTitle"
						change={handleNameChange}
            borderStyle={uborderStyle}
					/>
					<Input
						inputType="Password"
						mode="moveTitle"
						change={handlePwdChange}
            borderStyle={pborderStyle}
					/>
					{contextHolder}
					<button
						className={cl.btn}
						onClick={handleLogin.bind(this, 'topRight')}
					>
						Sign In
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
