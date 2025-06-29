import React from 'react';
import s from './AdminNavLinks.module.scss';
import { NavLink } from 'react-router-dom';
import { UserAuth } from '../../../hooks/useAuth';

interface INavLinks {
	title: string;
	to: string;
}

const navLinksList: INavLinks[] = [
	{
		title: 'Client orders',
		to: '/admin',
	},
	{
		title: 'Products',
		to: 'products',
	},
];

const AdminNavLinks: React.FC = () => {
	const { logout } = UserAuth();

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
			<button onClick={() => logout()} className={s.link}>
				Logout
			</button>
		</div>
	);
};

export default AdminNavLinks;
