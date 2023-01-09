import {
	ClockCircleOutlined,
	MoneyCollectOutlined,
	BookOutlined,
	StarFilled,
} from '@ant-design/icons';
import cl from './historyInfo.module.scss';
import { useAppSelector } from '@/store/hooks';
import { orderType } from '@/types/customer';

function createComparisonFunction(name: string) {
	return function (object1: any, object2: any) {
		if (new Date(object1[name]) > new Date(object2[name])) {
			return 1;
		} else {
			return -1;
		}
	};
}

const HistoryInfo = () => {
	const clickedRowData = localStorage.getItem('customerClickedTableData')
		? JSON.parse(localStorage.getItem('customerClickedTableData')!).data
		: useAppSelector((state) => state.customers.clickedTableData);
	let reviewAndOrder: Array<orderType> = [...clickedRowData.ordersInfo];
	reviewAndOrder = reviewAndOrder.sort(createComparisonFunction('date'));

	return (
		<div>
			<div className={cl.historyWrap}>
				<div className={cl.historyTitle}>History</div>
				<div className={cl.historyInfo}>
					<div className={cl.infoRowWrap}>
						<div className={cl.seenWrap}>
							<div className={cl.seen}>
								<ClockCircleOutlined
									className={cl.historyIcons}
								/>
								First seen
							</div>
							<div className={cl.seenTime}>
								{clickedRowData.baseHistory.firstSeen}
							</div>
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
								<ClockCircleOutlined
									className={cl.historyIcons}
								/>
								Last seen
							</div>
							<div className={cl.seenTime}>
								{clickedRowData.baseHistory.lastSeen}
							</div>
						</div>
						<div className={cl.other}>
							<BookOutlined className={cl.historyIcons} />
							{clickedRowData.ordersInfo.length} reviews
						</div>
					</div>
				</div>
			</div>

			{reviewAndOrder.map((item) => (
				<div className={cl.reviewsWrap} key={item.reviewId}>
					<div className={cl.reviewTitle}>
						<BookOutlined className={cl.reviewIcon} />
						<strong>{item.date}</strong>
					</div>
					<div className={cl.reviewContent}>
						<span className={cl.reviewLink}>
							REVIEW on poster "{item.product}"
						</span>
						<div className={cl.reviewStatus}>
							{new Array(Number(item.rating))
								.fill('')
								.map((item, index) => (
									<StarFilled
										className={cl.reviewStars}
										key={item.reviewId + '_icon' + index}
									/>
								))}
						</div>
						<div className={cl.reviewText}>{item.comment}</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default HistoryInfo;
