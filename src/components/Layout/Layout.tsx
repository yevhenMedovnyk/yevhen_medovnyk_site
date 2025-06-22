import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

import s from './Layout.module.scss';
import Footer from '../Footer/Footer';
import MainTitle from '../MainTitle/MainTitle';
import { useScrollToTopOnRouteChange } from '../../hooks/useScrollToTopOnRouteChange';
import { Toaster } from 'sonner';

const Layout = () => {
	useScrollToTopOnRouteChange();

	return (
		<div className={s.LayoutContainer}>
			<Toaster duration={2000} />
			<Header />
			<MainTitle />
			<main className={s.main}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
