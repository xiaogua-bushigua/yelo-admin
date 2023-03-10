import cl from './ordersTop.module.scss';
import Input from '@/components/Input';
import { Button, Switch } from 'antd';
import { utils, writeFileXLSX } from 'xlsx';
import { SearchOutlined, DownloadOutlined, TableOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { orderSearch, getSearchItem, setColumnShow } from '@/store/modules/sales';

const OrdersTop = () => {
	const dispatch = useAppDispatch();
    // 表格数据
	const orderTableData = useAppSelector((state) => state.sales.orderTableData);
  // 待展示的列选项
	const columnShow = useAppSelector((state) => state.sales.columnShow);
  // columns按钮的类名
  const [columnClass, setColumnClass] = useState(`${cl.colItemsWrap}`)
  // 输入框改变时
	const handleChange = (val: string) => {
		dispatch(getSearchItem(val));
		dispatch(orderSearch());
	};
  // 导出文件
	const handleExport = () => {
		let workbook = utils.book_new();
		let workSheet1 = utils.json_to_sheet(
			orderTableData.ordered.data.map((item) => {
				return item;
			})
		);
		let workSheet2 = utils.json_to_sheet(
			orderTableData.delivered.data.map((item) => {
				return item;
			})
		);
		let workSheet3 = utils.json_to_sheet(
			orderTableData.canceled.data.map((item) => {
				return item;
			})
		);
		utils.book_append_sheet(workbook, workSheet1, 'ordered');
		utils.book_append_sheet(workbook, workSheet2, 'delivered');
		utils.book_append_sheet(workbook, workSheet3, 'canceled');
		writeFileXLSX(workbook, 'ordersData.xlsx');
	};
  // columns按钮的点击
  const [flag, setFlag] = useState(false)
  document.addEventListener('click', () => {
		if (flag) {setColumnClass(`${cl.colItemsWrap}`); setFlag(!flag)};
	});
  const handleColumnsClick = (e: any) => {
    e.nativeEvent.stopImmediatePropagation();
    if(!flag) setColumnClass(`${cl.colItemsWrap} ${cl.colItemsWrapOpen}`)
    else setColumnClass(`${cl.colItemsWrap}`)
    setFlag(!flag)
  }
  const handleColShowWrapClick = (e:any) => {
    e.nativeEvent.stopImmediatePropagation();
  }
  // switch开关选项的点击
  const handleSwitchChange = (item: string) => {
    dispatch(setColumnShow(item))
  }
	return (
		<div className={cl.ordersTopWrap}>
			<div className={cl.filtersWrap}>
				<div className={cl.filterWrap}>
					<Input inputType="Search" placeholder="Search" mode="textIcon" change={handleChange}>
						<SearchOutlined className={cl.inputIcon} />
					</Input>
				</div>
			</div>
			<div className={cl.btns}>
				<div className={cl.columns}>
					<Button icon={<TableOutlined />} className={cl.optionBtn} onClick={handleColumnsClick}>
						COLUMNS
					</Button>
          <div className={columnClass} onClick={handleColShowWrapClick}>
            {Object.keys(columnShow).map(item=><div key={item} className={cl.colItem}
            ><Switch defaultChecked onChange={handleSwitchChange.bind(this, item)} style={{marginRight: 12}} size="small"/>{item}</div>)}
          </div>
				</div>
				<Button icon={<DownloadOutlined />} className={cl.optionBtn} onClick={handleExport}>
					EXPORT
				</Button>
			</div>
		</div>
	);
};

export default OrdersTop;
