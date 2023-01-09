import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reviewsGet } from '@/request/api';
import { reviewsResType, selectedDataType, filterItemsType, saveDataType } from '@/types/review';

interface batchChangeStatusType {
	item: string;
	keys: React.Key[];
}
interface filterItemType {
	item: string;
	value: string;
}

interface reviewsData {
	dataSource: reviewsResType;
	selectedData: selectedDataType;
	showData: Array<selectedDataType>;
	filterItems: filterItemsType;
	selectRowKeys: React.Key[];
}

const initialState: reviewsData = {
	dataSource: {
		data: [
			{
				customer: '',
				date: '',
				rating: 0,
				product: '',
				comment: '',
				status: '',
				customer_id: '',
				reviews_id: '',
			},
		],
	},
	showData: [
		{
			customer: '',
			date: '',
			customer_id: '',
			reviews_id: '',
			rating: 0,
			product: '',
			comment: '',
			status: '',
		},
	],
	selectedData: {
		customer: '',
		customer_id: '',
		reviews_id: '',
		date: '',
		rating: 0,
		product: '',
		comment: '',
		status: '',
	},
	filterItems: {
		Status: '',
		Product: '',
		'Posted since': '',
		'Posted before': '',
	},
	selectRowKeys: [],
};

export const ReviewsSlice = createSlice({
	name: 'reviews',
	initialState,
	reducers: {
		// 点击选中表格中的一行
		setSelectedData: (state, action: PayloadAction<selectedDataType>) => {
			state.selectedData = action.payload;
		},
		// 增加筛选项
		setFilterItems: (state, action: PayloadAction<filterItemType>) => {
			state.filterItems[action.payload.item as keyof typeof state.filterItems] = action.payload.value;
		},
		// 勾选的行keys
		setSelectRowKeys: (state, action: PayloadAction<React.Key[]>) => {
			state.selectRowKeys = action.payload;
		},
		// 筛选
		filterData: (state, action: PayloadAction<string>) => {
			state.showData = state.dataSource.data;
			if (state.filterItems.Status && action.payload !== 'status')
				state.showData = state.showData.filter((item) => {
					return item.status === state.filterItems.Status.toLocaleLowerCase();
				});
			if (state.filterItems.Product && action.payload !== 'product')
				state.showData = state.showData.filter((item) => item.product === state.filterItems.Product);
			if (state.filterItems['Posted since'] && action.payload !== 'posted since')
				state.showData = state.showData.filter((item) => new Date(item.date).getTime() >= new Date(state.filterItems['Posted since']).getTime());
			if (state.filterItems['Posted before'] && action.payload !== 'posted before')
				state.showData = state.showData.filter((item) => new Date(item.date).getTime() < new Date(state.filterItems['Posted before']).getTime());
		},
		// 保存单个数据
		saveData: (state, action: PayloadAction<saveDataType>) => {
			for (let item of state.dataSource.data) {
				if (item.reviews_id === action.payload.key) {
					item.status = action.payload.status;
					item.comment = action.payload.comment;
					break;
				}
			}
			for (let item of state.showData) {
				if (item.reviews_id === action.payload.key) {
					item.status = action.payload.status;
					item.comment = action.payload.comment;
					break;
				}
			}
			localStorage.setItem('reviewDataSource', JSON.stringify(state.dataSource));
			localStorage.setItem('reviewTable', JSON.stringify({ data: state.showData }));
		},
		// 删除单个数据
		delData: (state, action: PayloadAction<string>) => {
			for (let index in state.dataSource.data) {
				if (state.dataSource.data[index].reviews_id === action.payload) {
					state.dataSource.data.splice(Number(index), 1);
					break;
				}
			}
			for (let index in state.showData) {
				if (state.showData[index].reviews_id === action.payload) {
					state.showData.splice(Number(index), 1);
					break;
				}
			}
			localStorage.setItem('reviewDataSource', JSON.stringify(state.dataSource));
			localStorage.setItem('reviewTable', JSON.stringify({ data: state.showData }));
		},
		// 批量改删数据
		batchChange: (state, action: PayloadAction<batchChangeStatusType>) => {
			const changeStatus = (str: string) => {
				action.payload.keys.forEach((key) => {
					for (let item of state.dataSource.data) {
						if (item.reviews_id === key) {
							item.status = str;
							break;
						}
					}
				});
				action.payload.keys.forEach((key) => {
					for (let item of state.showData) {
						if (item.reviews_id === key) {
							item.status = str;
							break;
						}
					}
				});
			};
			switch (action.payload.item) {
				case 'accepted':
					changeStatus('accepted');
					break;
				case 'pending':
					changeStatus('pending');
					break;
				case 'rejected':
					changeStatus('rejected');
					break;
				case 'delete':
					action.payload.keys.forEach((key) => {
						for (let index in state.dataSource.data) {
							if (state.dataSource.data[index].reviews_id === key) {
								state.dataSource.data.splice(Number(index), 1);
								break;
							}
						}
					});
					state.showData = state.dataSource.data;
				default:
					break;
			}
			localStorage.setItem('reviewDataSource', JSON.stringify(state.dataSource));
			localStorage.setItem('reviewTable', JSON.stringify({ data: state.showData }));
		},
	},
	extraReducers(builder) {
		builder.addCase(axiosReviews.fulfilled, (state, { payload }) => {
			state.dataSource = payload;
			state.showData = payload.data;
			localStorage.setItem('reviewDataSource', JSON.stringify(state.dataSource));
			localStorage.setItem('reviewTable', JSON.stringify({ data: state.showData }));
		});
	},
});

export const axiosReviews = createAsyncThunk('axiosReviews', async () => {
	let localDataSource = localStorage.getItem('reviewDataSource')!;
	if (localDataSource == null) return await reviewsGet();
	else return { data: JSON.parse(localDataSource).data };
});

export const { setSelectedData, setFilterItems, setSelectRowKeys, filterData, saveData, delData, batchChange } = ReviewsSlice.actions;

export default ReviewsSlice.reducer;
