import { useEffect } from 'react';
import cl from './configuration.module.scss';
import { Button } from 'antd';
import { setBread } from '@/store/modules/global';
import { useAppDispatch } from '@/store/hooks';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

const Configuration = () => {
	const dispatch = useAppDispatch();
  const navigateTo = useNavigate()
  const { i18n } = useTranslation();
	useEffect(() => {
		dispatch(setBread('Configuration'));
	}, []);
  const handleTranslate = (lang: string)=>{
    i18n.changeLanguage(lang)
    navigateTo('/dashboard')
  }

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
					<Button type="primary" className={`${cl.btn} ${cl.btn1}`} onClick={handleTranslate.bind(this, 'en')}>
						ENGLISH
					</Button>
					<Button type="primary" className={`${cl.btn} ${cl.btn2}`} onClick={handleTranslate.bind(this, 'zh')}>
						简体中文
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Configuration;
