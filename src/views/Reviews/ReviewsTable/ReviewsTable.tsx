import cl from './ReviewsTable.module.scss';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import React, { useEffect, useState, useRef } from 'react';
import { Table, Drawer, Button, Input, Space } from 'antd';
import {
	StarFilled,
	SearchOutlined,
	PlusSquareFilled,
	MinusSquareFilled,
	QuestionCircleFilled,
	DeleteFilled,
	CloseCircleOutlined,
} from '@ant-design/icons';
import {
	axiosReviews,
	setSelectedData,
	batchChange,
	setSelectRowKeys,
} from '@/store/modules/reviews';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import DrawerDetail from '../Drawer';
import type { InputRef } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import guid from '@/utils/guid';

interface DataType {
	key?: string;
	date: string;
	customer: string;
	customer_id: string;
	reviews_id: string;
	product: string;
	rating: number;
	comment: string;
	status: string;
}

type DataIndex = keyof DataType;

const colorPanel = {
	accepted: '#86C166',
	pending: '#E2943B',
	rejected: '#D0104C',
};

const ReviewsTable = () => {
  const dispatch = useAppDispatch();
	// 勾选框勾选的行key
	const selectRowKeys = useAppSelector(
		(state) => state.reviews.selectRowKeys
	);
  // 表格的数据
	const showData = useAppSelector((state) => state.reviews.showData);
	// 选择信息框的类名
	const [selectWrapClass, setSelectWrapClass] = useState(
		`${cl.selectItemsInfoWrap}`
	);
  // 列的勾选
  const [selectionType] = useState<'checkbox'>('checkbox');
	// drawer的开关
	const [open, setOpen] = useState(false);
  // 列搜索功能所需
  const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef<InputRef>(null);
  // antd渲染表格所需
  const list: DataType[] = showData.map((item) => {
		return { ...item, key: item.reviews_id };
	});

  useEffect(() => {
		dispatch(axiosReviews());
	}, []);

	// 表格上方的选择信息开关
	const handleCloseSelectInfo = () => {
		// 未实现：点击关闭后清空table里的勾选项
		setSelectWrapClass(`${cl.selectItemsInfoWrap}`);
	};
  // 关闭抽屉
  const onCloseDrawer = () => {
		setOpen(false);
	};
	// 行选择功能
	const rowSelection = {
		onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
			setOpen(false);
			if (selectedRowKeys.length)
				setSelectWrapClass(
					`${cl.selectItemsInfoWrap} ${cl.selectItemsInfoWrapOpen}`
				);
			else setSelectWrapClass(`${cl.selectItemsInfoWrap}`);
			dispatch(setSelectRowKeys(selectedRowKeys));
		},
		getCheckboxProps: (record: DataType) => ({
			name: record.date,
		}),
	};
	// 列搜索功能
	const handleSearch = (
		selectedKeys: string[],
		confirm: (param?: FilterConfirmProps) => void,
		dataIndex: DataIndex
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
  // 列搜索栏的重置
	const handleReset = (clearFilters: () => void) => {
		clearFilters();
		setSearchText('');
	};
  // antd列搜索功能
	const getColumnSearchProps = (
		dataIndex: DataIndex
	): ColumnType<DataType> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(
							selectedKeys as string[],
							confirm,
							dataIndex
						)
					}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(
								selectedKeys as string[],
								confirm,
								dataIndex
							)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => {
							clearFilters && handleReset(clearFilters);
							handleSearch([''], confirm, dataIndex);
						}}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>

					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
						style={{ color: '#4e3cc9' }}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined
				style={{
					color: filtered ? '#4e3cc9' : undefined,
					margin: 'auto',
					width: '20px',
					display: 'flex',
					justifyContent: 'center',
				}}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex]!.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text: string) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});

  // antd数据列的配置
	const columns: ColumnsType<DataType> = [
		{
			title: 'Date',
			dataIndex: 'date',
			width: 100,
			sorter: {
				compare: (a, b) =>
					new Date(a.date).getTime() - new Date(b.date).getTime(),
				multiple: 1,
			},
			render: (text: string) => <span>{text.split(' ')[0]}</span>,
		},
		{
			title: 'Customer',
			dataIndex: 'customer',
			width: 100,
			...getColumnSearchProps('customer'),
		},
		{
			title: 'Product',
			dataIndex: 'product',
			width: 100,
		},
		{
			title: 'Rating',
			dataIndex: 'rating',
			render: (text: string) =>
				new Array(Number(text))
					.fill('')
					.map((item) => (
						<StarFilled style={{ color: '#4e3cc9' }} key={guid()} />
					)),
			sorter: {
				compare: (a, b) => a.rating - b.rating,
				multiple: 2,
			},
			width: 90,
		},
		{
			title: 'Comment',
			dataIndex: 'comment',
			ellipsis: true,
		},
		{
			title: 'Status',
			dataIndex: 'status',
			width: 80,
			render: (text: string) => (
				<span
					style={{
						color: `${colorPanel[text as keyof typeof colorPanel]}`,
					}}
				>
					{text}
				</span>
			),
			sorter: {
				compare: (a, b) =>
					a.status.charCodeAt(0) - b.status.charCodeAt(0),
				multiple: 3,
			},
		},
	];

	return (
		<div>
			<div className={cl.infoAndtableWrap}>
				<div className={selectWrapClass}>
					<div className={cl.selectInfoLeft}>
						<Button
							shape="circle"
							onClick={handleCloseSelectInfo}
							icon={
								<CloseCircleOutlined className={cl.closeIcon} />
							}
						/>
						{selectRowKeys.length + ' items selected'}
					</div>
					<div className={cl.selectInfoRight}>
						<Button
							type="text"
							icon={<PlusSquareFilled />}
							onClick={() => {
								dispatch(
									batchChange({
										item: 'accepted',
										keys: selectRowKeys,
									})
								);
							}}
						>
							Accepted
						</Button>
						<Button
							type="text"
							icon={<QuestionCircleFilled />}
							onClick={() => {
								dispatch(
									batchChange({
										item: 'pending',
										keys: selectRowKeys,
									})
								);
							}}
						>
							Pending
						</Button>
						<Button
							type="text"
							icon={<MinusSquareFilled />}
							onClick={() => {
								dispatch(
									batchChange({
										item: 'rejected',
										keys: selectRowKeys,
									})
								);
							}}
						>
							Rejected
						</Button>
						<Button
							type="text"
							icon={<DeleteFilled />}
							className={cl.deleteIcon}
							onClick={() => {
								dispatch(
									batchChange({
										item: 'delete',
										keys: selectRowKeys,
									})
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
								setOpen(false);
								delete record.key;
								dispatch(setSelectedData(record));
								setOpen(true);
							},
						};
					}}
					pagination={{
						position: ['bottomCenter'],
						pageSizeOptions: [15, 30, 45],
						defaultPageSize: 15,
						hideOnSinglePage: true,
						style: { marginBottom: '10px' },
					}}
				/>
			</div>
			<Drawer
				title="Review detail"
				placement="right"
				mask={false}
				onClose={onCloseDrawer}
				open={open}
				style={{ paddingTop: '44px' }}
				zIndex={22}
			>
				<DrawerDetail click={onCloseDrawer}></DrawerDetail>
			</Drawer>
		</div>
	);
};

export default ReviewsTable;
