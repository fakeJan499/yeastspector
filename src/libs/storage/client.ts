// Import the functions you need from the SDKs you need
import { getEnvVariable } from '@/libs/env';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage, getStream, ref, uploadBytes } from 'firebase/storage';

const app = initializeApp({
    apiKey: getEnvVariable('FIREBASE_API_KEY'),
    authDomain: getEnvVariable('FIREBASE_AUTH_DOMAIN'),
    storageBucket: getEnvVariable('FIREBASE_STORAGE_BUCKET'),
});
export const storage = getStorage(app);
const auth = getAuth(app);

export const authenticate = async () => {
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
