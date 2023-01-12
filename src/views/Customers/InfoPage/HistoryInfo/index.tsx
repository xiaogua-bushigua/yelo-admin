import { ClockCircleOutlined, MoneyCollectOutlined, BookOutlined, StarFilled, ShoppingCartOutlined } from '@ant-design/icons';
import cl from './historyInfo.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { reviewType } from '@/types/customer';
import { axiosSales } from '@/store/modules/sales';
import { useEffect } from 'react';
import { salesType, buyItemsType } from '@/types/sales';

function compareDate() {
	return function (object1: any, object2: any) {
		if (new Date(object1['date']) > new Date(object2['date'])) {
			return 1;
		} else {
			return -1;
		}
	};
}

const colorPanel = {
	ordered: '#86C166',
	delivered: '#E2943B',
	canceled: '#D0104C',
};

const HistoryInfo = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(axiosSales());
	}, []);
	const clickedRowData = localStorage.getItem('customerClickedTableData')
		? JSON.parse(localStorage.getItem('customerClickedTableData')!).data
		: useAppSelector((state) => state.customers.clickedTableData);
	const salesData = localStorage.getItem('saleDataSource')
		? JSON.parse(localStorage.getItem('saleDataSource')!).data
		: useAppSelector((state) => state.sales.dataSource.data);
	const orders = salesData.filter((item: salesType) => item.customerId === clickedRowData.customerId)[0];

	let reviewAndOrder: { review: Array<reviewType>; order: Array<buyItemsType> } = {
		review: [...clickedRowData.ordersInfo].sort(compareDate()),
		order: [...orders.buyItems],
	};

	return (
		<div>
			<div className={cl.historyWrap}>
				<div className={cl.historyTitle}>History</div>
				<div className={cl.historyInfo}>
					<div className={cl.infoRowWrap}>
						<div className={cl.seenWrap}>
							<div className={cl.seen}>
								<ClockCircleOutlined className={cl.historyIcons} />
								First seen
							</div>
							<div className={cl.seenTime}>{clickedRowData.baseHistory.firstSeen}</div>
						</div>
						<div className={cl.other}>
							<MoneyCollectOutlined className={cl.historyIcons} />
							{clickedRowData.baseHistory.ordersNum} orders
						</div>
					</div>
				</div>

				<div className={cl.historyInfo}>
					<div className={cl.infoRowWrap}>
						<div className={cl.seenWrap}>
							<div className={cl.seen}>
								<ClockCircleOutlined className={cl.historyIcons} />
								Last seen
							</div>
							<div className={cl.seenTime}>{clickedRowData.baseHistory.lastSeen}</div>
						</div>
						<div className={cl.other}>
							<BookOutlined className={cl.historyIcons} />
							{clickedRowData.ordersInfo.length} reviews
						</div>
					</div>
				</div>
			</div>

			{reviewAndOrder.review.map((item) => (
				<div className={cl.reviewsWrap} key={item.reviewId}>
					<div className={cl.reviewTitle}>
						<BookOutlined className={cl.reviewIcon} />
						<strong>{item.date}</strong>
					</div>
					<div className={cl.reviewContent}>
						<span className={cl.reviewLink}>REVIEW on "{item.product}"</span>
						<div className={cl.reviewStatus}>
							{new Array(Number(item.rating)).fill('').map((item, index) => (
								<StarFilled className={cl.reviewStars} key={item.reviewId + '_icon' + index} />
							))}
						</div>
						<div className={cl.reviewText}>{item.comment}</div>
					</div>
				</div>
			))}

			{reviewAndOrder.order.map((item, index) => (
				<div className={cl.orderWrap} key={index}>
					<div className={cl.orderTitle}>
						<ShoppingCartOutlined className={cl.orderIcon} />
						<strong>{item.product}</strong>
					</div>

					<div className={cl.orderContent}>
						<div className={cl.r1}>
							<span className={cl.sonContent} style={{color: `${colorPanel[item.status as keyof typeof colorPanel]}`}}>{item.status}</span>
						</div>
						<div className={cl.r2}>
							<div style={{width: 150}}>
								<span className={cl.sonTitle}>unit price: </span>
								<span className={cl.sonContent}>￥{item.unitPrice}</span>
							</div>
              <div>
								<span className={cl.sonTitle}>quantity: </span>
								<span className={cl.sonContent}>{item.quantity}</span>
							</div>
						</div>
            <div className={cl.r3}>
							<div style={{width: 150}}>
								<span className={cl.sonTitle}>taxe: </span>
								<span className={cl.sonContent}>￥{item.taxe}</span>
							</div>
              <div>
								<span className={cl.sonTitle}>total: </span>
								<span className={cl.sonContent}>￥{item.totalSolo}</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default HistoryInfo;
