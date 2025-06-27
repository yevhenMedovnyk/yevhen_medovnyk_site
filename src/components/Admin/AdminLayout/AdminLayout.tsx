import React from 'react';
import s from './AdminLayout.module.scss';
import { Outlet } from 'react-router-dom';
import AdminNavLinks from '../AdminNavLinks/AdminNavLinks';

const AdminLayout: React.FC = () => {
	return (
		<div className={s.container}>
			<div className={s.sideBar}>
				<AdminNavLinks />
			</div>
			<div className={s.main}>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminLayout;
