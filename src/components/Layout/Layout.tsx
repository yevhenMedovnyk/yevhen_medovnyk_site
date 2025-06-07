import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

import s from './Layout.module.scss';
import Footer from '../Footer/Footer';
import MainTitle from '../MainTitle/MainTitle';
import BurgerMenu from '../Header/BurgerMenu/BurgerMenu';

const Layout = () => {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

	const handleBurgerMenuClick = () => {
		setIsBurgerMenuOpen((prevIsOpen) => !prevIsOpen);
	};

	return (
		<div className={s.LayoutContainer}>
			{isBurgerMenuOpen && (
				<BurgerMenu
					handleBurgerMenuClick={handleBurgerMenuClick}
					isBurgerMenuOpen={isBurgerMenuOpen}
				/>
			)}
			<Header handleBurgerMenuClick={handleBurgerMenuClick} isBurgerMenuOpen={isBurgerMenuOpen} />
			<MainTitle />
			<main className={s.main}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
