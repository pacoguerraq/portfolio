// app/admin/projects/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, ExternalLink, Edit, CheckCircle, XCircle, Calendar, DollarSign, Globe, FolderOpen, Palette, FileText, Eye, Home, ChevronRight } from 'lucide-react'
import { use } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

type Project = {
    id: string
    name: string
    description: string | null
    status: 'PLANNING' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED' | 'ON_HOLD'
    planSelected: 'BASIC' | 'EXTENDED_BASIC' | 'PROFESIONAL' | 'EXTENDED_PROFESIONAL' | 'CUSTOM' | null
    finalAmount: number | null
    currency: string
    websiteUrl: string | null
    googleDriveUrl: string | null
    createdAt: string
    updatedAt: string
    client: {
        id: string
        contractSigned: boolean
        contractUrl: string | null
        requiresFactura: boolean | null
        lead: {
            contactName: string | null
            businessName: string | null
            email: string | null
            phone: string | null
            source: string
        }
    }
    brandAsset: {
        id: string
        colorPalette: string | null
        businessContentUrl: string | null
        businessContentName: string | null
        googleDriveImagesUrl: string | null
        additionalComments: string | null
        accessPassword: string | null
        isCompleted: boolean
        submittedAt: string | null
    } | null
}

const statusColors = {
    PLANNING: 'bg-gray-100 text-gray-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    REVIEW: 'bg-yellow-100 text-yellow-800',
    COMPLETED: 'bg-green-100 text-green-800',
    ON_HOLD: 'bg-red-100 text-red-800',
}

const statusLabels = {
    PLANNING: 'Planning',
    IN_PROGRESS: 'In Progress',
    REVIEW: 'Review',
    COMPLETED: 'Completed',
    ON_HOLD: 'On Hold',
}

const planLabels = {
    BASIC: 'Basic',
    EXTENDED_BASIC: 'Extended Basic',
    PROFESIONAL: 'Professional',
    EXTENDED_PROFESIONAL: 'Extended Professional',
    CUSTOM: 'Custom',
}

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [saving, setSaving] = useState(false)
    const [brandAssetModalOpen, setBrandAssetModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'PLANNING',
        planSelected: null as string | null,
        finalAmount: '',
        currency: 'USD',
        websiteUrl: '',
        googleDriveUrl: '',
    })
    const [brandAssetData, setBrandAssetData] = useState({
        colorPalette: '',
        googleDriveImagesUrl: '',
        additionalComments: '',
        isCompleted: false,
    })

    useEffect(() => {
        fetchProject()
    }, [id])

    const fetchProject = async () => {
        try {
            const response = await fetch(`/api/admin/projects/${id}`)
            if (response.ok) {
                const data = await response.json()
                setProject(data)
                setFormData({
                    name: data.name,
                    description: data.description || `Project ${data.name} for ${getDisplayName()}`,
                    status: data.status,
                    planSelected: data.planSelected,
                    finalAmount: data.finalAmount ? data.finalAmount.toString() : '',
                    currency: data.currency,
                    websiteUrl: data.websiteUrl || '',
                    googleDriveUrl: data.googleDriveUrl || '',
                })
                if (data.brandAsset) {
                    setBrandAssetData({
                        colorPalette: data.brandAsset.colorPalette || '',
                        googleDriveImagesUrl: data.brandAsset.googleDriveImagesUrl || '',
                        additionalComments: data.brandAsset.additionalComments || '',
                        isCompleted: data.brandAsset.isCompleted,
                    })
                }
            } else if (response.status === 404) {
                router.push('/admin/clients')
            }
        } catch (error) {
            console.error('Error fetching project:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        if (!project) return

        setSaving(true)
        try {
            // Update project
            const projectResponse = await fetch(`/api/admin/projects/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            // Update brand asset if it exists
            if (project.brandAsset) {
                await fetch(`/api/admin/brand-assets/${project.brandAsset.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(brandAssetData),
                })
            }

            if (projectResponse.ok) {
                await fetchProject()
                setEditing(false)
            }
        } catch (error) {
            console.error('Error saving project:', error)
        } finally {
            setSaving(false)
        }
    }

    const getDisplayName = () => {
        if (!project) return ''
        return project.client.lead.businessName || project.client.lead.contactName || 'Unnamed Client'
    }

    const getDefaultDescription = () => {
        if (!project) return ''
        return `Project ${project.name} for ${getDisplayName()}`
    }

    const formatCurrency = (amount: number | null) => {
        if (!amount) return '-'
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: project?.currency || 'USD'
        }).format(amount)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading project...</div>
            </div>
        )
    }

    if (!project) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Project not found</div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                <button
                    onClick={() => router.push('/admin')}
                    className="hover:text-gray-900 transition-colors"
                >
                    <Home className="w-4 h-4" />
                </button>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <button
                    onClick={() => router.push('/admin/clients')}
                    className="hover:text-gray-900 transition-colors"
                >
                    Clients
                </button>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 font-medium">{project.name}</span>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center space-x-4 min-w-0">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="min-w-0">
                        <h1 className="text-2xl font-bold text-gray-900 truncate">{project.name}</h1>
                        <p className="text-gray-600 truncate">Client: {getDisplayName()}</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
                    {editing ? (
                        <>
                            <button
                                onClick={() => {
                                    setEditing(false)
                                    // Reset form data
                                    setFormData({
                                        name: project.name,
                                        description: project.description || getDefaultDescription(),
                                        status: project.status,
                                        planSelected: project.planSelected,
                                        finalAmount: project.finalAmount ? project.finalAmount.toString() : '',
                                        currency: project.currency,
                                        websiteUrl: project.websiteUrl || '',
                                        googleDriveUrl: project.googleDriveUrl || '',
                                    })
                                }}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-center"
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center justify-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                            >
                                {saving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        <span>Save Changes</span>
                                    </>
                                )}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setEditing(true)}
                            className="flex items-center justify-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <Edit className="w-4 h-4" />
                            <span>Edit Project</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Project Information */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Project Details Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h2>

                        <div className="space-y-4">
                            {editing ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Project Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder={getDefaultDescription()}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <select
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            >
                                                <option value="PLANNING">Planning</option>
                                                <option value="IN_PROGRESS">In Progress</option>
                                                <option value="REVIEW">Review</option>
                                                <option value="COMPLETED">Completed</option>
                                                <option value="ON_HOLD">On Hold</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Plan Selected
                                            </label>
                                            <select
                                                value={formData.planSelected || ''}
                                                onChange={(e) => setFormData({ ...formData, planSelected: e.target.value || null })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            >
                                                <option value="">Select Plan</option>
                                                <option value="BASIC">Basic</option>
                                                <option value="EXTENDED_BASIC">Extended Basic</option>
                                                <option value="PROFESIONAL">Professional</option>
                                                <option value="EXTENDED_PROFESIONAL">Extended Professional</option>
                                                <option value="CUSTOM">Custom</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Final Amount
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formData.finalAmount}
                                                onChange={(e) => setFormData({ ...formData, finalAmount: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                                placeholder="0.00"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Currency
                                            </label>
                                            <select
                                                value={formData.currency}
                                                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            >
                                                <option value="USD">USD</option>
                                                <option value="MXN">MXN</option>
                                                <option value="EUR">EUR</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[project.status]}`}>
                                                {statusLabels[project.status]}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-1">Plan</h3>
                                            <p className="text-gray-900">{project.planSelected ? planLabels[project.planSelected] : '-'}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-1">Project Value</h3>
                                            <p className="text-gray-900 font-medium">{formatCurrency(project.finalAmount)}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-1">Created</h3>
                                            <p className="text-gray-900">{new Date(project.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    {project.description && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                                            <p className="text-gray-900">{project.description}</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Links Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Links</h2>

                        {editing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Website URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.websiteUrl}
                                        onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="https://..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Google Drive URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.googleDriveUrl}
                                        onChange={(e) => setFormData({ ...formData, googleDriveUrl: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="https://drive.google.com/..."
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {project.websiteUrl ? (
                                    <a
                                        href={project.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <Globe className="w-5 h-5 text-blue-600" />
                                        <div>
                                            <p className="font-medium text-gray-900">Website</p>
                                            <p className="text-sm text-gray-500">View live website</p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                                    </a>
                                ) : (
                                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                                        <Globe className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium text-gray-500">Website</p>
                                            <p className="text-sm text-gray-400">No website URL set</p>
                                        </div>
                                    </div>
                                )}

                                {project.googleDriveUrl ? (
                                    <a
                                        href={project.googleDriveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <FolderOpen className="w-5 h-5 text-green-600" />
                                        <div>
                                            <p className="font-medium text-gray-900">Project Files</p>
                                            <p className="text-sm text-gray-500">View Google Drive folder</p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                                    </a>
                                ) : (
                                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                                        <FolderOpen className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium text-gray-500">Project Files</p>
                                            <p className="text-sm text-gray-400">No Google Drive URL set</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Client Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h2>

                        <div className="space-y-3">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Business Name</h3>
                                <p className="text-gray-900">{project.client.lead.businessName || '-'}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Contact Name</h3>
                                <p className="text-gray-900">{project.client.lead.contactName || '-'}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                <p className="text-gray-900">{project.client.lead.email || '-'}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                                <p className="text-gray-900">{project.client.lead.phone || '-'}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Source</h3>
                                <p className="text-gray-900 capitalize">{project.client.lead.source.toLowerCase()}</p>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-500">Contract Status</span>
                                {project.client.contractSigned ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                    <XCircle className="w-4 h-4 text-red-600" />
                                )}
                            </div>
                            <p className={`text-sm ${project.client.contractSigned ? 'text-green-600' : 'text-red-600'}`}>
                                {project.client.contractSigned ? 'Signed' : 'Pending'}
                            </p>

                            {project.client.contractUrl && (
                                <a
                                    href={project.client.contractUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 mt-2"
                                >
                                    <span>View Contract</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Brand Assets */}
                    {project.brandAsset && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">Brand Assets</h2>
                                <button
                                    onClick={() => setBrandAssetModalOpen(true)}
                                    className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>View Details</span>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-500">Completion Status</span>
                                    {project.brandAsset.isCompleted ? (
                                        <span className="flex items-center space-x-1 text-sm text-green-600">
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Complete</span>
                                        </span>
                                    ) : (
                                        <span className="flex items-center space-x-1 text-sm text-orange-600">
                                            <XCircle className="w-4 h-4" />
                                            <span>Pending</span>
                                        </span>
                                    )}
                                </div>

                                {project.brandAsset.submittedAt && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-500">Submitted</span>
                                        <span className="text-sm text-gray-900">{new Date(project.brandAsset.submittedAt).toLocaleDateString()}</span>
                                    </div>
                                )}

                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        Client asset collection form will be available at:
                                    </p>
                                    <p className="text-sm font-mono text-blue-600 mt-1">
                                        /client-portal/{project.id}
                                    </p>
                                    {project.brandAsset.accessPassword && (
                                        <div className="mt-2 pt-2 border-t border-gray-200">
                                            <p className="text-xs text-gray-500 mb-1">Client Portal Password:</p>
                                            <p className="text-sm font-mono bg-white px-2 py-1 rounded border font-semibold text-green-700">
                                                {project.brandAsset.accessPassword}
                                            </p>
                                        </div>
                                    )}
                                    <p className="text-xs text-gray-500 mt-2">
                                        This will be a password-protected form for the client to upload their brand assets.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Brand Assets Modal */}
            {project.brandAsset && (
                <Dialog.Root open={brandAssetModalOpen} onOpenChange={setBrandAssetModalOpen}>
                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-4 lg:p-6 w-full max-w-2xl z-50 max-h-[90vh] overflow-y-auto mx-4">
                            <div className="flex items-center justify-between mb-6">
                                <Dialog.Title className="text-lg font-semibold text-gray-900 pr-4">
                                    Brand Assets Details
                                </Dialog.Title>
                                <Dialog.Close className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                                    <span className="sr-only">Close</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </Dialog.Close>
                            </div>

                            <div className="space-y-6">
                                {/* Status */}
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-gray-50 rounded-lg space-y-3 lg:space-y-0">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">Collection Status</h3>
                                        <p className="text-sm text-gray-600">Current state of brand asset collection</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {project.brandAsset.isCompleted ? (
                                            <>
                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                                <span className="text-green-600 font-medium">Complete</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="w-5 h-5 text-orange-600" />
                                                <span className="text-orange-600 font-medium">Pending</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Color Palette */}
                                {project.brandAsset.colorPalette && (
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Color Palette</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-gray-900 text-sm lg:text-base break-words">{project.brandAsset.colorPalette}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Business Content Document */}
                                {project.brandAsset.businessContentUrl && (
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Business Content Document</h3>
                                        <a
                                            href={project.brandAsset.businessContentUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 text-sm lg:text-base truncate">
                                                    {project.brandAsset.businessContentName || 'Business Content Document'}
                                                </p>
                                                <p className="text-sm text-gray-500">Click to view document</p>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                        </a>
                                    </div>
                                )}

                                {/* Client Images - Editable */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Client Images & Assets</h3>
                                    <form
                                        onSubmit={async (e) => {
                                            e.preventDefault()
                                            if (!project.brandAsset) return
                                            const form = e.target as HTMLFormElement
                                            const input = form.elements.namedItem('googleDriveImagesUrl') as HTMLInputElement
                                            const url = input.value.trim()
                                            if (!url) return
                                            try {
                                                await fetch(`/api/admin/brand-assets/${project.brandAsset.id}`, {
                                                    method: 'PUT',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ googleDriveImagesUrl: url }),
                                                })
                                                await fetchProject()
                                            } catch (err) {
                                                alert('Failed to update Google Drive Images URL')
                                            }
                                        }}
                                        className="flex flex-col lg:flex-row items-stretch lg:items-center space-y-2 lg:space-y-0 lg:space-x-2"
                                    >
                                        <input
                                            type="url"
                                            name="googleDriveImagesUrl"
                                            defaultValue={project.brandAsset.googleDriveImagesUrl || ''}
                                            placeholder="https://drive.google.com/folder..."
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                                        />
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Save
                                        </button>
                                    </form>
                                    {project.brandAsset.googleDriveImagesUrl && (
                                        <a
                                            href={project.brandAsset.googleDriveImagesUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors mt-2"
                                        >
                                            <Palette className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 text-sm lg:text-base">Images & Logo Assets</p>
                                                <p className="text-sm text-gray-500">View client-uploaded media</p>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                        </a>
                                    )}
                                </div>

                                {/* Additional Comments */}
                                {project.brandAsset.additionalComments && (
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Additional Comments</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-gray-900 text-sm lg:text-base break-words leading-relaxed">{project.brandAsset.additionalComments}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Submission Date */}
                                {project.brandAsset.submittedAt && (
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Submission Date</h3>
                                        <p className="text-gray-600 text-sm lg:text-base">{new Date(project.brandAsset.submittedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}</p>
                                    </div>
                                )}

                                {/* Client Portal Link */}
                                <div className="border-t pt-6">
                                    <h3 className="font-medium text-gray-900 mb-2">Client Collection Portal</h3>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <p className="text-sm text-blue-800 mb-2">
                                            Share this link with your client to collect their brand assets:
                                        </p>
                                        <div className="flex flex-col lg:flex-row items-stretch lg:items-center space-y-2 lg:space-y-0 lg:space-x-2">
                                            <code className="flex-1 bg-white px-3 py-2 rounded border text-xs lg:text-sm break-all">
                                                {typeof window !== 'undefined' ? window.location.origin : ''}/client-portal/{project.id}
                                            </code>
                                            <button
                                                onClick={() => {
                                                    if (typeof window !== 'undefined') {
                                                        navigator.clipboard.writeText(`${window.location.origin}/client-portal/${project.id}`)
                                                    }
                                                }}
                                                className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                                            >
                                                Copy
                                            </button>
                                        </div>

                                        {project.brandAsset.accessPassword && (
                                            <div className="mt-3 pt-3 border-t border-blue-200">
                                                <p className="text-sm text-blue-800 mb-2">Client Portal Password:</p>
                                                <div className="flex flex-col lg:flex-row items-stretch lg:items-center space-y-2 lg:space-y-0 lg:space-x-2">
                                                    <code className="flex-1 bg-white px-3 py-2 rounded border font-semibold text-green-700 text-sm break-all">
                                                        {project.brandAsset.accessPassword}
                                                    </code>
                                                    <button
                                                        onClick={() => {
                                                            if (project.brandAsset?.accessPassword && typeof window !== 'undefined') {
                                                                navigator.clipboard.writeText(project.brandAsset.accessPassword)
                                                            }
                                                        }}
                                                        className="px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                                                    >
                                                        Copy
                                                    </button>
                                                </div>
                                                <p className="text-xs text-blue-600 mt-2">
                                                    Share this password with your client for secure access to the portal.
                                                </p>
                                            </div>
                                        )}

                                        <p className="text-xs text-blue-600 mt-3">
                                            Note: The client portal is password-protected for security.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            )}
        </div>
    )
}