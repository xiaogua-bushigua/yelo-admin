import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { salesGet, personalInfoPost } from '@/request/api';
import { salesResType, invoiceTableDataType, orderTableDataType, salesType } from '@/types/sales';
import { store } from '@/store/index';

interface filterType {
	item: string;
	value: string;
}
interface filterItemsType {
	'Passed since': string;
	'Passed before': string;
}
const dataSourceInit = {
	data: [
		{
			orderCode: '',
			date: '',
			customer: '',
			customerId: '',
			address: '',
			totalDeliveryFees: 0,
			totalExPrices: 0,
			totalTaxes: 0,
			buyItems: [
				{
					product: '',
					status: '',
					unitPrice: 0,
					quantity: 0,
					taxe: 0,
					totalSolo: 0,
				},
			],
		},
	],
};
interface salesData {
	dataSource: salesResType;
	orderTableData: orderTableDataType;
	invoiceTableData: Array<invoiceTableDataType>;
	selectInvoiceRowKeys: React.Key[];
	selectOrderRowKeys: React.Key[];
	filterItems: filterItemsType;
	nowMenu: string;
	orderClickedRowKey: string;
	orderClickedRowInfo: salesType;
	orderClickedRowPersonalInfo: { phoneNumber: string; email: string };
	searchItem: string;
	columnShow: {
		Order: boolean;
		Customer: boolean;
		Address: boolean;
		'Total Ex Taxe': boolean;
		'Delivery Fees': boolean;
		Taxes: boolean;
	};
}
const initialState: salesData = {
	dataSource: dataSourceInit,
	orderTableData: {
		ordered: dataSourceInit,
		delivered: dataSourceInit,
		canceled: dataSourceInit,
	},
	nowMenu: 'ordered',
	invoiceTableData: [
		{
			orderCode: '',
			date: '',
			customer: '',
			customerId: '',
			address: '',
			totalExTaxe: 0,
			deliveryFee: 0,
			Taxe: 0,
			total: 0,
			cardInfo: [
				{
					status: '',
					product: '',
					unitPrice: 0,
					quantity: 0,
					total: 0,
				},
			],
		},
	],
	selectInvoiceRowKeys: [],
	selectOrderRowKeys: [],
	filterItems: {
		'Passed since': '',
		'Passed before': '',
	},
	orderClickedRowKey: '',
	orderClickedRowInfo: {
		orderCode: '',
		date: '',
		customer: '',
		customerId: '',
		address: '',
		totalDeliveryFees: 0,
		totalExPrices: 0,
		totalTaxes: 0,
		buyItems: [],
	},
	orderClickedRowPersonalInfo: {
		phoneNumber: '',
		email: '',
	},
	searchItem: '',
	columnShow: {
		Order: true,
		Customer: true,
		Address: true,
		'Total Ex Taxe': true,
		'Delivery Fees': true,
		Taxes: true,
	},
};

export const SalesSlice = createSlice({
	name: 'sales',
	initialState,
	reducers: {
		setFilterItems: (state, action: PayloadAction<filterType>) => {
			state.filterItems[action.payload.item as keyof typeof state.filterItems] = action.payload.value;
		},
		filterData: (state) => {
			state.invoiceTableData = JSON.parse(localStorage.getItem('saleInvoiceShowData')!).data;
			if (state.filterItems['Passed since'])
				state.invoiceTableData = state.invoiceTableData.filter(
					(item) => new Date(item.date).getTime() >= new Date(state.filterItems['Passed since']).getTime()
				);
			if (state.filterItems['Passed before'])
				state.invoiceTableData = state.invoiceTableData.filter(
					(item) => new Date(item.date).getTime() < new Date(state.filterItems['Passed before']).getTime()
				);
		},
		setInvoiceSelectRowKeys: (state, action: PayloadAction<React.Key[]>) => {
			state.selectInvoiceRowKeys = action.payload;
		},
		setNowMenu: (state, action: PayloadAction<string>) => {
      state.nowMenu = (localStorage.getItem('nowMenu') ? localStorage.getItem('nowMenu') : action.payload)!
			localStorage.setItem('nowMenu', action.payload)
		},
		setOrderSelectRowKeys: (state, action: PayloadAction<React.Key[]>) => {
			state.selectOrderRowKeys = action.payload;
		},
		batchInvoiceDel: (state, action: PayloadAction<React.Key[]>) => {
			action.payload.forEach((key) => {
				for (let index in state.dataSource.data) {
					if (state.dataSource.data[index].orderCode === key) {
						state.dataSource.data.splice(Number(index), 1);
						state.invoiceTableData.splice(Number(index), 1);
						break;
					}
				}
			});
			localStorage.setItem('saleDataSource', JSON.stringify(state.dataSource));
			localStorage.setItem('saleInvoiceShowData', JSON.stringify({ data: state.invoiceTableData }));
		},
		batchOrderDel: (state, action: PayloadAction<React.Key[]>) => {
			action.payload.forEach((key) => {
				let index = 0;
				for (let item of state.orderTableData[state.nowMenu as keyof typeof state.orderTableData].data) {
					if (item.orderCode === key) {
						state.orderTableData[state.nowMenu as keyof typeof state.orderTableData].data.splice(index, 1);
						break;
					}
					index += 1;
				}
			});
			localStorage.setItem('saleOrderShowData', JSON.stringify({ data: state.orderTableData }));
		},
		saveClickedTableRow: (state, action: PayloadAction<string>) => {
			state.orderClickedRowKey = action.payload;
			for (let item of state.dataSource.data) {
				if (item.orderCode === state.orderClickedRowKey) {
					state.orderClickedRowInfo = {
						orderCode: item.orderCode,
						date: item.date,
						customer: item.customer,
						customerId: item.customerId,
						address: item.address,
						totalDeliveryFees: item.totalDeliveryFees,
						totalExPrices: item.totalExPrices,
						totalTaxes: item.totalTaxes,
						buyItems: item.buyItems,
					};
					localStorage.setItem('orderClickedRowInfo', JSON.stringify({ data: state.orderClickedRowInfo }));
					break;
				}
			}
		},
		// info页保存
		saveInfo: (state, action: PayloadAction<{}>) => {
			for (let item of state.dataSource.data) {
				if (item.orderCode === state.orderClickedRowKey) {
					Object.keys(action.payload).forEach((i) => {
						item.buyItems[Number(i)].status = action.payload[i as keyof typeof action.payload];
					});
					break;
				}
			}
			localStorage.setItem('saleDataSource', JSON.stringify(state.dataSource));
		},
		// info页删除
		delInfo: (state) => {
			for (let index in state.dataSource.data) {
				if (state.dataSource.data[index].orderCode === state.orderClickedRowKey) {
					state.dataSource.data.splice(Number(index), 1);
					break;
				}
			}
			let index = 0;
			for (let item of state.orderTableData[state.nowMenu as keyof typeof state.orderTableData].data) {
				if (item.orderCode === state.orderClickedRowKey) {
					state.orderTableData[state.nowMenu as keyof typeof state.orderTableData].data.splice(index, 1);
				}
				index += 1;
			}
			localStorage.setItem('saleDataSource', JSON.stringify(state.dataSource));
			localStorage.setItem('saleOrderShowData', JSON.stringify(state.orderTableData));
		},
		// order页搜索
		getSearchItem: (state, action: PayloadAction<string>) => {
			state.searchItem = action.payload;
		},
		orderSearch: (state) => {
			const filterTable = (item: string) => {
				state.orderTableData[item as keyof typeof state.orderTableData].data = [];
				state.orderTableData[item as keyof typeof state.orderTableData].data = JSON.parse(localStorage.getItem('saleOrderShowData')!).ordered.data;
				state.orderTableData[item as keyof typeof state.orderTableData].data = state.orderTableData.ordered.data.filter(
					(item) => item.address.includes(state.searchItem) || item.customer.includes(state.searchItem) || item.orderCode.includes(state.searchItem)
				);
			};
			filterTable('ordered');
			filterTable('delivered');
			filterTable('canceled');
		},
		setColumnShow: (state, action: PayloadAction<string>) => {
			Object.keys(state.columnShow).forEach((item) => {
				if (item === action.payload) {
					state.columnShow[item as keyof typeof state.columnShow] = !state.columnShow[item as keyof typeof state.columnShow];
				}
			});
		},
	},
	extraReducers(builder) {
		builder.addCase(axiosSales.fulfilled, (state, { payload }) => {
			state.dataSource.data = payload.data;
			state.dataSource.data.forEach((item, index) => {
				state.invoiceTableData[index] = {
					date: item.date,
					customer: item.customer,
					customerId: item.customerId,
					address: item.address,
					orderCode: item.orderCode,
					totalExTaxe: item.totalExPrices,
					deliveryFee: item.totalDeliveryFees,
					Taxe: item.totalTaxes,
					total: item.totalDeliveryFees + item.totalExPrices + item.totalTaxes,
					cardInfo: item.buyItems?.map((i) => {
						return {
							status: i.status,
							product: i.product,
							unitPrice: i.unitPrice,
							quantity: i.quantity,
							total: i.quantity * i.unitPrice,
						};
					}),
				};
			});
			const getOrderTableData = (type: string) => {
				state.orderTableData[type as keyof typeof state.orderTableData].data = state.dataSource.data.map((item) => {
					let newBuyItems = item.buyItems.filter((o) => o.status === type);
					return { ...item, buyItems: newBuyItems };
				});
				state.orderTableData[type as keyof typeof state.orderTableData].data = state.orderTableData[
					type as keyof typeof state.orderTableData
				].data.filter((item) => item.buyItems.length !== 0);
				state.orderTableData[type as keyof typeof state.orderTableData].data.forEach((item) => {
					item.buyItems.filter((i) => i.status === type);
				});
			};
			if (localStorage.getItem('saleOrderShowData')) {
				state.orderTableData = JSON.parse(localStorage.getItem('saleOrderShowData')!).data;
			} else {
				getOrderTableData('delivered');
				getOrderTableData('ordered');
				getOrderTableData('canceled');
				localStorage.setItem('saleOrderShowData', JSON.stringify({ data: state.orderTableData }));
			}
			localStorage.setItem('saleDataSource', JSON.stringify(state.dataSource));
			localStorage.setItem('saleInvoiceShowData', JSON.stringify({ data: state.invoiceTableData }));
		});
		builder.addCase(axiosGetPersonalInfo.fulfilled, (state, { payload }) => {
			state.orderClickedRowPersonalInfo = payload.data;
		});
	},
});

export const axiosSales = createAsyncThunk('axiosSales', async () => {
	if (localStorage.getItem('saleDataSource'))
		return {
			data: JSON.parse(localStorage.getItem('saleDataSource')!).data,
		};
	else return await salesGet();
});

export const axiosGetPersonalInfo = createAsyncThunk('axiosGetPersonalInfo', async () => {
	return await personalInfoPost(store.getState().sales.orderClickedRowInfo.customerId);
});

export const {
	setFilterItems,
	filterData,
	setInvoiceSelectRowKeys,
	batchInvoiceDel,
	setOrderSelectRowKeys,
	setNowMenu,
	batchOrderDel,
	saveClickedTableRow,
	saveInfo,
	delInfo,
	orderSearch,
	getSearchItem,
	setColumnShow,
} = SalesSlice.actions;

export default SalesSlice.reducer;
