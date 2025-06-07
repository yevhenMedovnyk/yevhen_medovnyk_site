import React, { useEffect } from 'react';
import s from './BurgerMenu.module.scss';
import NavLinks from '../../NavLinks/NavLinks';
import Logo from '../Logo/Logo';
import clsx from 'clsx';

interface IBurgerMenuProps {
	isBurgerMenuOpen: boolean;
	handleBurgerLinkClick: () => void;
}

const BurgerMenu: React.FC<IBurgerMenuProps> = ({
	isBurgerMenuOpen = false,
	handleBurgerLinkClick,
}) => {
	useEffect(() => {
		if (isBurgerMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [isBurgerMenuOpen]);

	return (
		<nav className={clsx(s.BurgerMenuContainer, isBurgerMenuOpen && s.open)}>
			<Logo class_name="burgerMenu" onClick={handleBurgerLinkClick} />
			<NavLinks class_name="burgerMenu" onClick={handleBurgerLinkClick} />
		</nav>
	);
};

export default BurgerMenu;
