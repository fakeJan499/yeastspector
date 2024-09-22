import { SupportedLanguage } from '@/libs/i18n';

export const getDateFormat = (lang: SupportedLanguage) => {
    switch (lang) {
        case 'pl':
            return 'dd.MM.yyyy';
    }
};
