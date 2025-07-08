import React from 'react';
import s from './Header.module.scss';
import NavLinks from '../NavLinks/NavLinks';
import Logo from './Logo/Logo';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import BurgerOpenBtn from './BurgerOpenBtn/BurgerOpenBtn';
import BurgerMenu from './BurgerMenu/BurgerMenu';

import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
	const { isTablet } = useMediaQuery();
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);
	const { pathname } = useLocation();

	const isShowCartIcon = () => pathname.startsWith('/store') || pathname === '/cart';

	const handleBurgerMenuClick = () => {
		setIsBurgerMenuOpen(!isBurgerMenuOpen);
	};

	const handleBurgerLinkClick = () => {
		setIsBurgerMenuOpen(false);
	};

	return (
		<header className={s.container}>
			<Logo />
			{!isTablet && <NavLinks />}
			{isShowCartIcon() && (
				<Link to="/cart" className={s.cartIconContainer}>
					<PiShoppingCartSimpleFill className={s.cartIcon} />
				</Link>
			)}
			{isTablet && (
				<BurgerMenu
					isBurgerMenuOpen={isBurgerMenuOpen}
					handleBurgerLinkClick={handleBurgerLinkClick}
				/>
			)}
			{isTablet && (
				<BurgerOpenBtn
					isBurgerMenuOpen={isBurgerMenuOpen}
					handleBurgerMenuClick={handleBurgerMenuClick}
				/>
			)}
		</header>
	);
};

export default Header;
