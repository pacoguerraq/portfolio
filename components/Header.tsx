'use client'

import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import { useTranslation } from '@/hooks/useTranslation';

const Header = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const scrollToContact = () => {
        const element = document.querySelector('#contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const downloadResume = () => {
        // Replace with your actual resume file path
        const link = document.createElement('a');
        link.href = '/CV_FranciscoJavierGuerraQuintanilla.pdf'; // Make sure to add your resume file to the public folder
        link.download = 'Francisco_Guerra_Resume.pdf';
        link.click();
    };

    return (
        <header
            id="header"
            className="flex items-center justify-center pt-24 sm:pt-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            <div className="container-custom max-w-6xl min-h-[80vh]">
                <div className="flex flex-col items-center text-center">

                    {/* Profile Image */}
                    <div className={`relative mb-6 sm:mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <div className="w-32 h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                            <Image
                                src={assets.profile_img}
                                alt="Francisco Guerra"
                                className="w-full h-full object-cover"
                                width={280}
                                height={280}
                            />
                        </div>
                        {/* Floating animation effect */}
                        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 opacity-20 animate-float -z-10"></div>
                    </div>

                    {/* Greeting */}
                    <div className={`mb-4 sm:mb-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <p className="text-base md:text-lg lg:text-xl text-gray-600 font-medium">
                            {t('header.greeting')}
                            <span className="inline-block ml-2 animate-pulse">👋</span>
                        </p>
                    </div>

                    {/* Main Headline - More Attractive */}
                    <div className={`mb-6 sm:mb-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black max-w-5xl leading-tight">
                            <span className="block">{t('header.title.part1')}</span>
                            <span className="block relative">
                                {t('header.title.part2')}
                                <span className="relative inline-block ml-2 sm:ml-4">
                                    <span className="bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent animate-pulse">
                                        {t('header.title.part3')}
                                    </span>
                                    <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 sm:h-1.5 bg-gradient-to-r from-transparent via-black to-transparent transform origin-left scale-x-0 animate-[scaleX_1s_ease-out_2s_forwards]"></div>
                                </span>
                            </span>
                            <span className="block mt-2">
                                <span className="relative">
                                    {t('header.title.part4')}
                                    <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-black transform origin-left scale-x-0 animate-[scaleX_1s_ease-out_2.5s_forwards]"></div>
                                </span>
                            </span>
                        </h1>
                    </div>

                    {/* Description */}
                    <div className={`mb-8 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl leading-relaxed px-4">
                            {t('header.description')}
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className={`flex mx-auto justify-center sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full max-w-md sm:max-w-none transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <button
                            onClick={scrollToContact}
                            className="w-full sm:w-auto bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-3 group text-sm sm:text-base"
                        >
                            {t('header.buttons.contactMe')}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                            >
                                <path d="M7 17L17 7" />
                                <path d="M7 7h10v10" />
                            </svg>
                        </button>

                        <button
                            onClick={downloadResume}
                            className="w-full sm:w-auto bg-transparent text-black border-2 border-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg hover:scale-105 flex items-center justify-center gap-3 group text-sm sm:text-base"
                        >
                            {t('header.buttons.myResume')}
                            <Download
                                size={16}
                                className="transform group-hover:translate-y-1 transition-transform duration-300"
                            />
                        </button>
                    </div>

                    {/* Scroll indicator */}
                    <div className={`mt-8 sm:mt-12 md:mt-16 lg:mt-20 transform transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                            <span className="text-xs sm:text-sm font-medium">{t('header.scrollToExplore')}</span>
                            <div className="w-0.5 h-6 sm:h-8 bg-gray-300 animate-pulse"></div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50"></div>

                {/* Large flowing lines - top left */}
                <svg
                    className="absolute -top-20 sm:-top-40 -left-20 sm:-left-40 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] opacity-25 animate-float"
                    viewBox="0 0 600 600"
                    fill="none"
                >
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M100 300 Q 200 150, 350 300 T 600 300"
                        stroke="url(#grad1)"
                        strokeWidth="4"
                        className="animate-pulse"
                    />
                    <path
                        d="M80 330 Q 180 180, 330 330 T 580 330"
                        stroke="url(#grad1)"
                        strokeWidth="3"
                    />
                    <path
                        d="M60 360 Q 160 210, 310 360 T 560 360"
                        stroke="url(#grad1)"
                        strokeWidth="2"
                    />
                </svg>

                {/* Large flowing lines - bottom right */}
                <svg
                    className="absolute -bottom-20 sm:-bottom-40 -right-20 sm:-right-40 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] opacity-25 rotate-180 animate-float"
                    style={{ animationDelay: '2s' }}
                    viewBox="0 0 600 600"
                    fill="none"
                >
                    <defs>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                            <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M100 300 Q 200 150, 350 300 T 600 300"
                        stroke="url(#grad2)"
                        strokeWidth="4"
                        className="animate-pulse"
                    />
                    <path
                        d="M80 330 Q 180 180, 330 330 T 580 330"
                        stroke="url(#grad2)"
                        strokeWidth="3"
                    />
                    <path
                        d="M60 360 Q 160 210, 310 360 T 560 360"
                        stroke="url(#grad2)"
                        strokeWidth="2"
                    />
                </svg>

                {/* Middle accent lines - more prominent */}
                <svg
                    className="absolute top-1/4 -left-10 sm:-left-20 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] opacity-30 -rotate-12"
                    viewBox="0 0 400 400"
                    fill="none"
                >
                    <path
                        d="M50 200 Q 150 50, 250 200 T 450 200"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="animate-pulse"
                        style={{ animationDuration: '4s' }}
                    />
                </svg>

                <svg
                    className="absolute bottom-1/4 -right-10 sm:-right-20 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] opacity-30 rotate-12"
                    viewBox="0 0 400 400"
                    fill="none"
                >
                    <path
                        d="M50 200 Q 150 350, 250 200 T 450 200"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="animate-pulse"
                        style={{ animationDuration: '6s' }}
                    />
                </svg>

                {/* Floating geometric shapes */}
                <div className="absolute top-1/3 left-1/4 w-4 h-4 sm:w-6 sm:h-6 bg-black/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/3 right-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-black/15 rotate-45 animate-float" style={{ animationDelay: '3s' }}></div>
                <div className="absolute top-1/2 right-1/3 w-2 h-2 sm:w-3 sm:h-3 bg-black/20 rounded-full animate-float" style={{ animationDelay: '5s' }}></div>

                {/* Radial gradient overlays for depth */}
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-white/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-white/40 via-transparent to-transparent"></div>

                {/* Enhanced dot pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                    backgroundSize: '30px 30px',
                    animation: 'float 8s ease-in-out infinite'
                }}></div>

                {/* Additional flowing elements for more dynamic feel */}
                <svg
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] opacity-15 animate-pulse"
                    style={{ animationDuration: '10s' }}
                    viewBox="0 0 300 300"
                    fill="none"
                >
                    <circle cx="150" cy="150" r="100" stroke="currentColor" strokeWidth="1" strokeDasharray="10,10" className="animate-spin" style={{ animationDuration: '20s' }} />
                    <circle cx="150" cy="150" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" className="animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                </svg>
            </div>
        </header>
    );
};

export default Header;