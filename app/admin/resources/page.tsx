'use client'

import { ExternalLink, Palette, FolderOpen, Globe, Monitor, Share2 } from 'lucide-react'

const resources = [
    {
        id: 'canva',
        title: 'Canva Templates',
        description: 'Design templates and brand assets for client projects',
        url: 'https://www.canva.com/folder/FAFwYP-66js',
        icon: Palette,
        color: 'bg-purple-500',
        category: 'Design'
    },
    {
        id: 'google-drive',
        title: 'Google Drive Folder',
        description: 'Project files, documents, and shared resources',
        url: 'https://drive.google.com/drive/u/0/folders/1pC8_4SLz8M1ZkbRT9OFhDvsiAyC_CyOQ',
        icon: FolderOpen,
        color: 'bg-blue-500',
        category: 'Storage'
    },
    {
        id: 'namecheap',
        title: 'NameCheap Domain Search',
        description: 'Search and register domains for client projects',
        url: 'https://www.namecheap.com/domains/domain-name-search/',
        icon: Globe,
        color: 'bg-orange-500',
        category: 'Domains'
    },
    {
        id: 'amiresponsive',
        title: 'Am I Responsive',
        description: 'Test website responsiveness across different devices',
        url: 'https://ui.dev/amiresponsive',
        icon: Monitor,
        color: 'bg-green-500',
        category: 'Testing'
    },
    {
        id: 'social-preview',
        title: 'Social Share Preview',
        description: 'Preview how websites appear when shared on social media',
        url: 'https://socialsharepreview.com/',
        icon: Share2,
        color: 'bg-teal-500',
        category: 'SEO/Social'
    }
]

export default function ResourcesPage() {
    const handleResourceClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <>
            <div className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Assets & Resources</h1>
                        <p className="text-gray-600 mt-1">Quick access to external tools and resources</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <ExternalLink className="w-4 h-4" />
                        <span>{resources.length} resources available</span>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {resources.map((resource) => (
                        <div
                            key={resource.id}
                            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
                            onClick={() => handleResourceClick(resource.url)}
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${resource.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <resource.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black transition-colors mb-2">
                                        {resource.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {resource.description}
                                    </p>
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        {resource.category}
                                    </span>
                                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                        Open Resource →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}