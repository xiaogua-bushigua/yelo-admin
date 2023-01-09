import { createSlice, createAsyncThunk,PayloadAction } from '@reduxjs/toolkit';
import { dashCustomersGet, dashReviewsGet, dashOrdersGet, dashRevenueGet } from '@/request/api';
import Highcharts from 'highcharts';

interface dashboardData {
	customersNames: string[];
	reviewsContent: Array<{ name: string; review: string }>;
	ordersContent: Array<{ name: string; date: string; items: number; money: number }>;
	revenue: Array<Array<number>>;
	options: any;
  width: number
}

const initialState: dashboardData = {
	customersNames: [],
	reviewsContent: [],
	ordersContent: [],
	revenue: [[]],
	options: {
		accessibility: {
			enabled: false,
		},
		credits: {
			enabled: false,
		},
		chart: {
			zoomType: 'x',
		},
		title: {
			text: '10 Year Revenue History',
		},
		subtitle: {
			text: document.ontouchstart === undefined ? '鼠标拖动可以进行缩放' : '手势操作进行缩放',
		},
		xAxis: {
			type: 'datetime',
			dateTimeLabelFormats: {
				millisecond: '%H:%M:%S.%L',
				second: '%H:%M:%S',
				minute: '%H:%M',
				hour: '%H:%M',
				day: '%m-%d',
				week: '%m-%d',
				month: '%Y-%m',
				year: '%Y',
			},
		},
		tooltip: {
			dateTimeLabelFormats: {
				millisecond: '%H:%M:%S.%L',
				second: '%H:%M:%S',
				minute: '%H:%M',
				hour: '%H:%M',
				day: '%Y-%m-%d',
				week: '%m-%d',
				month: '%Y-%m',
				year: '%Y',
			},
		},
		yAxis: {
			title: {
				text: '收入',
			},
		},
		legend: {
			enabled: false,
		},
		plotOptions: {
			area: {
				fillColor: {
					linearGradient: {
						x1: 0,
						y1: 0,
						x2: 0,
						y2: 1,
					},
					stops: [
						[0, '#6956e1'],
						[1, new Highcharts.Color('#6956e1').setOpacity(0).get('rgba')],
					],
				},
				marker: {
					radius: 2,
				},
				lineWidth: 1,
        lineColor: '#6956e1',
				states: {
					hover: {
						lineWidth: 1,
					},
				},
				threshold: null,
			},
		},
		series: [
			{
				type: 'area',
				data: [],
			},
		],
	},
  width: 0
};

export const DashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload
    }
  },
	extraReducers(builder) {
		builder.addCase(axiosDashCustomers.fulfilled, (state, { payload }) => {
			state.customersNames = payload.data;
		});
		builder.addCase(axiosDashReviews.fulfilled, (state, { payload }) => {
			state.reviewsContent = payload.data;
		});
		builder.addCase(axiosDashOrders.fulfilled, (state, { payload }) => {
			state.ordersContent = payload.data;
		});
		builder.addCase(axiosDashRevenue.fulfilled, (state, { payload }) => {
      if(!localStorage.getItem('chartData')) localStorage.setItem('chartData', JSON.stringify({data: payload.data}))
			state.revenue = payload.data;
			state.options.series = [
				{
					type: 'area',
					data: JSON.parse(localStorage.getItem('chartData')!).data,
				},
			];
      console.log(Highcharts.charts[0]);
      Highcharts.charts[0]!.redraw()
		});
	},
});

export const axiosDashCustomers = createAsyncThunk('axiosDashCustomers', async () => {
	return await dashCustomersGet();
});
export const axiosDashReviews = createAsyncThunk('axiosDashReviews', async () => {
	return await dashReviewsGet();
});
export const axiosDashOrders = createAsyncThunk('axiosDashOrders', async () => {
	return await dashOrdersGet();
});
export const axiosDashRevenue = createAsyncThunk('axiosDashRevenue', async () => {
  if(localStorage.getItem('chartData')) return {data: JSON.parse(localStorage.getItem('chartData')!).data}
	else return await dashRevenueGet();
});

export const {setWidth} = DashboardSlice.actions;

export default DashboardSlice.reducer;
