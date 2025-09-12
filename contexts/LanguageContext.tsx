'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/router';

type LanguageContextType = {
    locale: string;
    changeLanguage: (locale: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const { pathname, asPath, query } = router;

    const changeLanguage = (locale: string) => {
        router.push({ pathname, query }, asPath, { locale });
    };

    return (
        <LanguageContext.Provider value={{ locale: router.locale || 'en', changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};