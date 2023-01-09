import { useState, MouseEvent } from 'react';
import cl from './topHeader.module.scss';
import { Button } from 'antd';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setCollapsed } from '@/store/modules/global';
import { MenuFoldOutlined, MenuUnfoldOutlined, ControlFilled, CloseCircleFilled } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import Highcharts from 'highcharts';

const topHeader = () => {
	const dispatch = useAppDispatch();
	const navigateTo = useNavigate();
	const collapsed = useAppSelector((state) => state.global.collapsed);
	const bread = useAppSelector((state) => state.global.bread);
  const width = useAppSelector(state=>state.dashboard.width)
	// 头像下拉项的展开关闭
	const [userCollapsed, setUserCollapsed] = useState(true);
	// 展开关闭菜单导航
	const toggleCollapsed = () => {
		dispatch(setCollapsed());
    // 使得highChart能够响应式的变换宽度
		let w = 0
		if (collapsed) w = width;
    // 70是侧边导航的宽度
		else w = width + 70;
		Highcharts.charts[0]!.setSize(w);
	};
	// 当点击下拉框之外的区域触发它的展开关闭
	document.addEventListener('click', () => {
		if (!userCollapsed) setUserCollapsed(true);
	});
	// 头像点击
	const handleBtnClick = (e: MouseEvent) => {
		e.nativeEvent.stopImmediatePropagation();
		setUserCollapsed(!userCollapsed);
	};
	// 登出
	const handleLogoutClick = (e: MouseEvent) => {
		e.nativeEvent.stopImmediatePropagation();
    localStorage.clear()
		setUserCollapsed(true);
		navigateTo('/login');
	};
	// 配置
	const handleConfigurationClick = (e: MouseEvent) => {
		e.nativeEvent.stopImmediatePropagation();
		setUserCollapsed(true);
		navigateTo('/configuration');
	};
	return (
		<div className={cl.topWrap}>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Button type="primary" onClick={toggleCollapsed} className={cl.naviBtn}>
					{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</Button>
				<div className={cl.bread}>
					<span>{bread[0].toUpperCase() + bread.slice(1).split('/')[0]}</span>
					<span
						className={cl.divider}
						style={{
							display: bread.split('/')[1] ? 'inline-block' : 'none',
						}}
					>
						/
					</span>
					<span className={cl.second}>{bread.split('/')[1]}</span>
				</div>
			</div>

			<div className={cl.topTitle}>Managerial System</div>

			<div className={cl.user}>
				<Button className={cl.btn} onClick={handleBtnClick}>
					<Avatar
						src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
						style={{
							width: 32,
							height: 32,
							marginRight: '10px',
							border: '1px solid rgb(199,199,199)',
						}}
					/>
					<span className={cl.userName}>{localStorage.getItem('username')}</span>
				</Button>
				<div className={`${cl.moreInfo} ${userCollapsed ? '' : cl.moreInfoActive}`}>
					<div className={cl.info} onClick={handleConfigurationClick}>
						<ControlFilled />
						<span>Configuration</span>
					</div>
					<div className={cl.info} onClick={handleLogoutClick}>
						<CloseCircleFilled />
						<span>Logout</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default topHeader;
