'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: t('navbar.aboutMe'), href: '#about' },
        { name: t('navbar.services'), href: '#services' },
        { name: t('navbar.myWork'), href: '#work' },
        { name: t('navbar.contactMe'), href: '#contact' },
    ];

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 min-h-20 transition-all duration-500 ${isScrolled
                ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200'
                : 'bg-white/80 backdrop-blur-md'
                }`}>
                <div className="container-custom px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4 lg:py-5">

                        {/* Logo - Always on left */}
                        <div className="flex items-center" onClick={() => scrollToSection('#header')}>
                            <span className="text-2xl font-bold text-black hover:scale-105 transition-transform duration-300 cursor-pointer">
                                pacoguerraq
                            </span>
                        </div>

                        {/* Desktop Navigation - Center */}
                        <div className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
                            <div className="flex items-center gap-1 bg-gray-50/80 rounded-full px-2 py-2 border border-gray-200/50">
                                {navItems.map((item, index) => (
                                    <button
                                        key={item.name}
                                        onClick={() => scrollToSection(item.href)}
                                        className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-black rounded-full transition-all duration-300 hover:bg-white hover:shadow-md group whitespace-nowrap"
                                    >
                                        {item.name}
                                        <span className="absolute inset-0 rounded-full bg-black/5 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right side - varies by screen size */}
                        <div className="flex items-center gap-3">
                            {/* Language Switcher - Always visible */}
                            <LanguageSwitcher />

                            {/* Desktop Contact Button */}
                            <button
                                onClick={() => scrollToSection('#contact')}
                                className="hidden lg:flex group relative bg-black text-white px-6 py-2.5 rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm whitespace-nowrap"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {t('navbar.contact')}
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                                    >
                                        <path d="M7 17L17 7" />
                                        <path d="M7 7h10v10" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            {/* Medium Contact Button (md to lg) */}
                            <button
                                onClick={() => scrollToSection('#contact')}
                                className="hidden md:flex lg:hidden group relative bg-black text-white px-5 py-2.5 rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm whitespace-nowrap"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {t('navbar.contact')}
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                                    >
                                        <path d="M7 17L17 7" />
                                        <path d="M7 7h10v10" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            {/* Mobile Hamburger Menu Button (below lg) */}
                            <button
                                className="block lg:hidden p-2 text-black hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile/Tablet Menu Sidebar */}
            <div className={`fixed inset-0 z-40 xl:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'
                }`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Sidebar */}
                <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}>
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-black">{t('navbar.menu')}</span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col gap-2">
                            {navItems.map((item, index) => (
                                <button
                                    key={item.name}
                                    onClick={() => scrollToSection(item.href)}
                                    className={`text-left py-4 px-4 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-300 font-medium border-b border-gray-100 last:border-b-0 transform hover:translate-x-2 text-base`}
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        animation: isMobileMenuOpen ? `slideInRight 0.3s ease-out ${index * 100}ms both` : 'none'
                                    }}
                                >
                                    {item.name}
                                </button>
                            ))}

                            {/* Contact button in sidebar for mobile/tablet */}
                            <button
                                onClick={() => scrollToSection('#contact')}
                                className="mt-6 w-full bg-black text-white py-4 rounded-lg font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-lg flex items-center justify-center gap-2 text-base"
                                style={{
                                    animationDelay: `${navItems.length * 100}ms`,
                                    animation: isMobileMenuOpen ? `slideInRight 0.3s ease-out ${navItems.length * 100}ms both` : 'none'
                                }}
                            >
                                {t('navbar.contact')}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 17L17 7" />
                                    <path d="M7 7h10v10" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
        </>
    );
};

export default Navbar;