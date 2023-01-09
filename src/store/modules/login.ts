import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginPost } from '@/request/api';
import { store } from '@/store/index';

interface loginDataType {
	// 用户名和密码
	username: string;
	password: string;
}

const initialState: loginDataType = {
	username: '',
	password: '',
};

export const LoginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setName: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		setPwd: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(axiosLogin.fulfilled, (state, { payload }) => {
			localStorage.setItem('token', payload.token!);
			localStorage.setItem('username', state.username);
		});
	},
});

export const axiosLogin = createAsyncThunk('axiosLogin', async () => {
	let loginData = store.getState().login;
  if(localStorage.getItem('token')) return {token: localStorage.getItem('token')}
	else return await loginPost(loginData);
});

export const { setName, setPwd } = LoginSlice.actions;

export default LoginSlice.reducer;
