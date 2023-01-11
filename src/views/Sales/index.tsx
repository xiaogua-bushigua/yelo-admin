import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { axiosSales } from '@/store/modules/sales';
import { useAppDispatch } from '@/store/hooks';

const Sales = () => {
  const dispatch = useAppDispatch()

	useEffect(() => {
    dispatch(axiosSales())
  }, []);
	return (
		<div>
			<Outlet></Outlet>
		</div>
	);
};

export default Sales;
