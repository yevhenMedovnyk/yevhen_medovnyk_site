import React from 'react';
import s from './Header.module.scss';
import NavLinks from '../NavLinks/NavLinks';
import Logo from './Logo/Logo';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import BurgerOpenBtn from './BurgerOpenBtn/BurgerOpenBtn';

interface IHeaderProps {
	handleBurgerMenuClick: () => void;
	isBurgerMenuOpen?: boolean;
}

const Header: React.FC<IHeaderProps> = ({ handleBurgerMenuClick, isBurgerMenuOpen }) => {
	const { isTablet } = useMediaQuery();

	return (
		<header className={s.container}>
			<Logo />
			{!isTablet && <NavLinks />}
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
