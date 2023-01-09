import React, { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Table, Button } from 'antd';
import { DeleteFilled, CloseCircleOutlined } from '@ant-design/icons'
import cl from './invoicesTable.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setInvoiceSelectRowKeys, batchInvoiceDel } from '@/store/modules/sales';

interface CardDataType {
	key?: number;
	product: string;
  status: string;
	unitPrice: number;
	quantity: number;
	total: number;
}

interface DataType {
	key?: string;
	date: string;
	customer: string;
	address: string;
	orderCode: string;
	totalExTaxe: number;
	deliveryFee: number;
	Taxe: number;
	total: number;
	cardInfo: Array<CardDataType>;
}

const colorPanel = {
	delivered: '#86C166',
	ordered: '#E2943B',
	canceled: '#D0104C',
};

const salesTable = () => {
	const dispatch = useAppDispatch();
	// 表格数据
	const tableData = useAppSelector((state) => state.sales.invoiceTableData);
	// 勾选模式
	const [selectionType] = useState<'checkbox'>('checkbox');
	// 选择信息框的类名
	const [selectWrapClass, setSelectWrapClass] = useState(`${cl.selectItemsInfoWrap}`);
	// 表格list
	const list: DataType[] = tableData.map((item) => {
		return { ...item, key: item.orderCode };
	});
	// 勾选的行keys
	const selectRowKeys = useAppSelector((state) => state.sales.selectInvoiceRowKeys);
	// antd数据列的配置
	const columns: ColumnsType<DataType> = [
		{
			title: 'Id',
			dataIndex: 'orderCode',
			ellipsis: true,
		},
		{
			title: 'Date',
			dataIndex: 'date',
			width: 120,
			sorter: {
				compare: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
				multiple: 1,
			},
		},
		{
			title: 'Customer',
			dataIndex: 'customer',
			width: 100,
		},
		{
			title: 'Address',
			dataIndex: 'address',
		},
		{
			title: 'Total Ex Taxe',
			dataIndex: 'totalExTaxe',
			width: 140,
			sorter: {
				compare: (a, b) => a.totalExTaxe - b.totalExTaxe,
				multiple: 1,
			},
			render: (text: string) => <span>￥{text}</span>,
		},
		{
			title: 'Delivery Fees',
			dataIndex: 'deliveryFee',
			width: 140,
			sorter: {
				compare: (a, b) => a.deliveryFee - b.deliveryFee,
				multiple: 1,
			},
			render: (text: string) => <span>￥{text}</span>,
		},
		{
			title: 'Taxes',
			dataIndex: 'Taxe',
			width: 80,
			sorter: {
				compare: (a, b) => a.Taxe - b.Taxe,
				multiple: 1,
			},
			render: (text: string) => <span>￥{text}</span>,
		},
		{
			title: 'Total',
			dataIndex: 'total',
			width: 80,
			sorter: {
				compare: (a, b) => a.total - b.total,
				multiple: 1,
			},
			render: (text: string) => <span>￥{text}</span>,
		},
	];
	// card数据列的配置
	const cardColumns: ColumnsType<CardDataType> = [
		{
			title: 'Reference',
			dataIndex: 'product',
		},
		{
			title: 'Unit price',
			dataIndex: 'unitPrice',
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
		},
		{
			title: 'Total',
			dataIndex: 'total',
		},
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text: string) => <span style={{color: `${colorPanel[text as keyof typeof colorPanel]}`}}>{text}</span>
    },
	];
	// 行选择功能
	const rowSelection = {
		onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
			if (selectedRowKeys.length) setSelectWrapClass(`${cl.selectItemsInfoWrap} ${cl.selectItemsInfoWrapOpen}`);
			else setSelectWrapClass(`${cl.selectItemsInfoWrap}`);
			dispatch(setInvoiceSelectRowKeys(selectedRowKeys));
		},
		getCheckboxProps: (record: DataType) => ({
			name: record.orderCode,
		}),
	};
  // 关闭选择信息框
  const handleCloseSelectInfo = () => {
		// 未实现：点击关闭后清空table里的勾选项
		setSelectWrapClass(`${cl.selectItemsInfoWrap}`);
	};
	return (
		<div className={cl.invoicesTableWrap}>
			<div className={selectWrapClass}>
				<div className={cl.selectInfoLeft}>
					<Button shape="circle" onClick={handleCloseSelectInfo} icon={<CloseCircleOutlined className={cl.closeIcon} />} />
					{selectRowKeys.length + ' items selected'}
				</div>
				<div className={cl.selectInfoRight}>
					<Button
						type="text"
						icon={<DeleteFilled />}
						className={cl.deleteIcon}
						onClick={() => {
							dispatch(
								batchInvoiceDel(
									selectRowKeys
								)
							);
							dispatch(setInvoiceSelectRowKeys([]));
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
						onClick: () => {},
					};
				}}
				expandable={{
					expandRowByClick: true,
					expandedRowRender: (record) => (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<div className={cl.cardWrap}>
								<div className={cl.row1}>
									<div className={cl.title}>Invoice Card</div>
									<div className={cl.invoiceId}></div>
								</div>
								<div className={cl.row2}>
									<div className={cl.address}>{record.address}</div>
								</div>
								<div className={cl.row3}>
									<div className={cl.dateWrap}>
										<div className={cl.title}>Date</div>
										<div className={cl.date}>{record.date}</div>
									</div>
									<div className={cl.orderWrap}>
										<div className={cl.title}>Order</div>
										<div className={cl.order}>{record.orderCode}</div>
									</div>
								</div>
								<div className={cl.row4}>
									<Table
										columns={cardColumns}
										className={cl.cardTable}
										dataSource={record.cardInfo.map((item, index) => {
											return { ...item, key: index };
										})}
										pagination={false}
										onRow={(record: CardDataType) => {
											return {
												onClick: () => {},
											};
										}}
									/>
								</div>
							</div>
						</div>
					),
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

export default salesTable;
