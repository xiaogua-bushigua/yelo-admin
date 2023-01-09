import service from './index';
import type { customerResType } from '@/types/customer';
import type { reviewsResType } from '@/types/review';
import type { salesResType, personalInfoType } from '@/types/sales';
import type { loginResType, loginReqType } from '@/types/login';
import type { dashCustomersType, dashReviewsType, dashOrdersType, dashRevenueType } from '@/types/dashboard';

// 登录页所需
export const loginPost = (loginReqData: loginReqType): Promise<loginResType> => service.post('/login', loginReqData);
// reviews页所需
export const reviewsGet = (): Promise<reviewsResType> => service.get('/reviews');
// customer页所需
export const customersGet = (): Promise<customerResType> => service.get('/customers');
// sales页所需
export const salesGet = (): Promise<salesResType> => service.get('/sales');
export const personalInfoPost = (customerId: string): Promise<personalInfoType> => service.post('/sales/getPersonalInfo', customerId);
// dashboard页所需
export const dashCustomersGet = (): Promise<dashCustomersType> => service.get('/dashboard/customers')
export const dashReviewsGet = (): Promise<dashReviewsType> => service.get('/dashboard/reviews')
export const dashOrdersGet = (): Promise<dashOrdersType> => service.get('/dashboard/orders')
export const dashRevenueGet = (): Promise<dashRevenueType> => service.get('/dashboard/revenue')