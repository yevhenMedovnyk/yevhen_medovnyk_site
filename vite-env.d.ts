/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
	readonly VITE_APP_FIREBASE_API_KEY: string;
	readonly VITE_APP_FIREBASE_AUTH_DOMAIN: string;
	readonly VITE_APP_FIREBASE_API_PROJECT_ID: string;
	readonly VITE_APP_FIREBASE_API_MESSAGIN_SENDER_ID: string;
	readonly VITE_APP_FIREBASE_API_APP_ID: string;
	readonly VITE_APP_FIREBASE_API_STORAGE_BUCKET: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
