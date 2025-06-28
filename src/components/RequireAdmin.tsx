import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { UserAuth } from '../hooks/useAuth';

interface Props {
	children: React.ReactElement;
}

const RequireAdmin: React.FC<Props> = ({ children }) => {
	const { isAdmin } = useAppSelector((state) => state.auth.user);
	const { loading } = UserAuth();

	if (loading) return <div>Завантаження...</div>;
	console.log('isAdmin', isAdmin);

	if (!isAdmin) {
		// Якщо не адмін — перенаправити або показати щось інше
		return <Navigate to="/" replace />;
	}

	return children;
};

export default RequireAdmin;
