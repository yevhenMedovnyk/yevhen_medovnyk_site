import React from 'react';
import s from './Logo.module.scss';

import logo from './../../../assets/logo_300px.png';

const Logo: React.FC = () => {
	return (
		<div className={s.container}>
			<img src={logo} alt="logo" />
		</div>
	);
};

export default Logo;
