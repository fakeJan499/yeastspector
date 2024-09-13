import { InitOptions } from 'i18next';
import { TranslationNamespace } from './models';

export const fallbackLanguage = 'pl';
export const languages = [fallbackLanguage];
const sharedNamespaces: TranslationNamespace[] = ['general'];

export const getOptions = (
    lng: string = fallbackLanguage,
    ns: string | string[] = [],
    debug = false,
): InitOptions<unknown> => {
    return {
        debug,
        supportedLngs: languages,
        fallbackLng: fallbackLanguage,
        lng,
        ns: Array.isArray(ns) ? [...sharedNamespaces, ...ns] : [...sharedNamespaces, ns],
    };
};
