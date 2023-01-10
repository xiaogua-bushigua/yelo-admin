import cl from './CustomersList.module.scss';
import Avatar from 'react-avatar';
import { axiosDashCustomers } from '@/store/modules/dashboard';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setBread, setSelectedNaviKey } from '@/store/modules/global';
import generateColors from '@/utils/generateColors';

const CustomersList = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(axiosDashCustomers());
	}, []);
	const names = useAppSelector((state) => state.dashboard.customersNames);
	return (
		<div className={cl.customersList}>
			{generateColors(names.length).map((color: string, index) => {
				return (
					<div
						className={cl.customerWrap}
						key={color + 'wrap' + index}
						onClick={() => {
							localStorage.setItem('navigate', 'customers');
              dispatch(setBread('customers'))
              dispatch(setSelectedNaviKey('customers'))
              const naviItems: HTMLCollection = document.getElementsByClassName('ant-menu-item')
              const reviewItem = naviItems[3] as HTMLElement
              reviewItem.click()
						}}
					>
						<Avatar name={names[index]} round size="42" color={color} key={color+'cus'} />
						<span className={cl.name}>{names[index]}</span>
					</div>
				);
			})}
		</div>
	);
};

export default CustomersList;
