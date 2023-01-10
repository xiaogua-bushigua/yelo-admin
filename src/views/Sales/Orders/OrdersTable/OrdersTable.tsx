import { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu, Table, Button } from 'antd';
import { DeleteFilled, CloseCircleOutlined } from '@ant-design/icons';
import cl from './ordersTable.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { ColumnsType } from 'antd/es/table';
import { setNowMenu, setOrderSelectRowKeys, batchOrderDel, saveClickedTableRow } from '@/store/modules/sales';
import { useNavigate } from 'react-router-dom';

const menuItems: MenuProps['items'] = [
	{
		label: 'ORDERED',
		key: 'ordered',
	},
	{
		label: 'DELIVERED',
		key: 'delivered',
	},
	{
		label: 'CANCELED',
		key: 'canceled',
	},
];

interface DataType {
	key?: string;
	date: string;
	orderCode: string;
	customer: string;
	address: string;
	totalExPrices: number;
	totalDeliveryFees: number;
	totalTaxes: number;
}

interface colType {
	data: ColumnsType<DataType>;
}

const initCol: ColumnsType<DataType> = [
  {
    title: 'Date',
    dataIndex: 'date',
    sorter: {
      compare: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      multiple: 1,
    },
  },
  {
    title: 'Order',
    dataIndex: 'orderCode',
    ellipsis: true,
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
    dataIndex: 'totalExPrices',
    sorter: {
      compare: (a, b) => a.totalExPrices - b.totalExPrices,
      multiple: 1,
    },
    render: (text: number) => <span>￥{text}</span>,
    width: 140,
  },
  {
    title: 'Delivery Fees',
    dataIndex: 'totalDeliveryFees',
    sorter: {
      compare: (a, b) => a.totalDeliveryFees - b.totalDeliveryFees,
      multiple: 1,
    },
    render: (text: number) => <span>￥{text}</span>,
    width: 140,
  },
  {
    title: 'Taxes',
    dataIndex: 'totalTaxes',
    width: 90,
    sorter: {
      compare: (a, b) => a.totalTaxes - b.totalTaxes,
      multiple: 1,
    },
    render: (text: number) => <span>￥{text}</span>,
  },
  {
    title: 'Total',
    dataIndex: 'total',
    width: 90,
    sorter: {
      compare: (a, b) => a.totalTaxes + a.totalExPrices + a.totalDeliveryFees - (b.totalTaxes + b.totalExPrices + b.totalDeliveryFees),
      multiple: 1,
    },
    render: (text: number, item) => <span>￥{item.totalTaxes + item.totalExPrices + item.totalDeliveryFees}</span>,
  },
];

const OrdersTable = () => {
	const dispatch = useAppDispatch();
	const navigateTo = useNavigate();
	const [current, setCurrent] = useState('ordered');
	// 选择信息框的类名
	const [selectWrapClass, setSelectWrapClass] = useState(`${cl.selectItemsInfoWrap}`);
	// 表格数据
	const showData = useAppSelector((state) => {
		switch (current) {
			case 'ordered':
				return state.sales.orderTableData.ordered;
			case 'delivered':
				return state.sales.orderTableData.delivered;
			case 'canceled':
				return state.sales.orderTableData.canceled;
			default:
				return state.sales.orderTableData.ordered;
		}
	});

	// 表格头是否渲染
	const columnShow = useAppSelector((state) => state.sales.columnShow);
	// 勾选模式
	const [selectionType] = useState<'checkbox'>('checkbox');
	const selectRowKeys = useAppSelector((state) => state.sales.selectOrderRowKeys);
	const [Columns, setColumns] = useState({
		data: initCol
	} as colType);
	// 表格list
	const list: DataType[] = showData?.data.map((item) => {
		return { ...item, key: item.orderCode };
	});
	useEffect(() => {
    localStorage.setItem('nowMenu', 'ordered')
    setColumns({data: initCol})
		Object.keys(columnShow).forEach(col=>{      
      if(!columnShow[col as keyof typeof columnShow]) {        
        for(let item of Columns.data) {
          if(item.title === col) {  
            setColumns({data: Columns.data.filter(i=>i.title !== col)})
          }
        }
      }
    })
	}, [columnShow]);


	// antd数据列的配置
	// 放进redux，在setColumnShow函数里根据item的Boolean去push这些数组元素
	const columns: ColumnsType<DataType> = [
		{
			title: 'Date',
			dataIndex: 'date',
			sorter: {
				compare: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
				multiple: 1,
			},
		},
		{
			title: 'Order',
			dataIndex: 'orderCode',
			ellipsis: true,
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
			dataIndex: 'totalExPrices',
			sorter: {
				compare: (a, b) => a.totalExPrices - b.totalExPrices,
				multiple: 1,
			},
			render: (text: number) => <span>￥{text}</span>,
			width: 140,
		},
		{
			title: 'Delivery Fees',
			dataIndex: 'totalDeliveryFees',
			sorter: {
				compare: (a, b) => a.totalDeliveryFees - b.totalDeliveryFees,
				multiple: 1,
			},
			render: (text: number) => <span>￥{text}</span>,
			width: 140,
		},
		{
			title: 'Taxes',
			dataIndex: 'totalTaxes',
			width: 90,
			sorter: {
				compare: (a, b) => a.totalTaxes - b.totalTaxes,
				multiple: 1,
			},
			render: (text: number) => <span>￥{text}</span>,
		},
		{
			title: 'Total',
			dataIndex: 'total',
			width: 90,
			sorter: {
				compare: (a, b) => a.totalTaxes + a.totalExPrices + a.totalDeliveryFees - (b.totalTaxes + b.totalExPrices + b.totalDeliveryFees),
				multiple: 1,
			},
			render: (text: number, item) => <span>￥{item.totalTaxes + item.totalExPrices + item.totalDeliveryFees}</span>,
		},
	];
	// 点击顶部导航
	const onClickMenu: MenuProps['onClick'] = (e) => {
		setCurrent(e.key);
		dispatch(setNowMenu(e.key));
	};
	// 关闭选择信息框
	const handleCloseSelectInfo = () => {
		// 未实现：点击关闭后清空table里的勾选项
		setSelectWrapClass(`${cl.selectItemsInfoWrap}`);
	};
	// 行选择功能
	const rowSelection = {
		onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
			if (selectedRowKeys.length) setSelectWrapClass(`${cl.selectItemsInfoWrap} ${cl.selectItemsInfoWrapOpen}`);
			else setSelectWrapClass(`${cl.selectItemsInfoWrap}`);
			dispatch(setOrderSelectRowKeys(selectedRowKeys));
		},
		getCheckboxProps: (record: DataType) => ({
			name: record.orderCode,
		}),
	};

	return (
		<div className={cl.tableWrap}>
			<Menu onClick={onClickMenu} selectedKeys={[current]} mode="horizontal" items={menuItems} className={cl.menu} />
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
							dispatch(batchOrderDel(selectRowKeys));
							dispatch(setOrderSelectRowKeys([]));
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
				columns={Columns.data}
				dataSource={list}
				className={cl.table}
				onRow={(record: DataType) => {
					return {
						onClick: () => {
							dispatch(saveClickedTableRow(record.orderCode));
							navigateTo('/sales/orders/info');
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

export default OrdersTable;
