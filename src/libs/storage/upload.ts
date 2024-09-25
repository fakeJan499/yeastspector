import { ref, uploadBytes } from 'firebase/storage';
import { storage, authenticate } from './client';

export const upload = async (path: string, file: Blob): Promise<void> => {
    const storageRef = ref(storage, path);
    await authenticate();
    await uploadBytes(storageRef, file);
};
