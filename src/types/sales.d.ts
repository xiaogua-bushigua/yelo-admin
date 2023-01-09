// sales页所需
export interface buyItemsType {
  product: string,
  status: string,
  unitPrice: number,
  quantity: number,
  taxe: number,
  totalSolo: number
}

export interface salesType {
  orderCode: string,
  date: string,
  customer: string,
  customerId: string,
  address: string,
  totalDeliveryFees: number,
  totalExPrices: number,
  totalTaxes: number,
  buyItems: Array<buyItemsType>
}

export interface salesResType {
  data: Array<salesType>
}
export interface personalInfoType {
  data: {
    phoneNumber: string;
    email: string;
  }
}
interface cardDataType {
  status: string;
  product: string;
  unitPrice: number;
  quantity: number;
  total: number;
}
export interface invoiceTableDataType {
  orderCode: string;
  date: string;
  customer: string;
  customerId: string,
  address: string;
  totalExTaxe: number;
  deliveryFee: number;
  Taxe: number;
  total: number;
  cardInfo: Array<cardDataType>
}
export interface orderTableDataType {
    ordered: salesResType;
    delivered: salesResType;
    canceled: salesResType;
}

