import React from 'react';
import { Link, useLocation } from 'react-router';
import s from './FooterNavLinks.module.scss';
import clsx from 'clsx';

import logoMini from '../../../assets/logo-mini.jpg';

interface IFooterNavLinks {
	title: string;
	to: string;
}

const footerNavLinksList: IFooterNavLinks[] = [
	{
		title: 'Магазин',
		to: '/store',
	},
	{
		title: 'Політика конфіденційності',
		to: '/privacy-policy',
	},
	{
		title: 'Доставка та оплата',
		to: '/delivery-and-payment',
	},
	{
		title: 'Публічна оферта',
		to: '/about',
	},
	{
		title: 'Контакти',
		to: '/contacts',
	},
];

const FooterNavLinks: React.FC = () => {
	const { pathname } = useLocation();

	const isActive = (link: string) => (pathname === link ? s.active : '');

	return (
		<nav>
			<ul className={s.container}>
				{footerNavLinksList.map(({ title, to }) => (
					<li className={clsx(isActive(to), s.link)} key={to}>
						<Link to={to}>{title}</Link>
					</li>
				))}
				<Link to="/" className={s.logoMini}>
					<img src={logoMini} alt="logo" />
				</Link>
			</ul>
		</nav>
	);
};

export default FooterNavLinks;
