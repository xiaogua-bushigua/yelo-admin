import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface baseColorItem {
  primaryColor: string
}

interface globalData {
	collapsed: boolean;
	contentClass: string;
	bread: string;
	selectedNaviKey: string;
  theme: string;
  themeColor: {
    light: baseColorItem
    dark: baseColorItem
  }
}

const initialState: globalData = {
	// 侧方导航折叠
	collapsed: false,
	// 导航折叠与否时，content的样式
	contentClass: '',
	// 面包屑的名字
	bread: localStorage.getItem('navigate') == null ? 'dashboard' : (localStorage.getItem('navigate') as string),
	selectedNaviKey: localStorage.getItem('navigate') ? (localStorage.getItem('navigate') as string) : 'dashboard',
  theme: 'light',
  themeColor: {
    light: {
      primaryColor: '#4e3cc9',
    },
    dark: {
      primaryColor: 'black',
    }
  }
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
			state.selectedNaviKey = action.payload;
		},
    changeTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    }
	},
});

export const { setCollapsed, setBread, setSelectedNaviKey, changeTheme } = GlobalSlice.actions;

export default GlobalSlice.reducer;
