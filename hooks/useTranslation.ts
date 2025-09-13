// hooks/useTranslation.ts
'use client';

import { useLanguage } from '@/providers/LanguageProvider';

// Import all translation files
import enCommon from '@/locales/en/common.json';
import esCommon from '@/locales/es/common.json';

// Organize translations by language
const resources = {
    en: {
        common: enCommon
    },
    es: {
        common: esCommon
    }
};

export const useTranslation = (namespace = 'common') => {
    const { locale } = useLanguage();

    // Get translations for the current locale and namespace
    const translations = resources[locale][namespace as keyof typeof resources.en];

    // Function to get a translation by key
    const t = (key: string) => {
        // Handle nested keys like 'navbar.aboutMe'
        return key.split('.').reduce((obj, k) => {
            return obj && obj[k as keyof typeof obj] !== undefined ? obj[k as keyof typeof obj] : key;
        }, translations as any);
    };

    return { t };
};