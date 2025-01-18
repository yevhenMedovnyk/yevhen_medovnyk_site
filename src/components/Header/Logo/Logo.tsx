import React from 'react';
import s from './Logo.module.scss';

import logo from './../../../assets/logo_300px.png';
import { Link } from 'react-router';

const Logo: React.FC = () => {
	return (
		<Link to="/" className={s.container}>
			<img src={logo} alt="logo" />
		</Link>
	);
};

export default Logo;
