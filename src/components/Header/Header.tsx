import React from 'react';
import s from './Header.module.scss';
import NavLinks from '../NavLinks/NavLinks';
import Logo from './Logo/Logo';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import { CiMenuBurger } from 'react-icons/ci';
import { CgClose } from 'react-icons/cg';

const Header: React.FC = () => {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);
	const { isTablet } = useMediaQuery();

	const handleBurgerMenuClick = () => {
		setIsBurgerMenuOpen((prevIsOpen) => !prevIsOpen);
	};

	return (
		<header className={s.container}>
			<Logo />
			{!isTablet && <NavLinks />}
			{isTablet && (
				<>
					{isBurgerMenuOpen ? (
						<CgClose onClick={handleBurgerMenuClick} className={s.burgerCloseBtn} />
					) : (
						<CiMenuBurger onClick={handleBurgerMenuClick} className={s.burgerOpenBtn} />
					)}
				</>
			)}
		</header>
	);
};

export default Header;
