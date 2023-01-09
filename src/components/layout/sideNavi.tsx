import React, { useState } from 'react';
import {
	DashboardOutlined,
	PropertySafetyOutlined,
	TeamOutlined,
	BarsOutlined,
	DollarCircleFilled,
	HddFilled,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import cl from './sideNavi.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setBread } from '@/store/modules/global';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group'
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem('Dashboard', 'dashboard', <DashboardOutlined />),
	getItem('Sales', 'sales', <PropertySafetyOutlined />, [
		getItem('Orders', 'sales/orders', <DollarCircleFilled />),
		getItem('Invoices', 'sales/invoices', <HddFilled />),
	]),
	getItem('Customers', 'customers', <TeamOutlined />),
	getItem('Reviews', 'reviews', <BarsOutlined />),
];

const sideNavi = () => {
	const navigateTo = useNavigate();
	const dispatch = useAppDispatch();
	const collapsed = useAppSelector((state) => state.global.collapsed);
	const selectedNaviKey = useAppSelector((state) => state.global.selectedNaviKey);
	const [openKeys, setOpenKeys] = useState(['sales']);
	const rootSubmenuKeys = ['customers', 'sales'];
	// 展开关闭导航菜单中的父项
	const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};
	// 选中菜单中的一项
	const handleSelect = (item: MenuItem) => {    
		navigateTo('/' + item?.key);
		localStorage.setItem('navigate', String(item?.key));
		dispatch(setBread(localStorage.getItem('navigate') as string));
	};
	return (
		<div className={cl.menuWrap}>
			<Menu
				className={cl.Menu}
				defaultSelectedKeys={[
					selectedNaviKey
				]}
				defaultOpenKeys={['sales']}
				openKeys={openKeys}
				onOpenChange={onOpenChange}
				onSelect={handleSelect}
				mode="inline"
				theme="light"
				inlineCollapsed={collapsed}
				items={items}
			/>
		</div>
	);
};

export default sideNavi;
