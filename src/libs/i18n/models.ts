import { RecursiveKeyOfWithType } from '@/libs/utils/types';
import Z from 'zod';
import { schema } from './schema';

export type SupportedLanguage = 'pl';

export type Translations = Z.infer<typeof schema>;
export type TranslationNamespace = keyof Z.infer<typeof schema>;

type I18nTranslationsConfig<NS extends TranslationNamespace> = {
    nameSpace: NS;
};

type TranslateFn<NS extends TranslationNamespace> = <
    K extends RecursiveKeyOfWithType<Translations[NS], string>,
>(
    key: K,
    interpolation?: Record<string, unknown>,
) => string;

type I18nData<NS extends TranslationNamespace> = {
    lang: SupportedLanguage;
    t: TranslateFn<NS>;
};

export type I18nSyncProvider = <NS extends TranslationNamespace>(
    config: I18nTranslationsConfig<NS>,
) => I18nData<NS>;
export type I18nAsyncProvider = <NS extends TranslationNamespace>(
    config: I18nTranslationsConfig<NS>,
) => Promise<I18nData<NS>>;
