import { validateEnvVariables } from './libs/env/validation';
import { validateMessages } from './libs/i18n';

export const register = async () => {
    validateEnvVariables();
    await validateMessages();
};
