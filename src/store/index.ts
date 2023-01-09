import { configureStore } from '@reduxjs/toolkit';
import login from './modules/login';
import global from './modules/global';
import reviews from './modules/reviews';
import customers from './modules/customers';
import sales from './modules/sales';
import dashboard from './modules/dashboard';

export const store = configureStore({
	reducer: {
		global,
		login,
		reviews,
		customers,
    sales,
    dashboard
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
