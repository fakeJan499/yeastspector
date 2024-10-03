import { getStream, ref } from 'firebase/storage';
import { authenticate, getStorageClient } from './client';

export const getFileStream = async (path: string): Promise<ReadableStream> => {
    const storageRef = ref(getStorageClient(), path);
    await authenticate();
    return getStream(storageRef);
};
