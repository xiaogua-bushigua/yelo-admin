import Calendar from '@/components/Calendar';
import cl from './invoicesTop.module.scss';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { utils, writeFileXLSX } from 'xlsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { invoiceTableDataType } from '@/types/sales';
import { filterData, setFilterItems } from '@/store/modules/sales';

const salesTop = () => {
  const dispatch = useAppDispatch()

  // 表格数据
  const showData = useAppSelector(state=>state.sales.invoiceTableData)
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
  // 处理过滤
  const handleSinceChange = (val: string) => {
		dispatch(
			setFilterItems({
				item: 'Passed since',
				value: val,
			})
		);
		dispatch(filterData());
	};
	const handleBeforeChange = (val: string) => {
		dispatch(
			setFilterItems({
				item: 'Passed before',
				value: val,
			})
		);
		dispatch(filterData());
	};
	return (
		<div className={cl.salesTopWrap}>
			<div className={cl.calendarsWrap}>
				<div className={cl.calendarWrap}>
					<Calendar title="Passed since" change={handleSinceChange}></Calendar>
				</div>
				<div className={cl.calendarWrap}>
					<Calendar title="Passed before" change={handleBeforeChange}></Calendar>
				</div>
			</div>
			<Button
				icon={<DownloadOutlined />}
				className={cl.optionBtn}
				onClick={handleExport}
			>
				EXPORT
			</Button>
		</div>
	);
};

export default salesTop;
