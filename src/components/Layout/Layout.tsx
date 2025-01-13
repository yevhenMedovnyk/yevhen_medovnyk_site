import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

import s from './Layout.module.scss';
import Footer from '../Footer/Footer';

const Layout: React.FC = () => {
	return (
		<div className={s.container}>
			<Header />
			<main className={s.main}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
