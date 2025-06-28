import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';
import { useCreateUserMutation, useLazyGetUserByUIDQuery } from '../redux/usersApi';
import { useAppDispatch } from './redux';
import { setUser } from '../redux/slices/authSlice';

const auth = getAuth();
const AuthContext = createContext({
	signInWithGoogle: async () => {},
	logout: async () => {},
	loading: true,
});

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const dispatch = useAppDispatch();
	const provider = new GoogleAuthProvider();
	const [createUser] = useCreateUserMutation();
	const [getUserByUID] = useLazyGetUserByUIDQuery();
	const [loading, setLoading] = React.useState(true);

	const signInWithGoogle = async () => {
		try {
			const userCredential = await signInWithPopup(auth, provider);
			const user = userCredential?.user;

			if (user) {
				const { uid, displayName, email } = user;
				const user_db = await getUserByUID(uid).unwrap();
				dispatch(setUser(user_db));

				if (user_db?.uid !== uid) {
					await createUser({
						displayName: displayName || '',
						email: email || '',
						uid,
						isAdmin: false,
					});
				}
			} else {
				console.warn('No user information available');
			}
		} catch (error) {
			console.error('Error during Google login:', error);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			dispatch(
				setUser({
					displayName: '',
					email: '',
					uid: '',
					isAdmin: false,
				})
			);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser?.uid) {
				getUserByUID(currentUser.uid)
					.refetch()
					.unwrap()
					.then((user) => {
						dispatch(setUser(user));
					})
					.finally(() => setLoading(false));
			} else {
				setLoading(false);
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ signInWithGoogle, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => useContext(AuthContext);
