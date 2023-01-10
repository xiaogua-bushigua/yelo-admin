import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useState, useEffect } from 'react';
import cl from './OrdersInfo.module.scss';
import { axiosGetPersonalInfo, saveInfo, delInfo } from '@/store/modules/sales';
import Select from '@/components/Select';
import type { ColumnsType } from 'antd/es/table';
import { Table, Button, Modal } from 'antd';
import { DeleteFilled, SaveFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface itemsDataType {
	key?: number;
	product: string;
	unitPrice: number;
	quantity: number;
	total: number;
	status: string;
}

const OrdersInfo = () => {
	const navigateTo = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(axiosGetPersonalInfo());
	}, []);

	const [statusChanges, setStatusChanges] = useState({});
	const [saveClass, setSaveClass] = useState(`${cl.botIcons} ${cl.saveIcon}`);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const orderClickedRowInfo = localStorage.getItem('orderClickedRowInfo')
		? JSON.parse(localStorage.getItem('orderClickedRowInfo')!).data
		: useAppSelector((state) => state.sales.orderClickedRowInfo);
	const orderClickedRowPersonalInfo = useAppSelector((state) => state.sales.orderClickedRowPersonalInfo);

	const columns: ColumnsType<itemsDataType> = [
		{
			title: 'Reference',
			dataIndex: 'product',
			width: 120,
		},
		{
			title: 'Unit price',
			dataIndex: 'unitPrice',
			width: 110,
			render: (text: number) => <span>￥{text}</span>,
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			width: 110,
		},
		{
			title: 'Total',
			dataIndex: 'total',
			width: 110,
			render: (text: number) => <span>￥{text}</span>,
		},
		{
			title: 'Status',
			dataIndex: 'status',
			width: 140,
			render: (text: string, record) => (
				<Select
					item="Status"
					list={['canceled', 'ordered', 'delivered', 'unknown']}
					width="120"
					height={42}
					titleHeight={12}
					change={handleStatusChange.bind(this, String(record.key))}
					defaultVal={text}
				></Select>
			),
		},
	];
	const handleStatusChange = (key: string, val: string) => {
		setSaveClass(`${cl.botIcons} ${cl.saveIcon} ${cl.saveActived}`);
		setStatusChanges({ ...statusChanges, [key]: val });
	};
	const handleSaveClick = () => {
		if (saveClass === `${cl.botIcons} ${cl.saveIcon} ${cl.saveActived}`) {
			setIsModalOpen(true);
			dispatch(saveInfo(statusChanges));
			navigateTo('/sales/orders');
		}
	};
	const handleDeleteClick = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		dispatch(delInfo());
		navigateTo('/sales/orders');
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<div className={cl.wrap}>
				<div className={cl.infoWrap}>
					<div className={cl.order} style={{ marginRight: 74 }}>
						<div className={cl.rowTitle}>Order</div>
						<div style={{ display: 'flex' }}>
							<div className={cl.colContent}>
								<div className={cl.contentWrap}>
									<div className={cl.sonTitle}>Date</div>
									<div className={cl.content}>{orderClickedRowInfo.date}</div>
								</div>

								<div className={cl.contentWrap}>
									<div className={cl.sonTitle}>Order Id</div>
									<div className={cl.content}>{orderClickedRowInfo.orderCode}</div>
								</div>
							</div>
						</div>
					</div>
					<div className={cl.customer}>
						<div className={cl.rowTitle}>Customer</div>
						<div style={{ display: 'flex' }}>
							<div className={cl.colContent}>
								<div className={cl.contentWrap}>
									<div className={cl.sonTitle}>Customer</div>
									<div className={cl.content}>{orderClickedRowInfo.customer}</div>
								</div>

								<div className={cl.contentWrap}>
									<div className={cl.sonTitle}>Phone number</div>
									<div className={cl.content}>{orderClickedRowPersonalInfo.phoneNumber}</div>
								</div>
							</div>
							<div className={cl.colContent}>
								<div className={cl.contentWrap}>
									<div className={cl.sonTitle}>Shipping address</div>
									<div className={cl.content}>{orderClickedRowInfo.address}</div>
								</div>
								<div className={cl.contentWrap}>
									<div className={cl.sonTitle}>Email</div>
									<div className={cl.content}>{orderClickedRowPersonalInfo.email}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={cl.infoWrap}>
					<div className={cl.items} style={{ marginTop: 20 }}>
						<div className={cl.rowTitle}>Items</div>
						<Table
							columns={columns}
							dataSource={orderClickedRowInfo.buyItems
								.map((item: any, index: any) => {
									return {
										product: item.product,
										unitPrice: item.unitPrice,
										quantity: item.quantity,
										total: item.totalSolo,
										status: item.status,
										key: index,
									};
								})
								.filter((i: any) => i.status === localStorage.getItem('nowMenu'))}
							pagination={false}
							className={cl.table}
						/>
					</div>
				</div>
				<div className={cl.infoWrap}>
					<div className={cl.totals}>
						<div className={cl.rowTitle}>Totals</div>
						<div className={cl.totalWrap}>
							<div className={cl.left}>Sum</div>
							<div className={cl.right}>￥{orderClickedRowInfo.totalExPrices}</div>
						</div>
						<div className={cl.totalWrap}>
							<div className={cl.left}>Delivery</div>
							<div className={cl.right}>￥{orderClickedRowInfo.totalDeliveryFees}</div>
						</div>
						<div className={cl.totalWrap}>
							<div className={cl.left}>Tax</div>
							<div className={cl.right}>￥{orderClickedRowInfo.totalTaxes}</div>
						</div>
						<div className={cl.totalWrap} style={{ fontWeight: 600 }}>
							<div className={cl.left}>Total</div>
							<div className={cl.right}>
								￥{orderClickedRowInfo.totalDeliveryFees + orderClickedRowInfo.totalExPrices + orderClickedRowInfo.totalTaxes}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={cl.btnWrap}>
				<Button onClick={handleSaveClick} type="text" icon={<SaveFilled />} className={saveClass}>
					Save
				</Button>

				<Button type="text" icon={<DeleteFilled />} className={`${cl.botIcons} ${cl.deleteIcon}`} onClick={handleDeleteClick}>
					Delete
				</Button>
			</div>
			<Modal title="删除提示" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<p>你确定要删除此条信息吗？</p>
			</Modal>
		</div>
	);
};

export default OrdersInfo;
