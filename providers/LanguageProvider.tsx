// providers/LanguageProvider.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Locale = 'en' | 'es';

type LanguageContextType = {
    locale: Locale;
    changeLanguage: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocale] = useState<Locale>('en');

    // Load language preference from localStorage on client side
    useEffect(() => {
        const savedLocale = localStorage.getItem('language') as Locale | null;
        if (savedLocale && (savedLocale === 'en' || savedLocale === 'es')) {
            setLocale(savedLocale);
        }
    }, []);

    const changeLanguage = (newLocale: Locale) => {
        setLocale(newLocale);
        localStorage.setItem('language', newLocale);
        // In App Router, we don't need to push to a new route to change locale
        // We just need to update the locale state
    };

    return (
        <LanguageContext.Provider value={{ locale, changeLanguage }}>
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