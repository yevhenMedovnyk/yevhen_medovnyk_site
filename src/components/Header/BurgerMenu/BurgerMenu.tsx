import React from 'react';
import s from './BurgerMenu.module.scss';
import NavLinks from '../../NavLinks/NavLinks';
import Logo from '../Logo/Logo';
import BurgerOpenBtn from '../BurgerOpenBtn/BurgerOpenBtn';

interface IBurgerMenuProps {
	isBurgerMenuOpen: boolean;
	handleBurgerMenuClick: () => void;
}

const BurgerMenu: React.FC<IBurgerMenuProps> = ({ handleBurgerMenuClick, isBurgerMenuOpen }) => {
	return (
		<div className={s.BurgerMenuContainer}>
			<BurgerOpenBtn
				isBurgerMenuOpen={isBurgerMenuOpen}
				handleBurgerMenuClick={handleBurgerMenuClick}
			/>
			<Logo class_name="burgerMenu" />
			<NavLinks class_name="burgerMenu" />
		</div>
	);
};

export default BurgerMenu;
