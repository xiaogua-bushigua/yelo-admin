import React, { useEffect } from 'react';
import cl from './configuration.module.scss';
import { Button } from 'antd';
import { setBread } from '@/store/modules/global';
import { useAppSelector, useAppDispatch } from '@/store/hooks';

const Configuration = () => {
	const dispatch = useAppDispatch();
  // !!!! 为什么要放进 useEffect 里
	useEffect(() => {
		dispatch(setBread('Configuration'));
	}, []);

	return (
		<div className={cl.configuration}>
			<div className={cl.item}>
				<span>Theme</span>
				<div>
					<Button type="primary" className={`${cl.btn} ${cl.btn1}`}>
						LIGHT
					</Button>
					<Button type="primary" className={`${cl.btn} ${cl.btn2}`}>
						DARK
					</Button>
				</div>
			</div>
			<div className={cl.item}>
				<span>Language</span>
				<div>
					<Button type="primary" className={`${cl.btn} ${cl.btn1}`}>
						ENGLISH
					</Button>
					<Button type="primary" className={`${cl.btn} ${cl.btn2}`}>
						简体中文
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Configuration;
