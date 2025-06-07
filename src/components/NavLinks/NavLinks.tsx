import React from 'react';
import { clsx } from 'clsx';
import s from './NavLinks.module.scss';
import { Link, useLocation } from 'react-router-dom';

interface INavLinks {
	title: string;
	to: string;
}

interface INavLinksProps {
	class_name?: string;
	onClick?: () => void;
}

const navLinksList: INavLinks[] = [
	{
		title: 'Галерея',
		to: '/',
	},
	{
		title: 'Проєкти',
		to: '/projects',
	},
	{
		title: 'Магазин принтів',
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

const NavLinks: React.FC<INavLinksProps> = ({ class_name, onClick }) => {
	const { pathname } = useLocation();

	const isActive = (link: string) => (pathname === link ? s.active : '');

	return (
		<nav>
			<ul className={clsx(s.container, class_name && s[class_name])}>
				{navLinksList.map(({ title, to }) => (
					<li className={clsx(isActive(to), s.link, class_name && s[class_name])} key={to}>
						<Link onClick={onClick} to={to}>
							{title}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavLinks;
