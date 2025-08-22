import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'

type Client = {
    id: string
    leadId: string
    contractSigned: boolean
    contractUrl: string | null
    requiresFactura: boolean | null
    constanciaSituacionFiscalUrl: string | null
    createdAt: string
    updatedAt: string
    lead: {
        id: string
        contactName: string | null
        email: string | null
        phone: string | null
        businessName: string | null
        source: string
        projectType: string | null
        contactNotes: string | null
    }
    project: any
    brandAsset: any
}

interface ClientFormModalProps {
    isOpen: boolean
    onClose: () => void
    editingClient: Client | null
    onSubmit: (formData: any) => void
    isSubmitting: boolean
}

export default function ClientFormModal({
    isOpen,
    onClose,
    editingClient,
    onSubmit,
    isSubmitting
}: ClientFormModalProps) {
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({
        contractSigned: false,
        contractUrl: '',
        requiresFactura: false,
        constanciaSituacionFiscalUrl: '',
    })

    // Reset form when modal opens/closes or when editing client changes
    useEffect(() => {
        if (isOpen) {
            if (editingClient) {
                setFormData({
                    contractSigned: editingClient.contractSigned,
                    contractUrl: editingClient.contractUrl || '',
                    requiresFactura: editingClient.requiresFactura ?? false,
                    constanciaSituacionFiscalUrl: editingClient.constanciaSituacionFiscalUrl || '',
                })
            } else {
                setFormData({
                    contractSigned: false,
                    contractUrl: '',
                    requiresFactura: false,
                    constanciaSituacionFiscalUrl: '',
                })
            }
        }
    }, [isOpen, editingClient])

    const handleFileUpload = async (file: File, fieldName: string) => {
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
                setFormData(prev => ({ ...prev, [fieldName]: url }))
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
            contractUrl: formData.contractUrl || null,
            constanciaSituacionFiscalUrl: formData.constanciaSituacionFiscalUrl || null,
        }

        await onSubmit(submitData)
    }

    const getDisplayName = (client: Client) => {
        return client.lead.businessName || client.lead.contactName || 'Unnamed Client'
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl z-50 max-h-[90vh] overflow-y-auto mx-4">
                    <div className="flex items-center justify-between mb-4">
                        <Dialog.Title className="text-lg font-semibold text-gray-900">
                            {editingClient ? `Edit Client - ${getDisplayName(editingClient)}` : 'Edit Client'}
                        </Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <X className="w-4 h-4" />
                            </button>
                        </Dialog.Close>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Contract Section */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-md font-medium text-gray-900 mb-4">Contract Information</h3>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="contractSigned"
                                        checked={formData.contractSigned}
                                        onChange={(e) => setFormData({ ...formData, contractSigned: e.target.checked })}
                                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                        disabled={isSubmitting}
                                    />
                                    <label htmlFor="contractSigned" className="ml-2 block text-sm text-gray-900">
                                        Contract has been signed
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contract Document
                                    </label>
                                    <div className="space-y-2">
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (file) handleFileUpload(file, 'contractUrl')
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                            disabled={uploading || isSubmitting}
                                        />
                                        {uploading && (
                                            <div className="text-sm text-blue-600">Uploading...</div>
                                        )}
                                        {formData.contractUrl && (
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-green-600">✓ File uploaded</span>
                                                <a
                                                    href={formData.contractUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-blue-600 hover:text-blue-800"
                                                >
                                                    View
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, contractUrl: '' }))}
                                                    className="text-sm text-red-600 hover:text-red-800"
                                                    disabled={isSubmitting}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mexican Tax Information */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-md font-medium text-gray-900 mb-4">Tax Information (Mexico)</h3>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="requiresFactura"
                                        checked={formData.requiresFactura}
                                        onChange={(e) => setFormData({ ...formData, requiresFactura: e.target.checked })}
                                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                        disabled={isSubmitting}
                                    />
                                    <label htmlFor="requiresFactura" className="ml-2 block text-sm text-gray-900">
                                        Client requires factura (invoice with tax information)
                                    </label>
                                </div>

                                {formData.requiresFactura && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Constancia de Situación Fiscal
                                        </label>
                                        <div className="space-y-2">
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) handleFileUpload(file, 'constanciaSituacionFiscalUrl')
                                                }}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                disabled={uploading || isSubmitting}
                                            />
                                            {formData.constanciaSituacionFiscalUrl && (
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm text-green-600">✓ File uploaded</span>
                                                    <a
                                                        href={formData.constanciaSituacionFiscalUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-blue-600 hover:text-blue-800"
                                                    >
                                                        View
                                                    </a>
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, constanciaSituacionFiscalUrl: '' }))}
                                                        className="text-sm text-red-600 hover:text-red-800"
                                                        disabled={isSubmitting}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>
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
                                    <span>Update Client</span>
                                )}
                            </button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}