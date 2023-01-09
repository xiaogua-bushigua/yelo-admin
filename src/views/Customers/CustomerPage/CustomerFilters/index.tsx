import { useState } from 'react';
import cl from './filters.module.scss';
import {
	SearchOutlined,
	FieldTimeOutlined,
	PayCircleOutlined,
	BarsOutlined,
	PlusOutlined,
	FlagOutlined,
	CloseCircleOutlined,
} from '@ant-design/icons';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { Button, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
	setClickedItems,
	setSavedQuery,
	clearTable,
	delSaveFilterItem,
} from '@/store/modules/customers';

const CustomerFilters = () => {
  const dispatch = useAppDispatch();
  // 筛选项
  const filterItems = useAppSelector((state) => state.customers.filterItems);
  // 模态窗的开关
	const [isModalOpen, setIsModalOpen] = useState(false);
  // 保存的快捷筛选项
	const [queryItem, setQueryItem] = useState('');

  // 模态窗相关
	const handleShowModal = () => {
		setIsModalOpen(true);
	};
  const handleOk = () => {
		if (queryItem != '') {
			setIsModalOpen(false);
			dispatch(setSavedQuery(queryItem));
			setQueryItem('');
		}
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
  // 处理模态框输入
	const handleQueryInputChange = (val: string) => {
		setQueryItem(val);
	};
  // 添加了的自定义筛选项的点击
	const handleItemClick = (obj: { title: string; value: string }) => {
		dispatch(setClickedItems(obj));
	};
  // 省份选择的改变
	const handleSelectInputChange = (val: string) => {
		let temp = filterItems.provinces.map((item) => item.item) as string[];
		if (temp.includes(val)) {
			dispatch(setClickedItems({ title: 'provinces', value: val }));
		} else {
			dispatch(clearTable());
		}
	};
  // 随机搜索
	const handleRandomInputChange = (val: string) => {
		dispatch(setClickedItems({ title: 'random', value: val }));
	};
  // 删除自定义的搜索项
	const handledDelSavedItemClick = (item: string) => {
		dispatch(delSaveFilterItem(item));
	};

	return (
		<div className={cl.filtersWrap}>
			<div className={cl.InputWrap}>
				<Input
					inputType="Search"
					placeholder="Search"
					mode="textIcon"
					change={handleRandomInputChange}
				>
					<SearchOutlined />
				</Input>
			</div>

			<div className={cl.filterWrap}>
				<div className={cl.filterTitleWrap}>
					<FlagOutlined className={cl.filterTitleIcon} />
					Saved Query
					<Button
						onClick={handleShowModal}
						className={cl.PlusIcon}
						size="small"
						shape="circle"
						icon={<PlusOutlined />}
					/>
				</div>
				<Modal
					title="Save current query as"
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					okText={'Save'}
					width={350}
				>
					<div
						style={{
							margin: '30px 0 30px 0',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Input
							inputType="Query name"
							mode="moveTitle"
							change={handleQueryInputChange}
						/>
					</div>
				</Modal>
				<div className={cl.fiterItemsWrap}>
					{filterItems.savedQuery.map((o) => (
						<div
							className={cl.filterItem}
							key={o.item}
							style={{
								background: `${
									o.checked ? 'rgb(233, 233, 233)' : '#fff'
								}`,
								transition: '0.3s',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
							onClick={handleItemClick.bind(this, {
								title: 'savedQuery',
								value: o.item,
							})}
						>
							{o.item}
							<Button
								onClick={handledDelSavedItemClick.bind(
									this,
									o.item
								)}
								className={cl.shutDownIcon}
								size="small"
								shape="circle"
								icon={<CloseCircleOutlined />}
							/>
						</div>
					))}
				</div>
			</div>

			<div className={cl.filterWrap}>
				<div
					className={cl.filterTitleWrap}
					style={{ marginBottom: 10 }}
				>
					<BarsOutlined className={cl.filterTitleIcon} />
					Positon
				</div>
				<div
					className={cl.fiterItemsWrap}
					style={{ paddingLeft: '26px' }}
				>
					<Select
						item="Provinces"
						list={filterItems.provinces.map((item) => item.item)}
						width="130"
						change={handleSelectInputChange}
					></Select>
				</div>
			</div>

			<div className={cl.filterWrap}>
				<div className={cl.filterTitleWrap}>
					<FieldTimeOutlined className={cl.filterTitleIcon} />
					Last Visited
				</div>
				<div className={cl.fiterItemsWrap}>
					{filterItems.lastVisited.map((o) => (
						<div
							className={cl.filterItem}
							key={o.item}
							style={{
								background: `${
									o.checked ? 'rgb(233, 233, 233)' : '#fff'
								}`,
								transition: '0.3s',
							}}
							onClick={handleItemClick.bind(this, {
								title: 'lastVisited',
								value: o.item,
							})}
						>
							{o.item}
						</div>
					))}
				</div>
			</div>

			<div className={cl.filterWrap}>
				<div className={cl.filterTitleWrap}>
					<PayCircleOutlined className={cl.filterTitleIcon} />
					Total Spent
				</div>
				<div className={cl.fiterItemsWrap}>
					{filterItems.totalSpent.map((o) => (
						<div
							className={cl.filterItem}
							key={o.item}
							style={{
								background: `${
									o.checked ? 'rgb(233, 233, 233)' : '#fff'
								}`,
								transition: '0.3s',
							}}
							onClick={handleItemClick.bind(this, {
								title: 'totalSpent',
								value: o.item,
							})}
						>
							{o.item}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CustomerFilters;
