// components/Services.tsx
'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { serviceData } from '@/assets/assets';

const Services = () => {
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

        const element = document.querySelector('#services');
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
        <section id="services" className="min-h-[85vh] py-20 flex items-center justify-center bg-gray-50 text-gray-900 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-16">

                {/* Section Header */}
                <div className={`text-center mb-16 transform transition-all ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}>
                    <p className="text-sm text-gray-600 uppercase tracking-wide mb-3">What I offer</p>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-black">My Services</h2>
                    <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                        Custom web solutions, from e-commerce to business automation, ensuring performance and scalability.
                    </p>
                    <div className="w-16 h-0.5 bg-black mx-auto mt-6"></div>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    {serviceData.map((service, index) => (
                        <div
                            key={index}
                            className={`relative bg-white border border-gray-200 rounded-2xl p-8 cursor-pointer group transform hover:shadow-2xl hover:scale-105 hover:border-gray-300 hover:-translate-y-2 transition-all ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}
                            style={{
                                // transitionDelay: isVisible ? `${200 + index * 100}ms` : '0ms'
                            }}
                        >
                            {/* Service Icon */}
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer transition-all group-hover:scale-110 group-hover:rotate-3">
                                    <Image
                                        src={service.icon}
                                        alt={service.title}
                                        width={28}
                                        height={28}
                                        className="w-7 h-7"
                                    />
                                </div>
                            </div>

                            {/* Service Content */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4 leading-tight cursor-pointer transition-colors group-hover:text-gray-800">
                                    {service.title}
                                </h3>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 rounded-2xl opacity-0 pointer-events-none transition-opacity group-hover:opacity-100"></div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Enhanced Background Styling */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Larger geometric elements */}
                <div className="absolute top-20 left-20 w-32 h-32 border-2 border-gray-300 rounded-full opacity-20"></div>
                <div className="absolute top-60 right-32 w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl opacity-15 rotate-12"></div>
                <div className="absolute bottom-60 left-40 w-16 h-16 bg-gray-200 rounded-full opacity-25"></div>

                {/* Dynamic lines */}
                <div className="absolute top-1/3 right-20 w-24 h-0.5 bg-gray-300 rotate-45 opacity-30"></div>
                <div className="absolute bottom-1/3 left-16 w-32 h-0.5 bg-gray-300 -rotate-45 opacity-30"></div>

                {/* Corner accents */}
                <div className="absolute top-10 right-10 w-20 h-20 border-l-2 border-t-2 border-gray-300 opacity-20"></div>
                <div className="absolute bottom-10 left-10 w-20 h-20 border-r-2 border-b-2 border-gray-300 opacity-20"></div>

                {/* Enhanced dot pattern */}
                <div className="absolute inset-0 opacity-15" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, #9ca3af 1.5px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            {/* Bottom Triangle Styling - Varied Shapes and Dark Gray Tones */}
            <div className="absolute bottom-0 left-0 w-full h-40 overflow-hidden">

                {/* Triangle from right - overlapping */}
                <div
                    className="absolute bottom-0 right-0 w-[40%] h-full bg-[#1a1b1b]"
                    style={{
                        clipPath: 'polygon(0 100%, 100% 100%, 100% 0)'
                    }}
                ></div>
                {/* Triangle from left - largest */}
                <div
                    className="absolute bottom-0 left-0 w-[70%] h-full bg-[#a9a9a9] opacity-55"
                    style={{
                        clipPath: 'polygon(0 100%, 100% 100%, 0 0)'
                    }}
                ></div>
                {/* Triangle from left - medium, darker */}
                <div
                    className="absolute bottom-0 left-0 w-[30%] h-full bg-[#555455]"
                    style={{
                        clipPath: 'polygon(0 100%, 100% 100%, 0 0)'
                    }}
                ></div>

            </div>
        </section>
    );
};

export default Services;