import { ref, uploadBytes } from 'firebase/storage';
import { authenticate, getStorageClient } from './client';

export const upload = async (path: string, file: Blob): Promise<void> => {
    const storageRef = ref(getStorageClient(), path);
    await authenticate();
    await uploadBytes(storageRef, file);
};
