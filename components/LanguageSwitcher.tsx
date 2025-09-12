'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/providers/LanguageProvider';
import { ChevronDown } from 'lucide-react';

const LanguageSwitcher = () => {
    const { locale, changeLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const languages = [
        { code: 'en', name: 'EN', flag: '🇺🇸' },
        { code: 'es', name: 'ES', flag: '🇲🇽' },
    ];

    const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

    const handleSelectLanguage = (code: 'en' | 'es') => {
        changeLanguage(code);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative">
            {/* Selected language button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-full text-sm font-medium border border-gray-200 hover:shadow-md transition-all duration-300"
            >
                <span className="w-4 h-4 flex-shrink-0">{currentLanguage.flag}</span>
                <span>{currentLanguage.name}</span>
                <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-full min-w-[100px] bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 overflow-hidden">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => handleSelectLanguage(language.code as 'en' | 'es')}
                            className={`flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors ${locale === language.code ? 'bg-gray-50 font-medium' : ''
                                }`}
                        >
                            <span className="w-4 h-4 flex-shrink-0">{language.flag}</span>
                            <span>{language.name}</span>
                            {locale === language.code && (
                                <span className="ml-auto w-2 h-2 bg-black rounded-full"></span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;