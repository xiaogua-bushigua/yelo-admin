import Calendar from '@/components/Calendar';
import Input from '@/components/Input';
import cl from './invoicesTop.module.scss';
import { Button } from 'antd';
import { useState } from 'react';
import { DownloadOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { utils, writeFileXLSX } from 'xlsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { invoiceTableDataType } from '@/types/sales';
import { filterData, setFilterItems } from '@/store/modules/sales';

const salesTop = () => {
	const dispatch = useAppDispatch();
	// 表格数据
	const showData = useAppSelector((state) => state.sales.invoiceTableData);
  const [input, setInput] = useState('')
  const [since, setSince] = useState('')
  const [before, setBefore] = useState('')
	// 处理输出
	const handleExport = () => {
		let workbook = utils.book_new();
		let workSheet = utils.json_to_sheet(
			showData.map((item: invoiceTableDataType) => {
				return item;
			})
		);
		utils.book_append_sheet(workbook, workSheet, 'table1');
		writeFileXLSX(workbook, 'invoiceData.xlsx');
	};
	// 处理重置
	const handleReset = () => {
		dispatch(
			setFilterItems({
				item: 'Passed since',
				value: '',
			})
		);
		dispatch(
			setFilterItems({
				item: 'Passed before',
				value: '',
			})
		);
    dispatch(
			setFilterItems({
				item: 'random',
				value: '',
			})
		);
    setInput('')
    setBefore('')
    setSince('')
    dispatch(filterData());
	};
	// 处理过滤
	const handleSinceChange = (val: string) => {
		dispatch(
			setFilterItems({
				item: 'Passed since',
				value: val,
			})
		);
		dispatch(filterData());
    setSince(val)
	};
	const handleBeforeChange = (val: string) => {
		dispatch(
			setFilterItems({
				item: 'Passed before',
				value: val,
			})
		);
		dispatch(filterData());
    setBefore(val)
	};
	const handleInputChange = (val: string) => {
		dispatch(
			setFilterItems({
				item: 'random',
				value: val,
			})
		);
		dispatch(filterData());
    setInput(val)
	};
	return (
		<div className={cl.salesTopWrap}>
			<div className={cl.calendarsWrap}>
				<div className={cl.calendarWrap}>
					<Calendar title="Passed since" change={handleSinceChange} date={since}></Calendar>
				</div>
				<div className={cl.calendarWrap}>
					<Calendar title="Passed before" change={handleBeforeChange} date={before}></Calendar>
				</div>
				<div style={{ marginBottom: 3 }}>
					<Input inputType="Search" placeholder="Search" mode="textIcon" change={handleInputChange} input={input}>
						<SearchOutlined className={cl.inputIcon} />
					</Input>
				</div>
			</div>
			<div>
				<Button icon={<SyncOutlined />} className={cl.optionBtn} onClick={handleReset}>
					RESET
				</Button>
				<Button icon={<DownloadOutlined />} className={cl.optionBtn} onClick={handleExport}>
					EXPORT
				</Button>
			</div>
		</div>
	);
};

export default salesTop;
