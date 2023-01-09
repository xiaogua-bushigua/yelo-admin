import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css';
import '@/assets/styles/global.scss';
import { BrowserRouter, HashRouter  } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
			<HashRouter>
				<App />
			</HashRouter>
	</Provider>
);
