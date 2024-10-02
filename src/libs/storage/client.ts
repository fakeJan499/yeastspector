// Import the functions you need from the SDKs you need
import { getEnvVariable } from '@/libs/env';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

let app: FirebaseApp | null = null;

const getApp = (): FirebaseApp => {
    if (!app) {
        app = initializeApp({
            apiKey: getEnvVariable('FIREBASE_API_KEY'),
            authDomain: getEnvVariable('FIREBASE_AUTH_DOMAIN'),
            storageBucket: getEnvVariable('FIREBASE_STORAGE_BUCKET'),
        });
    }

    return app;
};

export const getStorageClient = () => getStorage(getApp());

export const authenticate = async () => {
    const auth = getAuth(getApp());
    await auth.authStateReady();

    if (auth.currentUser) {
        return;
    }

    await signInWithEmailAndPassword(
        auth,
        getEnvVariable('FIREBASE_USER_EMAIL'),
        getEnvVariable('FIREBASE_USER_PASSWORD'),
    );
};
