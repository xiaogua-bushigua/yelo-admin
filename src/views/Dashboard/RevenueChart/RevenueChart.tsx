import { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import cl from './RevenueChart.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { axiosDashRevenue } from '@/store/modules/dashboard';
import { setWidth } from '@/store/modules/dashboard';

const RevenueChart = (props: HighchartsReact.Props) => {
	const dispatch = useAppDispatch();
  const option = useAppSelector(state=>state.dashboard.options)
	useEffect(() => {    
		dispatch(axiosDashRevenue());
    // 获取highChart容器的宽度
		const chart_revenue: HTMLCollection = document.getElementsByClassName('chart_revenue') as HTMLCollection;
		const widthOri = chart_revenue[0].getBoundingClientRect().width;
    dispatch(setWidth(widthOri))
	}, []);

	return (
		<div className="chart_revenue" style={{padding: 10}}>
			<HighchartsReact highcharts={Highcharts} options={option} {...props} />
		</div>
	);
};

export default RevenueChart;
