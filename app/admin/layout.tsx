'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    Users,
    FileText,
    BarChart3,
    LogOut,
    Menu,
    X,
    Globe,
    MessageSquare,
    Calendar,
    Database,
    Code,
    Palette,
    Home,
    Shield
} from 'lucide-react'

const adminMenuItems = [
    {
        title: 'Dashboard',
        href: '/admin',
        icon: Home,
        color: 'bg-gray-500'
    },
    {
        title: 'Lead Management',
        href: '/admin/leads',
        icon: MessageSquare,
        color: 'bg-purple-500'
    },
    {
        title: 'Client Management',
        href: '/admin/clients',
        icon: Users,
        color: 'bg-blue-500'
    },
    {
        title: 'Project Templates',
        href: '/admin/templates',
        icon: Code,
        color: 'bg-green-500'
    },
    {
        title: 'Analytics',
        href: '/admin/analytics',
        icon: BarChart3,
        color: 'bg-orange-500'
    },
    {
        title: 'Content Manager',
        href: '/admin/content',
        icon: FileText,
        color: 'bg-pink-500'
    },
    {
        title: 'Resource Library',
        href: '/admin/resources',
        icon: Database,
        color: 'bg-indigo-500'
    },
    {
        title: 'Design Assets',
        href: '/admin/assets',
        icon: Palette,
        color: 'bg-teal-500'
    },
    {
        title: 'Schedule',
        href: '/admin/schedule',
        icon: Calendar,
        color: 'bg-red-500'
    }
]

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/logout', {
                method: 'POST',
            })
            router.push('/')
            router.refresh()
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Top navbar - full width */}
            <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6 z-10">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-black">pacoguerraq</span>
                        <span className="text-lg text-gray-600">(admin)</span>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Site"
                    >
                        <Globe className="w-5 h-5" />
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </header>

            {/* Content area with sidebar */}
            <div className="flex-1 flex overflow-hidden">
                {/* Mobile sidebar overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out border-r border-gray-200
          lg:top-16 lg:static lg:z-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
                    <div className="flex flex-col h-full">
                        {/* Navigation */}
                        <nav className="flex-1 px-4 py-6 overflow-y-auto">
                            <div className="mb-6">
                                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Admin Tools
                                </h3>
                            </div>
                            <div className="space-y-1">
                                {adminMenuItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <div className={`flex-shrink-0 w-6 h-6 rounded ${item.color} flex items-center justify-center mr-3`}>
                                            <item.icon className="w-4 h-4 text-white" />
                                        </div>
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </nav>

                        {/* Sidebar footer - mobile logout */}
                        <div className="p-4 border-t border-gray-200 lg:hidden">
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4 mr-3" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main content area */}
                <div className="flex-1 overflow-y-auto lg:ml-0">
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}