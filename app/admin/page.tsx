// app/admin/page.tsx
'use client'

import Link from 'next/link'
import {
    Users,
    MessageSquare,
    FileText,
    Code,
    Palette,
    BarChart3,
    ArrowRight,
    CheckCircle,
    Clock,
    DollarSign
} from 'lucide-react'

const quickActions = [
    {
        title: 'Lead Management',
        description: 'Track and convert potential clients',
        href: '/admin/leads',
        icon: MessageSquare,
        color: 'bg-purple-500',
        count: '3 active'
    },
    {
        title: 'Client Management',
        description: 'Manage converted clients and projects',
        href: '/admin/clients',
        icon: Users,
        color: 'bg-blue-500',
        count: '8 clients'
    },
    {
        title: 'Project Setup',
        description: 'Step-by-step project creation guide',
        href: '/admin/project-setup',
        icon: Code,
        color: 'bg-green-500',
        count: 'Next.js guide'
    },
    {
        title: 'Master Prompts',
        description: 'AI prompts for development workflow',
        href: '/admin/prompts',
        icon: FileText,
        color: 'bg-yellow-500',
        count: '3 prompts'
    },
    {
        title: 'Contact Messages',
        description: 'Template messages for clients',
        href: '/admin/messages',
        icon: MessageSquare,
        color: 'bg-red-500',
        count: '7 templates'
    },
    {
        title: 'Assets & Resources',
        description: 'Quick access to tools and resources',
        href: '/admin/resources',
        icon: Palette,
        color: 'bg-teal-500',
        count: '5 resources'
    }
]

export default function AdminDashboard() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, Paco! 👋
                </h1>
                <p className="text-gray-600">
                    Manage your web development business and client projects from here.
                </p>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {quickActions.map((action) => (
                        <Link
                            key={action.title}
                            href={action.href}
                            className="group relative bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 lg:p-6 transition-all duration-200 hover:shadow-md"
                        >
                            <div className="flex items-start space-x-4">
                                <div className={`flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <action.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors text-sm lg:text-base">
                                            {action.title}
                                        </h3>
                                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100" />
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                                        {action.description}
                                    </p>
                                    <div className="text-xs text-gray-500 font-medium">
                                        {action.count}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}