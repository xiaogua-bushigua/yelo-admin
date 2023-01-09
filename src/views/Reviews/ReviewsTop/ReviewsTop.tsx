import { useState } from 'react';
import Select from '@/components/Select';
import Calendar from '@/components/Calendar';
import {
	CloseCircleOutlined,
	DownloadOutlined,
	AlignCenterOutlined,
} from '@ant-design/icons';
import cl from './ReviewsTop.module.scss';
import { Button } from 'antd';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { utils, writeFileXLSX } from 'xlsx';
import { setFilterItems, filterData } from '@/store/modules/reviews';
import { setCollapsed } from '@/store/modules/global';

interface ItemsShow {
	status: boolean;
	product: boolean;
	since: boolean;
	before: boolean;
}

const ReviewsTop = () => {
	const dispatch = useAppDispatch();
	const showData = useAppSelector((state) => state.reviews.showData);
	const sideNaviCollapsed = useAppSelector((state) => state.global.collapsed);
	const [itemsShow, setItemsShow] = useState({
		status: true,
		product: true,
		since: true,
		before: false,
	} as ItemsShow);
	// ADD FILTER下拉项的显示，默认不显示
	const [filterItemsShow, setFilterItemsShow] = useState(true);

	// 关闭过滤器
	const handleShutDownClick = (s: string) => {
		function shutDown(v1: string, v2: string) {
			setItemsShow(() => ({
				...itemsShow,
				[v2]: false,
			}));
			dispatch(setFilterItems({ item: v1, value: '' }));
			dispatch(filterData(v1.toLocaleLowerCase()));
		}
		switch (s) {
			case 'status':
				shutDown('Status', 'status');
				break;
			case 'product':
				shutDown('Product', 'product');
				break;
			case 'Posted since':
				shutDown('Posted since', 'since');
				break;
			case 'Posted before':
				shutDown('Posted before', 'before');
				break;
			default:
				break;
		}
	};
	// ADD FILTER按钮的点击
	const handleFilterBtnClick = (e: any) => {
		e.nativeEvent.stopImmediatePropagation();
		setFilterItemsShow(!filterItemsShow);
	};
	// EXPORT按钮的点击
	const handleExport = () => {
		let workbook = utils.book_new();
		let workSheet = utils.json_to_sheet(
			showData.map((item) => {
				return item;
			})
		);
		utils.book_append_sheet(workbook, workSheet, 'table1');
		writeFileXLSX(workbook, 'reviewsData.xlsx');
	};
	// ADD FILTER下拉框子项的点击
	const handleSelect = (s: string) => {
		let flag = 0;
		Object.values(itemsShow).forEach((item) => {
			if (!item) flag += 1
		});
		if (flag == 1 && !sideNaviCollapsed) dispatch(setCollapsed());

		function show(val: string) {
			setItemsShow(() => ({
				...itemsShow,
				[val]: true,
			}));
		}
		switch (s) {
			case 'status':
				show('status');
				break;
			case 'product':
				show('product');
				break;
			case 'since':
				show('since');
				break;
			case 'before':
				show('before');
				break;
			default:
				break;
		}
	};
	document.addEventListener('click', () => {
		if (!filterItemsShow) setFilterItemsShow(true);
	});
	const handleStatusChange = (val: string) => {
		dispatch(setFilterItems({ item: 'Status', value: val }));
		dispatch(filterData(''));
	};
	const handleProductChange = (val: string) => {
		dispatch(setFilterItems({ item: 'Product', value: val }));
		dispatch(filterData(''));
	};
	const handleSinceChange = (val: string) => {
		dispatch(
			setFilterItems({
				item: 'Posted since',
				value: val,
			})
		);
		dispatch(filterData(''));
	};
	const handleBeforeChange = (val: string) => {
		dispatch(
			setFilterItems({
				item: 'Posted before',
				value: val,
			})
		);
		dispatch(filterData(''));
	};
	return (
		<div>
			<div className={cl.topWrap}>
				<div className={cl.filterItems}>
					{itemsShow.status ? (
						<div className={cl.componentWrap}>
							<Button
								onClick={handleShutDownClick.bind(
									this,
									'status'
								)}
								className={cl.shutDownIcon}
								size="small"
								shape="circle"
								icon={<CloseCircleOutlined />}
							/>
							<Select
								item="Status"
								list={['Rejected', 'Pending', 'Accepted']}
								width="160"
								change={handleStatusChange}
							></Select>
						</div>
					) : (
						''
					)}

					{itemsShow.product ? (
						<div className={cl.componentWrap}>
							<Button
								onClick={handleShutDownClick.bind(
									this,
									'product'
								)}
								className={cl.shutDownIcon}
								size="small"
								shape="circle"
								icon={<CloseCircleOutlined />}
							/>
							<Select
								item="Product"
								list={[
									'乒乓球',
									'木门',
									'感冒药',
									'耳机',
									'平板',
									'手表',
									'手机',
									'苹果',
									'卷饼',
									'显示器',
									'手套',
									'电动车',
								]}
								width="160"
								change={handleProductChange}
							></Select>
						</div>
					) : (
						''
					)}

					{itemsShow.since ? (
						<div className={cl.componentWrap}>
							<Button
								onClick={handleShutDownClick.bind(
									this,
									'Posted since'
								)}
								className={cl.shutDownIcon}
								size="small"
								shape="circle"
								icon={<CloseCircleOutlined />}
							/>
							<Calendar
								title="Posted since"
								change={handleSinceChange}
							></Calendar>
						</div>
					) : (
						''
					)}

					{itemsShow.before ? (
						<div className={cl.componentWrap}>
							<Button
								onClick={handleShutDownClick.bind(
									this,
									'Posted before'
								)}
								className={cl.shutDownIcon}
								size="small"
								shape="circle"
								icon={<CloseCircleOutlined />}
							/>
							<Calendar
								title="Posted before"
								change={handleBeforeChange}
							></Calendar>
						</div>
					) : (
						''
					)}
				</div>

				<div className={cl.options}>
					<div className={cl.flterBtnWrap}>
						<Button
							icon={<AlignCenterOutlined />}
							className={`${cl.optionBtn} ${cl.fiterBtn}`}
							onClick={handleFilterBtnClick}
						>
							ADD FILTER
						</Button>
						{filterItemsShow ||
						!Object.values(itemsShow).includes(false) ? (
							''
						) : (
							<div className={cl.fiterWrapItems}>
								{Object.keys(itemsShow).map((item: string) => {
									return itemsShow[
										item as keyof typeof itemsShow
									] ? (
										''
									) : (
										<div
											className={cl.filterSelectItem}
											onClick={handleSelect.bind(
												this,
												item
											)}
											key={item}
										>
											{item}
										</div>
									);
								})}
							</div>
						)}
					</div>
					<Button
						icon={<DownloadOutlined />}
						className={cl.optionBtn}
						onClick={handleExport}
					>
						EXPORT
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ReviewsTop;
