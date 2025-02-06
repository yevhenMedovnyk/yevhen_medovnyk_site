import React from 'react';

import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';
import { IUser } from '../types/IUser';
import { setUser } from '../redux/slices/authSlice';
import { useAppDispatch } from './redux';
import { createContext, useContext, useEffect, ReactNode } from 'react';

const auth = getAuth();
const AuthContext = createContext({ signInWithGoogle: async () => {}, logout: async () => {} });

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const dispatch = useAppDispatch();
	const provider = new GoogleAuthProvider();

	const signInWithGoogle = async () => {
		try {
			const userCredential = await signInWithPopup(auth, provider);
			const user = userCredential?.user;
			if (user) {
				const { displayName = '', email = '', uid = '' } = user as IUser;
				dispatch(setUser({ displayName, email, uid }));
			} else {
				console.warn('No user information available');
			}
		} catch (error: unknown) {
			console.error('Error during Google login:', error);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				dispatch(
					setUser({
						displayName: currentUser.displayName || '',
						email: currentUser.email || '',
						uid: currentUser.uid,
					})
				);
			}
		});
		return () => unsubscribe();
	}, [dispatch]);

	return (
		<AuthContext.Provider value={{ signInWithGoogle, logout }}>{children}</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
