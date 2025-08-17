// components/Work.tsx
'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { workData } from '@/assets/assets';

interface Project {
    title: string;
    type: string;
    category: 'static-website' | 'custom-platform';
    inProgress?: boolean;
    description: string;
    techStack: string[];
    bgImage: string;
    link: string;
}

type FilterCategory = 'all' | 'static-website' | 'custom-platform';

const Work = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

    // Sort projects: completed projects first, then in-progress projects at the end
    const sortedProjects = [...workData].sort((a, b) => {
        if (a.inProgress && !b.inProgress) return 1;
        if (!a.inProgress && b.inProgress) return -1;
        return 0;
    });

    // Filter projects based on active filter
    const filteredProjects = sortedProjects.filter(project => {
        if (activeFilter === 'all') return true;
        return project.category === activeFilter;
    });

    const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 4);

    const filterOptions = [
        { key: 'all', label: 'All' },
        { key: 'static-website', label: 'Static Websites' },
        { key: 'custom-platform', label: 'Custom Platforms' },
    ] as const;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.querySelector('#work');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    const openModal = (project: Project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'unset';
    };

    const openExternalLink = (url: string) => {
        if (url) {
            window.open(url, '_blank');
        }
    };

    // Close modal when clicking outside
    const handleModalBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const handleFilterChange = (filter: FilterCategory) => {
        setActiveFilter(filter);
        setShowAllProjects(false); // Reset to show limited projects when changing filter
    };

    return (
        <section id="work" className="min-h-screen py-20 relative overflow-hidden">
            {/* Top Triangle Styling - Varied Shapes and Dark Gray Tones */}
            <div className="absolute top-0 left-0 w-full h-40 overflow-hidden z-20">

                {/* Triangle from right - overlapping */}
                <div
                    className="absolute top-0 right-0 w-[40%] h-full bg-[#1a1b1b]"
                    style={{
                        clipPath: 'polygon(0 0%, 100% 0%, 100% 100%)'
                    }}
                ></div>
                {/* Triangle from left - largest */}
                <div
                    className="absolute top-0 left-0 w-[70%] h-full bg-[#a9a9a9] opacity-55"
                    style={{
                        clipPath: 'polygon(0 0%, 100% 0%, 0 100%)'
                    }}
                ></div>
                {/* Triangle from left - medium, darker */}
                <div
                    className="absolute top-0 left-0 w-[30%] h-full bg-[#555455]"
                    style={{
                        clipPath: 'polygon(0 0%, 100% 0%, 0 100%)'
                    }}
                ></div>

            </div>

            {/* Simple Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-50 to-black/20"></div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
                {/* Section Header */}
                <div className={`text-center mb-16 transform transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}>
                    <p className="text-sm text-gray-700 uppercase tracking-wide mb-3 font-medium">Portfolio</p>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">My Work</h2>
                    <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        A showcase of web applications and business solutions I've built for clients.
                    </p>
                    <div className="w-16 h-0.5 bg-gray-900 mx-auto mt-6"></div>
                </div>

                {/* Filter Buttons */}
                <div className={`flex flex-wrap justify-center gap-3 mb-12 transform transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`} style={{ transitionDelay: '200ms' }}>
                    {filterOptions.map((option) => (
                        <button
                            key={option.key}
                            onClick={() => handleFilterChange(option.key)}
                            className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:shadow-md ${activeFilter === option.key
                                    ? 'bg-gray-900 text-white shadow-lg hover:bg-gray-800'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                    {displayedProjects.map((project, index) => (
                        <div
                            key={index}
                            className={`group bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 ease-out shadow-sm ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                } hover:shadow-lg hover:shadow-gray-900/10 hover:-translate-y-2 hover:border-gray-300`}
                            onClick={() => openModal(project)}
                        >
                            {/* Project Image */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={project.bgImage}
                                    alt={project.title}
                                    width={400}
                                    height={300}
                                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out"
                                />

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/20 transition-all duration-300"></div>

                                {/* In Progress Badge */}
                                {project.inProgress && (
                                    <div className="absolute top-3 right-3 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                                        In Progress
                                    </div>
                                )}

                                {/* View Project Indicator */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-900">
                                            <path d="M7 17L17 7" />
                                            <path d="M7 7h10v10" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Project Content */}
                            <div className="p-4">
                                {/* Project Type */}
                                <div className="mb-1">
                                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{project.type}</span>
                                </div>

                                {/* Project Title */}
                                <h3 className="text-base font-bold text-gray-900 mb-3 leading-tight group-hover:text-gray-700 transition-colors duration-300">
                                    {project.title}
                                </h3>

                                {/* Tech Stack Preview */}
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.slice(0, 2).map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium group-hover:bg-gray-200 transition-colors duration-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.techStack.length > 2 && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium group-hover:bg-gray-200 transition-colors duration-300">
                                            +{project.techStack.length - 2}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More/Less Button */}
                {filteredProjects.length > 4 && (
                    <div className={`text-center transform transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`} style={{ transitionDelay: '800ms' }}>
                        <button
                            onClick={() => setShowAllProjects(!showAllProjects)}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/25 hover:-translate-y-1 group"
                        >
                            <span>{showAllProjects ? 'Show Less' : `View All Projects (${filteredProjects.length})`}</span>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className={`transition-transform duration-300 ${showAllProjects ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}
                            >
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 bg-gray-900/70 backdrop-blur-md z-50 flex items-center justify-center p-0 sm:p-4"
                    onClick={handleModalBackdropClick}
                >
                    <div className="relative bg-white rounded-none sm:rounded-2xl max-w-2xl w-full h-full sm:h-[85vh] overflow-hidden shadow-2xl">
                        {/* Fixed Background Image Section */}
                        <div
                            className="absolute inset-0 bg-center sm:bg-cover bg-contain bg-no-repeat"
                            style={{
                                backgroundImage: `url(${selectedProject.bgImage})`,
                                backgroundPosition: 'center'
                            }}
                        >
                            {/* Subtle overlay for better contrast */}
                            <div className="absolute inset-0 bg-gray-900/20"></div>
                        </div>

                        {/* Close Button - Always visible */}
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110 shadow-lg"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18" />
                                <path d="M6 6l12 12" />
                            </svg>
                        </button>

                        {/* In Progress Badge - Always visible */}
                        {selectedProject.inProgress && (
                            <div className="absolute top-6 left-6 z-50 bg-gray-900 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
                                In Progress
                            </div>
                        )}

                        {/* Scrollable Content Container */}
                        <div
                            className="absolute inset-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        >
                            {/* Spacer to show image initially - 70% of modal height */}
                            <div className="h-[70vh] flex-shrink-0 relative">
                                {/* Drawer Handle - Visual indicator */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40">
                                    <div className="w-14 h-1.5 bg-white/70 rounded-full shadow-md"></div>
                                </div>
                            </div>

                            {/* Content Section - This will slide up over the image */}
                            <div className="bg-white rounded-t-3xl relative z-30 shadow-2xl">
                                {/* Header */}
                                <div className="px-8 pt-8 pb-4">
                                    {/* Project Type */}
                                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{selectedProject.type}</span>
                                    {/* Project Title */}
                                    <h2 className="text-2xl font-bold text-gray-900 mt-1 mb-6">{selectedProject.title}</h2>
                                </div>

                                <div className="px-8 pb-8">
                                    {/* Project Description */}
                                    <div className="mb-8">
                                        <p className="text-gray-700 leading-relaxed text-base">
                                            {selectedProject.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack - Compact Design */}
                                    <div className="mb-8">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Technologies</h3>
                                        <div className="flex flex-wrap gap-1.5">
                                            {selectedProject.techStack.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium border border-gray-200 hover:bg-gray-200 transition-colors duration-200"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3 mb-8">
                                        {selectedProject.link && (
                                            <button
                                                onClick={() => openExternalLink(selectedProject.link)}
                                                className="flex-1 bg-gray-900 text-white px-5 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-all duration-300 hover:shadow-lg text-sm"
                                            >
                                                <span>View Live Project</span>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M7 17L17 7" />
                                                    <path d="M7 7h10v10" />
                                                </svg>
                                            </button>
                                        )}
                                        <button
                                            onClick={closeModal}
                                            className="flex-1 bg-gray-100 text-gray-700 px-5 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 text-sm"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Work;