import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface globalData {
	collapsed: boolean;
	contentClass: string;
	bread: string;
	selectedNaviKey: string;
}

const initialState: globalData = {
	// 侧方导航折叠
	collapsed: false,
	// 导航折叠与否时，content的样式
	contentClass: '',
	// 面包屑的名字
	bread: localStorage.getItem('navigate') == null ? 'dashboard' : (localStorage.getItem('navigate') as string),
	selectedNaviKey: localStorage.getItem('navigate') ? (localStorage.getItem('navigate') as string) : 'dashboard',
};

export const GlobalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setCollapsed: (state) => {
			state.collapsed = !state.collapsed;
			state.contentClass = state.collapsed ? 'content-large' : '';
		},
		setBread: (state, action: PayloadAction<string>) => {
			state.bread = action.payload;
		},
		setSelectedNaviKey: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
            
			state.selectedNaviKey = action.payload;
		},
	},
});

export const { setCollapsed, setBread, setSelectedNaviKey } = GlobalSlice.actions;

export default GlobalSlice.reducer;
