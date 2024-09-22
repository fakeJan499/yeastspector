'use client';

import type { SupportedLanguage } from '@/libs/i18n';
import { useClientLanguage } from '@/libs/i18n/client';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Locale, pl } from 'date-fns/locale';

const getLocale = (lang: SupportedLanguage): Locale => {
    switch (lang) {
        case 'pl':
            return pl;
    }
};

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
    const lang = useClientLanguage();
    const locale = getLocale(lang);

    return (
        <MuiLocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
            {children}
        </MuiLocalizationProvider>
    );
}
