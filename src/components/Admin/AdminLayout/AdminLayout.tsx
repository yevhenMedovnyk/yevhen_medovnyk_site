import React from 'react';
import s from './AdminLayout.module.scss';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
	return (
		<div className={s.container}>
			<div className={s.main}>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminLayout;
