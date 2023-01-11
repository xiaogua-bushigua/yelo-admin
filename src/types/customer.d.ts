
// customer页所需
export interface personalInfoType {
	lastName: string;
	firstName: string;
	email: string;
	phoneNumber: string;
	address: string;
	birthday: string;
	zipcode: string;
	originalPwd: string;
	city: string;
	province: string;
}
export interface baseHistoryInfoType {
	firstSeen: string;
	lastSeen: string;
	ordersNum: number;
}
export interface reviewType {
	reviewId: string;
	product: string;
	date: string;
	status: string;
	comment: string;
	rating: number;
	spent: number;
}
export interface customerType {
	customerId: string;
	personalInfo: personalInfoType;
	baseHistory: baseHistoryInfoType;
	ordersInfo: Array<reviewType>;
}
export interface tableShowDataType {
	customer_id: string;
	customer: string;
	last_seen: string;
	orders: number;
	total_spent: number;
	last_purchase: string;
	phone_number: string;
	address: string;
}
export interface customerResType {
	data: Array<customerType>;
}
export interface savedItems {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	address: string;
	email: string;
	province: string;
	zipcode: string;
	password: string;
}
export interface filterItemsType {
	provinces: Array<{
		item: string;
		checked: boolean;
	}>;
	lastVisited: Array<{
		item: string;
		checked: boolean;
	}>;
	totalSpent: Array<{
		item: string;
		checked: boolean;
	}>;
  savedQuery: Array<{
		item: string;
		checked: boolean;
	}>;
  randomSearch: Array<{
		item: string;
		checked: boolean;
	}>;
}
