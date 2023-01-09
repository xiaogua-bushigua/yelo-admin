import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { axiosSales } from '@/store/modules/sales';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';

const Sales = () => {
  const dispatch = useDispatch<AppDispatch>()
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
