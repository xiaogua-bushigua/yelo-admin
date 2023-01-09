export interface  dashCustomersType {
  data: string[]
}

export interface dashReviewsType {
  data: Array<{name: string, review: string}>
}

export interface dashOrdersType {
  data: Array<{name: string, items: number, money: number, date: string}>
}

export interface dashRevenueType {
  data: Array<Array<number>>
}