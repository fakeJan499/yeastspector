import { SupportedLanguage } from '@/libs/i18n';
import { parse as dateFnsParse } from 'date-fns';
import { getDateFormat } from './get-date-format';

export const parse = (date: string, lang: SupportedLanguage): Date => {
    return dateFnsParse(date, getDateFormat(lang), new Date());
};
