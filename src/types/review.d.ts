// reviews页所需
export interface selectedDataType {
	customer: string;
	customer_id: string;
	reviews_id: string;
	date: string;
	rating: number;
	product: string;
	comment: string;
	status: string;
}
export interface reviewsResType {
	data: Array<selectedDataType>;
}
export interface filterItemsType {
	Status: string;
	Product: string;
	'Posted since': string;
	'Posted before': string;
}
export interface saveDataType {
	key: string;
	status: string;
	comment: string;
}