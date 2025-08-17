// components/Contact.tsx
'use client'

import { useState, useEffect } from 'react';

const Contact = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.querySelector('#contact');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        formData.append("access_key", "6677b778-3ab4-4dde-9852-4cbc72176fad");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        type ApiResponse = {
            success: boolean;
            message: string;
            [key: string]: any;
        };

        const data: ApiResponse = await response.json();

        if (data.success) {
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } else {
            console.log("Error", data);
            setSubmitStatus('error');
        }
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus('idle'), 5000);
    };

    const contactMethods = [
        {
            title: 'Email',
            value: 'franciscoguerraquintanilla@gmail.com',
            link: 'mailto:franciscoguerraquintanilla@gmail.com',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            )
        },
        // {
        //     title: 'Phone',
        //     value: '+52 (81) 1606 7984',
        //     link: 'tel:+528116067984',
        //     icon: (
        //         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        //             <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        //         </svg>
        //     )
        // }
    ];

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/pacoguerraq' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/franciscoguerraquintanilla/' },
        // { name: 'Website', url: 'https://pacoguerraq.com' }
    ];

    return (
        <section id="contact" className="min-h-screen py-20 bg-[#555455] text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

                {/* Section Header */}
                <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}>
                    <p className="text-sm text-gray-400 uppercase tracking-wide mb-3">Let's Connect</p>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">Get In Touch</h2>
                    {/* <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        Ready to start your next project? Let's discuss how I can help bring your ideas to life with modern web solutions.
                    </p> */}
                    <div className="w-16 h-0.5 bg-white mx-auto mt-6"></div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* Left Side - Contact Info */}
                    <div className={`transform transition-all duration-800 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}>

                        {/* Intro Text */}
                        <div className="mb-8 sm:mb-12">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                                Let's Start a Conversation
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                Ready to start your next project? Let's discuss how I can help bring your ideas to life with modern web solutions.
                            </p>
                        </div>

                        {/* Contact Methods */}
                        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                            {contactMethods.map((method, index) => (
                                <a
                                    key={index}
                                    href={method.link}
                                    className="group bg-white/10 border border-white/10 rounded-xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4 hover:bg-white/10 hover:scale-105 transition-all cursor-pointer"
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all flex-shrink-0">
                                        {method.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">{method.title}</h4>
                                        <p className="text-gray-300 text-xs sm:text-sm break-all">{method.value}</p>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M7 17L17 7" />
                                            <path d="M7 7h10v10" />
                                        </svg>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="pt-6 sm:pt-8 border-t border-white/10">
                            <h4 className="font-semibold text-white mb-4 sm:mb-6 text-sm sm:text-base">Follow Me</h4>
                            <div className="flex flex-wrap gap-3 sm:gap-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white/10 border border-white/10 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white hover:scale-105 transition-all"
                                    >
                                        {social.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className={`transform transition-all duration-800 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}>
                        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 sm:p-8">
                            <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">

                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="hover:bg-white/10 w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 transition-all text-sm sm:text-base"
                                        placeholder="Your full name"
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="hover:bg-white/10 w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 transition-all text-sm sm:text-base"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={5}
                                        className="hover:bg-white/10 w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 transition-all resize-none text-sm sm:text-base"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${isSubmitting
                                        ? 'bg-[#8b8b8b] cursor-not-allowed'
                                        : 'bg-white text-black hover:bg-gray-100 hover:scale-105'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-4 sm:h-4">
                                                <path d="M7 17L17 7" />
                                                <path d="M7 7h10v10" />
                                            </svg>
                                        </>
                                    )}
                                </button>

                                {/* Status Messages */}
                                {submitStatus === 'success' && (
                                    <div className="p-3 sm:p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                                        <p className="text-green-300 text-xs sm:text-sm font-medium">
                                            ✓ Message sent successfully! I'll get back to you soon.
                                        </p>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="p-3 sm:p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                                        <p className="text-red-300 text-xs sm:text-sm font-medium">
                                            ✗ Failed to send message. Please try again or contact me directly.
                                        </p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>

            </div>

            {/* Background Styling */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Geometric elements */}
                <div className="absolute top-32 left-20 w-24 h-24 border border-white rounded-full opacity-20 hidden sm:block"></div>
                <div className="absolute bottom-40 right-16 w-16 h-16 bg-white rounded-2xl opacity-15 rotate-12 hidden sm:block"></div>
                <div className="absolute top-1/2 right-20 w-8 h-8 bg-white rounded-full opacity-25 hidden sm:block"></div>

                {/* Corner accents */}
                <div className="absolute top-20 right-10 w-20 h-20 border-l-2 border-b-2 border-white opacity-15 hidden sm:block"></div>
                <div className="absolute bottom-20 left-10 w-20 h-20 border-r-2 border-t-2 border-white opacity-15 hidden sm:block"></div>

                {/* Subtle lines */}
                {/* <div className="absolute top-1/4 left-32 w-24 h-0.5 bg-white rotate-45 opacity-20"></div>
                <div className="absolute bottom-1/3 right-32 w-32 h-0.5 bg-white -rotate-45 opacity-20"></div> */}

                {/* Dot pattern */}
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>
        </section>
    );
};

export default Contact;