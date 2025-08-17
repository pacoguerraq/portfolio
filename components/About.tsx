// components/About.tsx
'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { assets, infoList, toolsData } from '@/assets/assets';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.querySelector('#about');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    return (

        <section id="about" className="py-20 lg:min-h-[92vh] flex items-center justify-center bg-[#1a1b1b] text-white relative overflow-hidden">
            <div className="max-w-3xl lg:max-w-6xl mx-auto px-6 lg:px-8 w-full py-14">

                {/* Section Header */}
                <div className={`text-center mb-8 transform transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">Introduction</p>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-3">About me</h2>
                    <div className="w-12 h-px bg-white/30 mx-auto"></div>
                </div>

                {/* Main Grid - 1/3 Image, 2/3 Content */}
                <div className="grid lg:grid-cols-3 gap-8 items-start mb-6">

                    {/* Image Column - 1/3 */}
                    <div className={`lg:col-span-1 flex justify-center transform transition-all duration-800 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}>
                        <div className="relative">
                            <Image
                                src={assets.user_image}
                                alt="Francisco Guerra"
                                width={240}
                                height={300}
                                className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute -inset-2 bg-white/5 rounded-xl -z-10 blur-lg"></div>
                        </div>
                    </div>

                    {/* Content Column - 2/3 */}
                    <div className={`lg:col-span-2 lg:pl-6 transform transition-all duration-800 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}>

                        {/* Description */}
                        <div className="mb-6">
                            <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
                                I am a software developer with expertise in modern web technologies, cloud computing, and API integrations.
                                I have built scalable and efficient applications for various industries, leveraging AWS, Next.js, and database management.
                            </p>
                        </div>

                        {/* Info Cards */}
                        <div className="space-y-4">
                            {infoList.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:cursor-pointer hover:scale-105 transition-all duration-300 group"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Image
                                                src={item.icon}
                                                alt={item.title}
                                                width={20}
                                                height={20}
                                                className="w-5 h-5 filter invert"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                                            <p className="text-sm text-gray-300">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tools Section */}
                <div className={`text-center transform transition-all duration-800 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}>
                    <h3 className="text-lg font-semibold mb-4">Tools I use</h3>
                    <div className="w-10 h-px bg-white/30 mx-auto mb-4"></div>

                    {/* Tech Icons Grid */}
                    <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                        {toolsData.map((tool, index) => (
                            <div
                                key={index}
                                className="group relative w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 hover:scale-110 hover:border-white/20 transition-all duration-300 cursor-pointer"
                            >
                                <Image
                                    src={tool.icon}
                                    alt={tool.name}
                                    width={24}
                                    height={24}
                                    className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                                />

                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                                    {tool.name}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Geometric Lines */}
                {/* <div className="absolute top-20 left-10 w-24 h-24 border-l-2 border-t-2 border-white/20 rounded-tl-2xl"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 border-r-2 border-b-2 border-white/20 rounded-br-2xl"></div> */}

                {/* Curved Lines */}
                <svg className="absolute top-10 -left-10 w-60 h-60 opacity-20" viewBox="0 0 200 200">
                    <path d="M20 100 Q 60 40, 100 100 T 180 100" stroke="white" strokeWidth="3" fill="none" className="animate-pulse" />
                    <path d="M15 120 Q 55 60, 95 120 T 175 120" stroke="white" strokeWidth="2" fill="none" />
                </svg>

                <svg className="absolute bottom-10 -right-10 w-60 h-60 opacity-20 rotate-180" viewBox="0 0 200 200">
                    <path d="M20 100 Q 60 40, 100 100 T 180 100" stroke="white" strokeWidth="3" fill="none" className="animate-pulse" />
                    <path d="M15 120 Q 55 60, 95 120 T 175 120" stroke="white" strokeWidth="2" fill="none" />
                </svg>

                {/* Additional geometric elements */}
                <div className="absolute top-1/2 left-0 w-16 h-px bg-white/20 rotate-45"></div>
                <div className="absolute bottom-1/2 right-0 w-16 h-px bg-white/20 -rotate-45"></div>

                {/* Larger corner elements */}
                {/* <div className="absolute top-0 right-1/4 w-32 h-32 border border-white/10 rounded-full"></div>
                <div className="absolute bottom-0 left-1/4 w-20 h-20 border border-white/15 rounded-full"></div> */}

                {/* Dots with better visibility */}
                {/* <div className="absolute top-1/3 right-1/4 w-4 h-4 border-2 border-white/30 rounded-full"></div>
                <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-white/30 rounded-full"></div>
                <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-white/50 rounded-full"></div> */}

                {/* Cross patterns */}
                {/* <div className="absolute top-1/4 left-1/2 w-8 h-px bg-white/20"></div> */}
                {/* <div className="absolute top-1/4 left-1/2 w-px h-8 bg-white/20 transform -translate-x-1/2"></div> */}

                {/* Grid Pattern - more visible */}
                {/* <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
                    backgroundSize: '30px 30px'
                }}></div> */}

                {/* Diagonal lines for more dynamic feel */}
                <div className="absolute top-10 right-20 w-12 h-12 border-l border-b border-white/15 rotate-45"></div>
                <div className="absolute bottom-10 left-20 w-16 h-16 border-r border-t border-white/15 -rotate-45"></div>
            </div>
        </section>
    );
};

export default About;