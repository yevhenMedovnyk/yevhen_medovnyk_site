import React from 'react';
import s from './AdminNavLinks.module.scss';
import { NavLink } from 'react-router-dom';

interface INavLinks {
	title: string;
	to: string;
}

const navLinksList: INavLinks[] = [
	{
		title: 'Client orders',
		to: 'client-orders',
	},
	{
		title: 'Products',
		to: 'products',
	},
];

const AdminNavLinks: React.FC = () => {
	return (
		<div className={s.container}>
			{navLinksList.map(({ title, to }) => (
				<NavLink
					key={title}
					to={to}
					end
					className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}
				>
					{title}
				</NavLink>
			))}
		</div>
	);
};

export default AdminNavLinks;
