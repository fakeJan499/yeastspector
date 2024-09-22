import type { SupportedLanguage } from '@/libs/i18n';
import { formatDate as fnsFormatDate } from 'date-fns';
import { pl } from 'date-fns/locale';

export const formatDate = (date: Date | string | number, lang: SupportedLanguage): string => {
    switch (lang) {
        case 'pl':
            return fnsFormatDate(new Date(date), 'P', { locale: pl });
    }
};
