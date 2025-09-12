'use client'

import Image from 'next/image';
import { motion } from 'motion/react';
import { assets } from '@/assets/assets';
import FlowingLines from '@/components/FlowingLines';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
    const { t } = useTranslation();

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: t('footer.links.home'), id: 'top' },
        { name: t('footer.links.about'), id: 'about' },
        { name: t('footer.links.services'), id: 'services' },
        { name: t('footer.links.work'), id: 'work' },
        { name: t('footer.links.contact'), id: 'contact' }
    ];

    const socialLinks = [
        {
            name: t('footer.social.github'),
            url: 'https://github.com/pacoguerraq',
            description: t('footer.social.githubDesc')
        },
        {
            name: t('footer.social.linkedin'),
            url: 'https://www.linkedin.com/in/franciscoguerraquintanilla/',
            description: t('footer.social.linkedinDesc')
        },
        {
            name: t('footer.social.email'),
            url: 'mailto:franciscoguerraquintanilla@gmail.com',
            description: t('footer.social.emailDesc')
        }
    ];

    return (
        <footer className="relative bg-black dark:bg-gray-950 text-white section-container">
            {/* Flowing Lines Background */}
            <FlowingLines variant="top" intensity="light" className="text-white" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 sm:py-16 border-b border-gray-800 dark:border-gray-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
                        {/* Brand Column */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="sm:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6"
                        >
                            <div className="space-y-3 sm:space-y-4">
                                <Image
                                    src={assets.logo_dark}
                                    alt="pacoguerraq"
                                    width={140}
                                    height={40}
                                    className="cursor-pointer sm:w-[160px] sm:h-[45px]"
                                    onClick={() => scrollToSection('top')}
                                />

                                <p className="text-gray-300 text-sm sm:text-base max-w-md leading-relaxed">
                                    {t('footer.description')}
                                </p>
                            </div>

                            <div className="space-y-2 sm:space-y-3">
                                <h4 className="font-semibold text-white text-sm sm:text-base">
                                    {t('footer.getInTouch')}
                                </h4>
                                <div className="space-y-2 text-gray-300">
                                    <p className="flex items-center space-x-2">
                                        <Image
                                            src={assets.mail_icon}
                                            alt="Email"
                                            width={14}
                                            height={14}
                                            className="sm:w-4 sm:h-4 flex-shrink-0"
                                        />
                                        <span className="text-xs sm:text-sm break-all">franciscoguerraquintanilla@gmail.com</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="space-y-4 sm:space-y-6"
                        >
                            <h4 className="font-semibold text-white text-sm sm:text-base">
                                {t('footer.quickLinks')}
                            </h4>
                            <nav className="space-y-2 sm:space-y-3">
                                {quickLinks.map((link) => (
                                    <motion.button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                        className="block text-gray-300 hover:text-white transition-colors duration-300 text-left text-sm sm:text-base"
                                    >
                                        {link.name}
                                    </motion.button>
                                ))}
                            </nav>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-4 sm:space-y-6"
                        >
                            <h4 className="font-semibold text-white text-sm sm:text-base">
                                {t('footer.connect')}
                            </h4>
                            <div className="space-y-2 sm:space-y-3">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                        className="block group"
                                    >
                                        <div className="space-y-0.5 sm:space-y-1">
                                            <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium text-sm sm:text-base">
                                                {social.name}
                                            </span>
                                            <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300 hidden sm:block">
                                                {social.description}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="py-6 sm:py-8"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                        <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                            {t('footer.copyright').replace('{year}', currentYear.toString())}
                        </p>

                        <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                onClick={() => scrollToSection('header')}
                                className="hover:text-white transition-colors duration-300 flex items-center space-x-1 sm:space-x-2"
                            >
                                <span>{t('footer.backToTop')}</span>
                                <Image
                                    src={assets.right_arrow_white}
                                    alt="Arrow up"
                                    width={10}
                                    height={10}
                                    className="rotate-[-90deg] sm:w-3 sm:h-3"
                                />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Decorative Element */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 pointer-events-none"
                >
                    <div className="w-full h-full bg-gradient-to-tl from-white to-transparent rounded-full blur-3xl" />
                </motion.div>
            </div>
        </footer>
    );
}