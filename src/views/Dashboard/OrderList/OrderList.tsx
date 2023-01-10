import { useEffect } from 'react';
import cl from './OrderList.module.scss';
import { axiosDashOrders } from '@/store/modules/dashboard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Avatar from 'react-avatar';
import generateColors from '@/utils/generateColors';
import { setBread, setSelectedNaviKey } from '@/store/modules/global';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
	const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
	useEffect(() => {
		dispatch(axiosDashOrders());
	}, []);
	const info = useAppSelector((state) => state.dashboard.ordersContent);
	return (
		<div className={cl.ordersList}>
			<div className={cl.Title}>Pending Orders</div>
			{generateColors(info.length).map((color, index) => (
				<div
					className={cl.orderWrap}
					key={color + 'ord' + index}
					onClick={() => {
						localStorage.setItem('navigate', 'sales/orders');
						dispatch(setBread('sales/orders'));
						dispatch(setSelectedNaviKey('sales/orders'));
            const naviItems: HTMLCollection = document.getElementsByClassName('ant-menu-item')
            const reviewItem = naviItems[1] as HTMLElement
            reviewItem.click()
					}}
				>
					<div className={cl.left}>
						<Avatar name={info[index].name} round size="42" color={color} />
						<div className={cl.leftText}>
							<div className={cl.date}>{info[index].date}</div>
							<div className={cl.name}>
								by {info[index].name.replace(' ', '')}， {info[index].items} {info[index].items == 1 ? 'item' : 'items'}
							</div>
						</div>
					</div>
					<div className={cl.money}>￥ {info[index].money}</div>
				</div>
			))}
		</div>
	);
};

export default OrderList;
