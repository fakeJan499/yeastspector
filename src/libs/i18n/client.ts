'use client';

import { getPublicEnvVariable } from '@/libs/env/client';
import i18next from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useEffect, useState } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';
import { I18nSyncProvider, SupportedLanguage } from './models';
import { fallbackLanguage, getOptions, languages } from './options';

const runsOnServerSide = typeof window === 'undefined';

i18next
    .use(initReactI18next)
    .use(intervalPlural)
    .use(
        resourcesToBackend(
            (language: string, namespace: string) =>
                import(`./messages/${namespace}/${language}.json`),
        ),
    )
    .init({
        ...getOptions(undefined, undefined, getPublicEnvVariable('NEXT_PUBLIC_DEBUG_TRANSLATIONS')),
        preload: runsOnServerSide ? languages : [],
    });

export const useClientLanguage = () => fallbackLanguage;

export const useClientI18n: I18nSyncProvider = config => {
    const lng = fallbackLanguage;
    const { i18n, t } = useTranslation(config.nameSpace);

    if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
        i18n.changeLanguage(lng);
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (activeLng === i18n.resolvedLanguage) return;
            setActiveLng(i18n.resolvedLanguage);
        }, [activeLng, i18n.resolvedLanguage]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (!lng || i18n.resolvedLanguage === lng) return;
            i18n.changeLanguage(lng);
        }, [lng, i18n]);
    }
    return {
        t,
        lang: (i18n.resolvedLanguage || lng) as SupportedLanguage,
    };
};
