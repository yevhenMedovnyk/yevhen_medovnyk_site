import React from 'react';
import s from './Logo.module.scss';

import { Link } from 'react-router';
import clsx from 'clsx';

interface ILogoProps {
	class_name?: string;
	onClick?: () => void;
}

const Logo: React.FC<ILogoProps> = ({ class_name, onClick }) => {
	return (
		<Link onClick={onClick} to="/" className={clsx(s.container, class_name && s[class_name])}>
			Yevhen Medovnyk
		</Link>
	);
};

export default Logo;
