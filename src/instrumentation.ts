import { validateEnvVariables } from './libs/env/validation';

export const register = async () => {
    validateEnvVariables();
};
