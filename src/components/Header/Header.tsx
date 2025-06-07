import React from 'react';
import s from './Header.module.scss';
import NavLinks from '../NavLinks/NavLinks';
import Logo from './Logo/Logo';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import BurgerOpenBtn from './BurgerOpenBtn/BurgerOpenBtn';
import BurgerMenu from './BurgerMenu/BurgerMenu';

const Header: React.FC = () => {
	const { isTablet } = useMediaQuery();
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

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
