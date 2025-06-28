import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { UserAuth } from '../hooks/useAuth';

interface Props {
	children: React.ReactElement;
}

const RequireAdmin: React.FC<Props> = ({ children }) => {
	const {
		user: { isAdmin, uid },
	} = useAppSelector((state) => state.auth);
	const { loading, signInWithGoogle } = UserAuth();

	if (loading) return <div>Завантаження...</div>;
	console.log('isAdmin', isAdmin);

	if (!uid) {
		return (
			<div>
				<button onClick={signInWithGoogle}>Увійти через Google</button>
			</div>
		);
	}

	if (!isAdmin) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default RequireAdmin;
