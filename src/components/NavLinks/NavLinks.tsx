import React from 'react';
import { clsx } from 'clsx';
import s from './NavLinks.module.scss';
import { Link, useLocation } from 'react-router-dom';

interface INavLinks {
	title: string;
	to: string;
}

const navLinksList: INavLinks[] = [
	{
		title: 'Галерея',
		to: '/',
	},
	{
		title: 'Магазин',
		to: '/store',
	},
	{
		title: 'Контакти',
		to: '/contacts',
	},
	{
		title: 'Про автора',
		to: '/about',
	},
];

const NavLinks: React.FC = () => {
	const { pathname } = useLocation();

	const isActive = (link: string) => (pathname === link ? s.active : '');

	return (
		<nav>
			<ul className={s.container}>
				{navLinksList.map(({ title, to }) => (
					<li className={clsx(isActive(to), s.link)} key={to}>
						<Link to={to}>{title}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavLinks;
