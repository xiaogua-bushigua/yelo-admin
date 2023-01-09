import React from 'react';
import cl from './top.module.scss';
import { Button } from 'antd';
import { AlertOutlined, GithubOutlined } from '@ant-design/icons'

const Top = () => {
	return (
		<div className={cl.topWrap}>
			<div className={cl.left}>
				<div className={cl.title}>Welcome to the yelo-admin demo</div>
				<div className={cl.introduction}>
					This is the admin of an imaginary goods shop. Feel free to explore and modify the mocked data - it's local to your computer.
				</div>
				<div className={cl.btns}>
					<Button type="primary" icon={<AlertOutlined />} className={cl.btn} href={'https://marmelab.com/react-admin-demo'}>
            DESIGN PROTOTYPE
					</Button>
          <Button type="primary" icon={<GithubOutlined />} className={cl.btn} href={'https://github.com/xiaogua-bushigua/yelo-admin'}>
						SOURCE FOR THIS DEMO
					</Button>
				</div>
			</div>
			<div className={cl.right}>
      </div>
		</div>
	);
};

export default Top;
