import { ref, getStream } from 'firebase/storage';
import { storage, authenticate } from './client';

export const getFileStream = async (path: string): Promise<ReadableStream> => {
    const storageRef = ref(storage, path);
    await authenticate();
    return getStream(storageRef);
};
