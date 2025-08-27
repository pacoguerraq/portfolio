// components/admin/LeadFormModal.tsx
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'

type Lead = {
    id: string
    contactName: string | null
    email: string | null
    phone: string | null
    businessName: string | null
    status: 'FOUND' | 'CONTACTED' | 'PROPOSAL_SENT' | 'WON' | 'LOST'
    source: 'INSTAGRAM' | 'LINKEDIN' | 'FACEBOOK' | 'GOOGLE_MAPS' | 'REFERRAL' | 'OTHER'
    projectType: 'STATIC_WEBSITE' | 'OTHER' | null
    contactNotes: string | null
    proposalUrl: string | null
    createdAt: string
    updatedAt: string
}

interface LeadFormModalProps {
    isOpen: boolean
    onClose: () => void
    editingLead: Lead | null
    onSubmit: (formData: any) => void
    isSubmitting: boolean
}

export default function LeadFormModal({
    isOpen,
    onClose,
    editingLead,
    onSubmit,
    isSubmitting
}: LeadFormModalProps) {
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({
        contactName: '',
        email: '',
        phone: '',
        businessName: '',
        status: 'FOUND',
        source: 'INSTAGRAM',
        projectType: 'STATIC_WEBSITE',
        contactNotes: '',
        proposalUrl: '',
    })

    // Reset form when modal opens/closes or when editing lead changes
    useEffect(() => {
        if (isOpen) {
            if (editingLead) {
                setFormData({
                    contactName: editingLead.contactName || '',
                    email: editingLead.email || '',
                    phone: editingLead.phone || '',
                    businessName: editingLead.businessName || '',
                    status: editingLead.status,
                    source: editingLead.source,
                    projectType: editingLead.projectType || 'STATIC_WEBSITE',
                    contactNotes: editingLead.contactNotes || '',
                    proposalUrl: editingLead.proposalUrl || '',
                })
            } else {
                // Reset to empty form for new lead
                setFormData({
                    contactName: '',
                    email: '',
                    phone: '',
                    businessName: '',
                    status: 'FOUND',
                    source: 'INSTAGRAM',
                    projectType: 'STATIC_WEBSITE',
                    contactNotes: '',
                    proposalUrl: '',
                })
            }
        }
    }, [isOpen, editingLead])

    const handlePhoneChange = (value: string) => {
        // Allow only numbers, spaces, parentheses, hyphens, and plus sign
        const cleanedValue = value.replace(/[^0-9\s\(\)\-\+]/g, '')
        setFormData({ ...formData, phone: cleanedValue })
    }

    const handleFileUpload = async (file: File) => {
        setUploading(true)
        try {
            const uploadFormData = new FormData()
            uploadFormData.append('file', file)

            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: uploadFormData,
            })

            if (response.ok) {
                const { url } = await response.json()
                setFormData(prev => ({ ...prev, proposalUrl: url }))
            } else {
                alert('Failed to upload file')
            }
        } catch (error) {
            console.error('Error uploading file:', error)
            alert('Failed to upload file')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const submitData = {
            ...formData,
            contactName: formData.contactName || null,
            email: formData.email || null,
            phone: formData.phone || null,
            businessName: formData.businessName || null,
            contactNotes: formData.contactNotes || null,
            proposalUrl: formData.proposalUrl || null,
        }

        await onSubmit(submitData)
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                <Dialog.Content className="fixed top-1/2 left-0 right-0 mx-auto -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 w-[90vw] max-w-2xl z-50 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                        <Dialog.Title className="text-lg font-semibold text-gray-900">
                            {editingLead ? 'Edit Lead' : 'Add New Lead'}
                        </Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <X className="w-4 h-4" />
                            </button>
                        </Dialog.Close>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contact Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.contactName}
                                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    placeholder="John Doe"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Business Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.businessName}
                                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    placeholder="Acme Corp"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    placeholder="john@example.com"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handlePhoneChange(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    placeholder="+1 (555) 123-4567"
                                    disabled={isSubmitting}
                                />
                                <p className="text-xs text-gray-500 mt-1">Only numbers and common phone symbols allowed</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    disabled={isSubmitting}
                                >
                                    <option value="FOUND">Found</option>
                                    <option value="CONTACTED">Contacted</option>
                                    <option value="PROPOSAL_SENT">Proposal Sent</option>
                                    <option value="LOST">Lost</option>
                                    {/* WON is removed - only available through conversion */}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Source <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.source}
                                    onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    required
                                    disabled={isSubmitting}
                                >
                                    <option value="INSTAGRAM">Instagram</option>
                                    <option value="LINKEDIN">LinkedIn</option>
                                    <option value="FACEBOOK">Facebook</option>
                                    <option value="GOOGLE_MAPS">Google Maps</option>
                                    <option value="REFERRAL">Referral</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Project Type
                                </label>
                                <select
                                    value={formData.projectType}
                                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value as any })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    disabled={isSubmitting}
                                >
                                    <option value="STATIC_WEBSITE">Static Website</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contact Notes
                            </label>
                            <textarea
                                value={formData.contactNotes}
                                onChange={(e) => setFormData({ ...formData, contactNotes: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                rows={3}
                                placeholder="Notes about this lead..."
                                disabled={isSubmitting}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Proposal Document
                            </label>
                            <div className="space-y-2">
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) handleFileUpload(file)
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    disabled={uploading || isSubmitting}
                                />
                                {uploading && (
                                    <div className="text-sm text-blue-600">Uploading...</div>
                                )}
                                {formData.proposalUrl && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-green-600">✓ File uploaded</span>
                                        <a
                                            href={formData.proposalUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:text-blue-800"
                                        >
                                            View
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, proposalUrl: '' }))}
                                            className="text-sm text-red-600 hover:text-red-800"
                                            disabled={isSubmitting}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                            <Dialog.Close asChild>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-full sm:flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                                    disabled={isSubmitting || uploading}
                                >
                                    Cancel
                                </button>
                            </Dialog.Close>
                            <button
                                type="submit"
                                disabled={uploading || isSubmitting}
                                className="w-full sm:flex-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Saving...</span>
                                    </>
                                ) : uploading ? (
                                    <span>Uploading...</span>
                                ) : (
                                    <span>{editingLead ? 'Update Lead' : 'Create Lead'}</span>
                                )}
                            </button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}