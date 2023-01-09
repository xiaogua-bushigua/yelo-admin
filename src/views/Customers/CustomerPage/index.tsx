import CustomerFilters from './CustomerFilters';
import CustomerTable from './CustomerTable';
import { DownloadOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import cl from './customers.module.scss';
import { utils, writeFileXLSX } from 'xlsx'
import { useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';

const CustomerPage = () => {
  const navigateTo = useNavigate()
  const tableData = useAppSelector((state)=>state.customers.tableData)
  // EXPORT按钮
  const handleExport = ()=>{
    let workbook = utils.book_new();
    let workSheet = utils.json_to_sheet(tableData.map(item => {
      return item
    }));
    utils.book_append_sheet(workbook, workSheet, 'table1')
    writeFileXLSX(workbook, 'consumersData.xlsx')
  }
  // CREATE按钮
  const handleCreate = () => {
    navigateTo('/customers/create')
  }
	return (
		<div>
			<div className={cl.topWrap}>
				<Button icon={<PlusSquareOutlined />} className={cl.optionBtn} onClick={handleCreate}>
					CREATE
				</Button>
				<Button
					icon={<DownloadOutlined />}
					className={cl.optionBtn}
					onClick={handleExport}
				>
					EXPORT
				</Button>
			</div>
			<div className={cl.contentWrap}>
				<CustomerFilters></CustomerFilters>
				<CustomerTable></CustomerTable>
			</div>
		</div>
	);
};

export default CustomerPage;
