import SalesTop from './invoicesTop/invoicesTop';
import SalesTable from './invoicesTable/invoicesTable';
import cl from './invoices.module.scss'

const Invoices = () => {
	return (
		<div className={cl.invoicesWrap}>
			<SalesTop></SalesTop>
			<SalesTable></SalesTable>
		</div>
	);
};

export default Invoices;
