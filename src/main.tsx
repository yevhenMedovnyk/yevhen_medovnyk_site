import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './firebase.ts';

import App from './App.tsx';
import './index.scss';
import { store } from './redux/store.ts';
import { AuthContextProvider } from './hooks/useAuth.tsx';

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<AuthContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthContextProvider>
	</Provider>
);
