import React from 'react';
import s from './Header.module.scss';
import NavLinks from '../NavLinks/NavLinks';
import Logo from './Logo/Logo';

const Header: React.FC = () => {
	return (
		<header className={s.container}>
			<Logo />
			<NavLinks />
		</header>
	);
};

export default Header;
