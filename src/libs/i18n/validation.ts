import { languages } from './options';
import { schema } from './schema';

export const validateMessages = async () => {
    const namespaces = schema.keyof().enum;

    for (const namespace of Object.values(namespaces)) {
        for (const lang of languages) {
            const data = await loadTranslationsModule(namespace, lang);

            const result = schema.shape[namespace].safeParse(data);

            if (!result.success) {
                handleError(
                    `Invalid translation schema in ${namespace}/${lang}.json ${result.error.issues.map(issue => `\n\t${issue.path.join('.')} - ${issue.message}`)}`,
                );
            }
        }
    }
};

const loadTranslationsModule = async (namespace: string, lang: string) => {
    try {
        const { default: data } = await import(`./messages/${namespace}/${lang}.json`);

        return data;
    } catch {
        handleError(`Missing translation file: ${namespace}/${lang}.json`);
    }
};

const handleError = (message: string) => {
    console.error(`❌ ${message}`);

    process.exit(1);
};
