import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { customersGet } from '@/request/api';
import {
	customerType,
	tableShowDataType,
	personalInfoType,
	filterItemsType,
} from '@/types/customer';

interface customersData {
	tableData: Array<tableShowDataType>;
	dataSource: Array<customerType>;
	clickedTableData: customerType;
	filterItems: filterItemsType;
	selectRowKeys: React.Key[];
}

const initialState: customersData = {
	tableData: [] as Array<tableShowDataType>,
	dataSource: [] as Array<customerType>,
	// 被选中的行数据
	clickedTableData: {} as customerType,
	// 筛选项有关的
	filterItems: {
		provinces: [
			{
				item: '江苏',
				checked: false,
			},
			{
				item: '甘肃',
				checked: false,
			},
			{
				item: '海南',
				checked: false,
			},
			{
				item: '新疆',
				checked: false,
			},
			{
				item: '西藏',
				checked: false,
			},
			{
				item: '台湾',
				checked: false,
			},
			{
				item: '香港',
				checked: false,
			},
			{
				item: '澳门',
				checked: false,
			},
			{
				item: '福建',
				checked: false,
			},
			{
				item: '四川',
				checked: false,
			},
			{
				item: '重庆',
				checked: false,
			},
			{
				item: '天津',
				checked: false,
			},
			{
				item: '北京',
				checked: false,
			},
			{
				item: '上海',
				checked: false,
			},
			{
				item: '广西',
				checked: false,
			},
			{
				item: '广东',
				checked: false,
			},
			{
				item: '宁夏',
				checked: false,
			},
			{
				item: '江西',
				checked: false,
			},
			{
				item: '山东',
				checked: false,
			},
			{
				item: '湖南',
				checked: false,
			},
			{
				item: '湖北',
				checked: false,
			},
			{
				item: '安徽',
				checked: false,
			},
			{
				item: '河南',
				checked: false,
			},
			{
				item: '河北',
				checked: false,
			},
			{
				item: '黑龙江',
				checked: false,
			},
			{
				item: '吉林',
				checked: false,
			},
			{
				item: '辽宁',
				checked: false,
			},
			{
				item: '内蒙古',
				checked: false,
			},
			{
				item: '云南',
				checked: false,
			},
			{
				item: '贵州',
				checked: false,
			},
			{
				item: '陕西',
				checked: false,
			},
			{
				item: '山西',
				checked: false,
			},
			{
				item: '青海',
				checked: false,
			},
		],
		lastVisited: [
			{
				item: 'This Year',
				checked: false,
			},
			{
				item: 'Last Year',
				checked: false,
			},
			{
				item: 'Within Three Years',
				checked: false,
			},
			{
				item: 'Earlier',
				checked: false,
			},
		],
		totalSpent: [
			{ item: '1 to 100', checked: false },
			{ item: '100 to 200', checked: false },
			{ item: '200 to 500', checked: false },
			{ item: 'Beyond 500', checked: false },
		],
		// 自定义的筛选项
		savedQuery: (localStorage.getItem('customerSavedQuery')
			? JSON.parse(localStorage.getItem('customerSavedQuery')!).data
			: []) as Array<{ item: string; checked: boolean }>,
		randomSearch: [] as Array<{ item: string; checked: boolean }>,
	} as filterItemsType,
	// 勾选的行keys
	selectRowKeys: [],
};

interface savedItemsType {
	[key: string]: string;
}

export const CustomersSlice = createSlice({
	name: 'customers',
	initialState,
	reducers: {
		// 保存点击的行数据
		saveClickTableRow: (state, action: PayloadAction<string>) => {
			for (let item of state.dataSource) {
				if (item.customerId === action.payload) {
					state.clickedTableData = item;
					localStorage.setItem(
						'customerClickedTableData',
						JSON.stringify({ data: item })
					);
					break;
				}
			}
		},
		// 保存修改后的个人信息
		saveModifiedData: (state, action: PayloadAction<savedItemsType>) => {
			for (let item of state.dataSource) {
				if (item.customerId == action.payload.customer_id) {
					Object.keys(action.payload).forEach((key) => {
						if (Object.keys(item.personalInfo).indexOf(key) != -1) {
							item.personalInfo[key as keyof personalInfoType] =
								action.payload[key];
						}
						if (key == 'password')
							item.personalInfo.originalPwd =
								action.payload.password;
					});
					break;
				}
			}
			for (let item of state.tableData) {
				if (item.customer_id == action.payload.customer_id) {
					item.address = action.payload.address;
					item.customer =
						action.payload.lastName + action.payload.firstName;
					item.phone_number = action.payload.phoneNumber;
					break;
				}
			}
			localStorage.setItem(
				'customerDataSource',
				JSON.stringify({ data: state.dataSource })
			);
			localStorage.setItem(
				'customerTable',
				JSON.stringify({ data: state.tableData })
			);
		},
		// 删除个人信息
		delModifiedData: (state, action: PayloadAction<string>) => {
			for (let index in state.dataSource) {
				if (state.dataSource[index].customerId == action.payload) {
					state.dataSource.splice(Number(index), 1);
					state.tableData.splice(Number(index), 1);
					break;
				}
			}
			localStorage.setItem(
				'customerDataSource',
				JSON.stringify({ data: state.dataSource })
			);
			localStorage.setItem(
				'customerTable',
				JSON.stringify({ data: state.tableData })
			);
		},
		// 确定勾选的行keys
		setSelectRowKeys: (state, action: PayloadAction<React.Key[]>) => {
			state.selectRowKeys = action.payload;
		},
		// 批量删除
		batchDel: (state, action: PayloadAction<React.Key[]>) => {
			action.payload.forEach((key) => {
				for (let index in state.dataSource) {
					if (state.dataSource[index].customerId === key) {
						state.dataSource.splice(Number(index), 1);
						state.tableData.splice(Number(index), 1);
						break;
					}
				}
			});
			localStorage.setItem(
				'customerDataSource',
				JSON.stringify({ data: state.dataSource })
			);
			localStorage.setItem(
				'customerTable',
				JSON.stringify({ data: state.tableData })
			);
		},
		// 确定自定义的筛选项
		setSavedQuery: (state, action: PayloadAction<string>) => {
			state.filterItems.savedQuery.push({
				item: action.payload,
				checked: false,
			});
			localStorage.setItem(
				'customerSavedQuery',
				JSON.stringify({ data: state.filterItems.savedQuery })
			);
		},
		// 删除自定义的筛选项
		delSaveFilterItem: (state, action: PayloadAction<string>) => {
			for (let index in state.filterItems.savedQuery) {
				if (
					state.filterItems.savedQuery[index].item === action.payload
				) {
					state.filterItems.savedQuery.splice(Number(index), 1);
					break;
				}
			}
			localStorage.setItem(
				'customerSavedQuery',
				JSON.stringify({ data: state.filterItems.savedQuery })
			);
		},
		// 清除列表
		clearTable: (state) => {
			state.tableData = [];
			state.tableData = JSON.parse(
				localStorage.getItem('customerTable')!
			).data;
			state.filterItems.provinces.forEach((item) => {
				item.checked = false;
			});
		},
		// 确定点击的筛选项
		setClickedItems: (
			state,
			action: PayloadAction<{ title: string; value: string }>
		) => {
			//1. 每次筛选前都要重置下表格
			state.tableData = [];
			state.tableData = JSON.parse(
				localStorage.getItem('customerTable')!
			).data;
			//2. 处理可以多选的筛选项，将查询项添加到filterItems
			if (
				action.payload.title == 'totalSpent' ||
				action.payload.title == 'savedQuery'
			) {
				state.filterItems[
					action.payload.title as keyof typeof state.filterItems
				].forEach((obj) => {
					if (obj.item === action.payload.value)
						obj.checked = !obj.checked;
				});
			} else if (
				action.payload.title == 'lastVisited' ||
				action.payload.title == 'provinces'
			) {
				state.filterItems[
					action.payload.title as keyof typeof state.filterItems
				].forEach((obj) => {
					if (obj.item === action.payload.value)
						obj.checked = !obj.checked;
					else obj.checked = false;
				});
			} else {
				state.filterItems.randomSearch = [];
				state.filterItems.randomSearch.push({
					item: action.payload.value,
					checked: true,
				});
			}
			// 当点击 Beyond 500时，清空totalSpent别的选择项
			let beyond500Flag = false;
			state.filterItems.totalSpent.forEach((item) => {
				if (item.item === 'Beyond 500' && item.checked)
					beyond500Flag = true;
			});
			if (beyond500Flag)
				state.filterItems.totalSpent.forEach((item) => {
					if (item.item !== 'Beyond 500') item.checked = false;
				});
			//3. 处理provinces的单项选择，修改要显示的表格数据
			state.filterItems.provinces.forEach((p) => {
				if (p.checked) {
					state.tableData = state.tableData.filter((o) => {
						return o.address.includes(p.item);
					});
				}
			});
			//4. 处理lastVisited的单项选择，修改要显示的表格数据
			state.filterItems.lastVisited.forEach((p) => {
				if (p.checked) {
					state.tableData = state.tableData.filter((o) => {
						let nowYear = new Date().getFullYear();
						let lastYear = Number(nowYear - 1);
						let threeYearago = Number(nowYear - 3);
						switch (p.item) {
							case 'This Year':
								return (
									o.last_seen.replace(/-/g, '/') >=
										nowYear + '-01-01'.replace(/-/g, '/') &&
									o.last_seen.replace(/-/g, '/') <=
										nowYear + '-12-31'.replace(/-/g, '/')
								);
							case 'Last Year':
								return (
									o.last_seen.replace(/-/g, '/') >=
										lastYear +
											'-01-01'.replace(/-/g, '/') &&
									o.last_seen.replace(/-/g, '/') <=
										lastYear + '-12-31'.replace(/-/g, '/')
								);
							case 'Within Three Years':
								return (
									o.last_seen.replace(/-/g, '/') >=
										threeYearago +
											'-01-01'.replace(/-/g, '/') &&
									o.last_seen.replace(/-/g, '/') <=
										nowYear + '-12-31'.replace(/-/g, '/')
								);
							case 'Earlier':
								return (
									o.last_seen.replace(/-/g, '/') <
									threeYearago + '-01-01'.replace(/-/g, '/')
								);
							default:
								break;
						}
					});
				}
			});
			//5. 处理totalSpent的多项选择，修改要显示的表格数据
			let queries = [] as string[];
			state.filterItems.totalSpent.forEach((p) => {
				if (p.checked) {
					queries.push(p.item);
				}
			});
			let num = [] as number[];
			queries.forEach((item) => {
				if (item.split(' ').length === 3) {
					num.push(Number(item.split(' ')[0]));
					num.push(Number(item.split(' ')[2]));
				} else if (item.split(' ').length === 2) {
					num.push(Number(item.split(' ')[1]) + 1);
				}
			});
			num = num.sort();
			let start = 0;
			let end = 0;
			if (num.length != 0 && num[0] != 501) {
				start = num[0];
				end = num[num.length - 1];
			} else if (num[0] == 501) {
				start = 501;
				end = 502;
			}
			if (start != 0) {
				state.tableData = state.tableData.filter((o) => {
					if (start != 501)
						return o.total_spent <= end && o.total_spent > start;
					else if (start == 501 && end == 502)
						return o.total_spent >= start;
				});
			}
			//6. 处理输入框的随机查询，修改要显示的表格数据
			if (state.filterItems.randomSearch[0]?.checked) {
				let query = state.filterItems.randomSearch[0].item;
				state.tableData = state.tableData.filter((item) => {
					return (
						item.address.includes(query) ||
						item.customer.includes(query) ||
						item.last_purchase.includes(query) ||
						item.last_seen.includes(query) ||
						item.phone_number.includes(query)
					);
				});
			}
			//7. 处理存储的查询项，修改要显示的表格数据
			state.filterItems.savedQuery.forEach((query) => {
				if (query.checked) {
					state.tableData = state.tableData.filter((item) => {
						return (
							item.address.includes(query.item) ||
							item.customer.includes(query.item) ||
							item.last_purchase.includes(query.item) ||
							item.last_seen.includes(query.item) ||
							item.phone_number.includes(query.item)
						);
					});
				}
			});
		},
		// 创造一个用户
		createCustomer: (state, action: PayloadAction<customerType>) => {
			state.dataSource.unshift(action.payload);
			localStorage.setItem(
				'customerDataSource',
				JSON.stringify({ data: state.dataSource })
			);
			let temp = {} as tableShowDataType;
			temp.address = action.payload.personalInfo.address;
			temp.phone_number = action.payload.personalInfo.phoneNumber;
			temp.last_seen = action.payload.baseHistory.lastSeen;
			temp.last_purchase = action.payload.baseHistory.lastSeen;
			temp.orders = action.payload.baseHistory.ordersNum;
			temp.total_spent = 0;
			temp.customer =
				action.payload.personalInfo.lastName +
				action.payload.personalInfo.firstName;
			temp.customer_id = action.payload.customerId;
			state.tableData.unshift(temp);
			localStorage.setItem(
				'customerTable',
				JSON.stringify({ data: state.tableData })
			);
		},
	},
	extraReducers(builder) {
		builder.addCase(axiosCustomers.fulfilled, (state, { payload }) => {
			state.tableData = [];
			state.dataSource = payload.data;
			localStorage.setItem(
				'customerDataSource',
				JSON.stringify({ data: state.dataSource })
			);
			state.dataSource.forEach((item) => {
				let count = 0;
				item.ordersInfo.forEach((item) => {
					count += item.spent;
				});
				state.tableData.push({
					customer_id: item.customerId,
					customer:
						item.personalInfo.lastName +
						item.personalInfo.firstName,
					last_purchase: item.baseHistory.lastSeen,
					orders: item.baseHistory.ordersNum,
					total_spent: count,
					last_seen:
						Number(item.baseHistory.lastSeen.slice(0, 4)) +
						1 +
						item.baseHistory.lastSeen.slice(4),
					phone_number: item.personalInfo.phoneNumber,
					address: item.personalInfo.address,
				});
			});
			localStorage.setItem(
				'customerTable',
				JSON.stringify({ data: state.tableData })
			);
		});
	},
});

export const axiosCustomers = createAsyncThunk('axiosCustomers', async () => {
	let localDataSource = localStorage.getItem('customerDataSource')!;
	if (localDataSource == null)
		return await customersGet();
	else return { data: JSON.parse(localDataSource).data };
});

export const {
	saveClickTableRow,
	saveModifiedData,
	delModifiedData,
	setClickedItems,
	setSavedQuery,
	clearTable,
	delSaveFilterItem,
	createCustomer,
	setSelectRowKeys,
	batchDel,
} = CustomersSlice.actions;

export default CustomersSlice.reducer;
