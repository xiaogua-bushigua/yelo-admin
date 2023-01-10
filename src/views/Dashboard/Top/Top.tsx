import React from 'react';
import cl from './top.module.scss';
import { Button } from 'antd';
import { AlertOutlined, GithubOutlined } from '@ant-design/icons';
import '@/language/config';
import { useTranslation } from 'react-i18next';

const Top = () => {
	const { t } = useTranslation();

	return (
		<div className={cl.topWrap}>
			<div className={cl.left}>
				<div className={cl.title}>{t('global.header.title')}</div>
				<div className={cl.introduction}>{t('global.header.introduction')}</div>
				<div className={cl.btns}>
					<Button type="primary" icon={<AlertOutlined />} className={cl.btn} href={'https://marmelab.com/react-admin-demo'}>
						{t('global.header.design')}
					</Button>
					<Button type="primary" icon={<GithubOutlined />} className={cl.btn} href={'https://github.com/xiaogua-bushigua/yelo-admin'}>
						{t('global.header.source')}
					</Button>
				</div>
			</div>
			<div className={cl.right}></div>
		</div>
	);
};

export default Top;
