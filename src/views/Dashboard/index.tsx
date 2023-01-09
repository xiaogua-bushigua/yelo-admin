import cl from './dashboard.module.scss';
import Top from './Top/Top';
import Card from '@/components/Card/Card';
import CustomersList from './CustomersList/CustomersList';
import ReviewsList from './ReviewsList/ReviewsList';
import OrderList from './OrderList/OrderList';
import RevenueChart from './RevenueChart/RevenueChart';

const Dashboard = () => {
	return (
		<div className={cl.dashboardWrap}>
			<Top></Top>
			<div className={cl.dashboardContent}>
				<div className={cl.card}>
					<Card title="Yearly Revenue" content="RMB￥10001"></Card>
				</div>
				<div className={cl.card}>
					<Card title="New Orders" content="67"></Card>
				</div>

				<div className={cl.rest}>
					<div className={cl.chart}>
						<RevenueChart></RevenueChart>
					</div>
					<div className={cl.order}>
						<OrderList></OrderList>
					</div>
				</div>

				<div className={cl.card}>
					<Card title="Pending Reviews" content="12" borderBottom={0}></Card>
					<ReviewsList></ReviewsList>
				</div>
				<div className={cl.card}>
					<Card title="New Customers" content="40" borderBottom={0}></Card>
					<CustomersList></CustomersList>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
