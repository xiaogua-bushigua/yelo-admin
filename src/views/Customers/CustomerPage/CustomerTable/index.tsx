import React, { useEffect, useState } from 'react';
import cl from './table.module.scss';
import { axiosCustomers } from '@/store/modules/customers';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { ColumnsType } from 'antd/es/table';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CloseCircleOutlined, DeleteFilled } from '@ant-design/icons';
import { saveClickTableRow, setSelectRowKeys, batchDel } from '@/store/modules/customers';

interface DataType {
	key?: string;
	customer: string;
	customer_id: string;
	last_seen: string;
	orders: number;
	total_spent: number;
	last_purchase: string;
	phone_number: string;
	address: string;
}

// antd表格列的配置
const columns: ColumnsType<DataType> = [
	{
		title: 'Customer',
		dataIndex: 'customer',
		width: 90,
	},
	{
		title: 'Last seen',
		dataIndex: 'last_seen',
		width: 110,
		sorter: {
			compare: (a, b) =>
				new Date(a.last_seen).getTime() -
				new Date(b.last_seen).getTime(),
			multiple: 1,
		},
	},
	{
		title: 'Orders',
		dataIndex: 'orders',
		width: 100,
		sorter: {
			compare: (a, b) => a.orders - b.orders,
			multiple: 1,
		},
	},
	{
		title: 'Total spent',
		dataIndex: 'total_spent',
		width: 140,
		render: (text: number) => <span>{'￥' + text}</span>,
		sorter: {
			compare: (a, b) => a.total_spent - b.total_spent,
			multiple: 1,
		},
	},
	{
		title: 'Last purchase',
		dataIndex: 'last_purchase',
		width: 140,
		sorter: {
			compare: (a, b) =>
				new Date(a.last_purchase).getTime() -
				new Date(b.last_purchase).getTime(),
			multiple: 1,
		},
	},
	{
		title: 'Phone number',
		dataIndex: 'phone_number',
		width: 130,
	},
	{
		title: 'Address',
		dataIndex: 'address',
	},
];

const CustomerTable = () => {
	const dispatch = useAppDispatch();
	const navigateTo = useNavigate();
	useEffect(() => {
			dispatch(axiosCustomers());
	}, []);
  // 表格数据
	const tableShowData = useAppSelector((state) => state.customers.tableData);
  // 勾选的数据
  const selectRowKeys = useAppSelector((state) => state.customers.selectRowKeys);
  // 勾选数据时表格上方的信息栏
	const [selectWrapClass, setSelectWrapClass] = useState(
		`${cl.selectItemsInfoWrap}`
	);
  // antd表格的选择类型
	const [selectionType] = useState<'checkbox'>('checkbox');

  // 关闭选择的信息栏
  const handleCloseSelectInfo = () => {
		setSelectWrapClass(`${cl.selectItemsInfoWrap}`);
	};
  // 行选择
	const rowSelection = {
		onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
			if (selectedRowKeys.length)
				setSelectWrapClass(
					`${cl.selectItemsInfoWrap} ${cl.selectItemsInfoWrapOpen}`
				);
			else setSelectWrapClass(`${cl.selectItemsInfoWrap}`);
			dispatch(setSelectRowKeys(selectedRowKeys));
		},
		getCheckboxProps: (record: DataType) => ({
			name: record.customer,
		}),
	};
  // antd表格数据
	const list: DataType[] = tableShowData.map((item) => {
		return { ...item, key: item.customer_id };
	});

	return (
		<div className={cl.tableWrap}>
			<div className={selectWrapClass}>
				<div className={cl.selectInfoLeft}>
					<Button
						shape="circle"
						onClick={handleCloseSelectInfo}
						icon={<CloseCircleOutlined className={cl.closeIcon} />}
					/>
					{selectRowKeys.length + ' items selected'}
				</div>
				<div className={cl.selectInfoRight}>
					<Button
						type="text"
						icon={<DeleteFilled />}
						className={cl.deleteIcon}
						onClick={() => {
							dispatch(
								batchDel(selectRowKeys)
							);
							dispatch(setSelectRowKeys([]));
							setSelectWrapClass(`${cl.selectItemsInfoWrap}`);
						}}
					>
						Delete
					</Button>
				</div>
			</div>

			<Table
				rowSelection={{
					type: selectionType,
					...rowSelection,
				}}
				columns={columns}
				dataSource={list}
				className={cl.table}
				onRow={(record: DataType) => {
					return {
						onClick: () => {
							dispatch(saveClickTableRow(record.customer_id));
							navigateTo('/customers/info');
						},
					};
				}}
				pagination={{
					position: ['bottomCenter'],
					pageSizeOptions: [10, 20, 40],
					defaultPageSize: 10,
					hideOnSinglePage: true,
					style: { marginBottom: '10px' },
				}}
			/>
		</div>
	);
};

export default CustomerTable;
