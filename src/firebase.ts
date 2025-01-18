import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_APP_FIREBASE_API_PROJECT_ID,
	messagingSenderId: import.meta.env.VITE_APP_FIREBASE_API_MESSAGIN_SENDER_ID,
	appId: import.meta.env.VITE_APP_FIREBASE_API_APP_ID,
	storageBucket: import.meta.env.VITE_APP_FIREBASE_API_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
