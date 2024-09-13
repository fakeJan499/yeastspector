import { getEnvVariable } from '@/libs/env';
import { createInstance } from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { I18nAsyncProvider } from './models';
import { fallbackLanguage, getOptions } from './options';

const initI18next = async (lng: string, ns: string | string[]) => {
    const i18nInstance = createInstance();
    await i18nInstance
        .use(initReactI18next)
        .use(intervalPlural)
        .use(
            resourcesToBackend(
                (language: string, namespace: string) =>
                    import(`./messages/${namespace}/${language}.json`),
            ),
        )
        .init(getOptions(lng, ns, getEnvVariable('NEXT_PUBLIC_DEBUG_TRANSLATIONS')));
    return i18nInstance;
};

export const useLanguage = async () => fallbackLanguage;

export const useI18n: I18nAsyncProvider = async config => {
    const lng = await useLanguage();
    const i18nextInstance = await initI18next(lng, config.nameSpace);

    return {
        t: i18nextInstance.getFixedT(lng, config.nameSpace),
        lang: i18nextInstance.resolvedLanguage || lng,
    };
};
