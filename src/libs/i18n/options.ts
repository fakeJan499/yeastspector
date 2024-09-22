import { InitOptions } from 'i18next';
import { SupportedLanguage, TranslationNamespace } from './models';

export const fallbackLanguage: SupportedLanguage = 'pl';
export const languages: SupportedLanguage[] = [fallbackLanguage];
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
