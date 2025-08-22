'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import LeadTable from '@/components/admin/LeadTable'
import LeadFormModal from '@/components/admin/LeadFormModal'

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

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [editingLead, setEditingLead] = useState<Lead | null>(null)
    const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null)
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
    const [tooltipOpen, setTooltipOpen] = useState<string | null>(null)
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
    const [tooltipContent, setTooltipContent] = useState<any>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        fetchLeads()
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownOpen) {
                const dropdownElement = document.getElementById(`dropdown-${dropdownOpen}`)
                if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
                    setDropdownOpen(null)
                }
            }

            if (tooltipOpen) {
                const tooltipElement = document.getElementById(`tooltip-${tooltipOpen}`)
                if (tooltipElement && !tooltipElement.contains(event.target as Node)) {
                    setTooltipOpen(null)
                    setTooltipContent(null)
                }
            }
        }

        const handleScroll = () => {
            if (dropdownOpen) {
                setDropdownOpen(null)
            }
            if (tooltipOpen) {
                setTooltipOpen(null)
                setTooltipContent(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        window.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [dropdownOpen, tooltipOpen])

    const fetchLeads = async () => {
        try {
            const response = await fetch('/api/admin/leads')
            if (response.ok) {
                const data = await response.json()
                setLeads(data)
            }
        } catch (error) {
            console.error('Error fetching leads:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDropdownOpen = (leadId: string, event: React.MouseEvent<HTMLButtonElement>) => {
        if (dropdownOpen === leadId) {
            setDropdownOpen(null)
            return
        }

        const button = event.currentTarget
        const rect = button.getBoundingClientRect()

        setDropdownPosition({
            top: rect.bottom + window.scrollY + 4,
            left: rect.right + window.scrollX - 120
        })
        setDropdownOpen(leadId)
    }

    const handleTooltipShow = (id: string, content: any, event: React.MouseEvent) => {
        if (tooltipOpen === id) {
            setTooltipOpen(null)
            setTooltipContent(null)
            return
        }

        const element = event.currentTarget as HTMLElement
        const rect = element.getBoundingClientRect()

        setTooltipPosition({
            top: rect.top + window.scrollY - 10,
            left: rect.left + window.scrollX
        })
        setTooltipContent(content)
        setTooltipOpen(id)
    }

    const handleSubmit = async (formData: any) => {
        setIsSubmitting(true)
        try {
            const url = editingLead ? `/api/admin/leads/${editingLead.id}` : '/api/admin/leads'
            const method = editingLead ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                await fetchLeads()
                handleCloseDialog()
            }
        } catch (error) {
            console.error('Error saving lead:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!leadToDelete) return

        setIsDeleting(true)
        try {
            const response = await fetch(`/api/admin/leads/${leadToDelete.id}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                await fetchLeads()
                setDeleteDialogOpen(false)
                setLeadToDelete(null)
            }
        } catch (error) {
            console.error('Error deleting lead:', error)
        } finally {
            setIsDeleting(false)
        }
    }

    const handleEdit = (lead: Lead) => {
        setEditingLead(lead)
        setDialogOpen(true)
        setDropdownOpen(null)
    }

    const handleDeleteClick = (lead: Lead) => {
        setLeadToDelete(lead)
        setDeleteDialogOpen(true)
        setDropdownOpen(null)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
        setEditingLead(null)
    }

    const getDisplayName = (lead: Lead) => {
        return lead.businessName || lead.contactName || 'Unnamed Lead'
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading leads...</div>
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
                    <p className="text-gray-600 mt-1">Track and manage potential clients</p>
                </div>
                <button
                    onClick={() => setDialogOpen(true)}
                    className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Lead</span>
                </button>
            </div>

            <LeadTable
                leads={leads}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onTooltipShow={handleTooltipShow}
                tooltipOpen={tooltipOpen}
                dropdownOpen={dropdownOpen}
                onDropdownOpen={handleDropdownOpen}
                isDeleting={isDeleting}
            />

            <LeadFormModal
                isOpen={dialogOpen}
                onClose={handleCloseDialog}
                editingLead={editingLead}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 w-full max-w-md z-50 mx-4">
                        <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
                            Delete Lead
                        </Dialog.Title>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete "{leadToDelete ? getDisplayName(leadToDelete) : ''}"? This action cannot be undone.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                            <Dialog.Close asChild>
                                <button
                                    className="w-full sm:flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                                    onClick={() => setLeadToDelete(null)}
                                    disabled={isDeleting}
                                >
                                    Cancel
                                </button>
                            </Dialog.Close>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="w-full sm:flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                {isDeleting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Deleting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4" />
                                        <span>Delete Lead</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* Tooltip Portal */}
            {tooltipOpen && tooltipContent && (
                <div
                    id={`tooltip-${tooltipOpen}`}
                    className="fixed bg-gray-900 text-white text-sm rounded-lg shadow-lg p-3 z-50 min-w-[200px] max-w-sm"
                    style={{
                        top: `${tooltipPosition.top}px`,
                        left: `${tooltipPosition.left}px`,
                        transform: 'translateY(-100%)'
                    }}
                >
                    {tooltipOpen.startsWith('contact-') && (
                        <div className="space-y-1">
                            {tooltipContent.contactName && (
                                <div><strong>Contact:</strong> {tooltipContent.contactName}</div>
                            )}
                            {tooltipContent.businessName && (
                                <div><strong>Business:</strong> {tooltipContent.businessName}</div>
                            )}
                            {tooltipContent.email && (
                                <div><strong>Email:</strong> {tooltipContent.email}</div>
                            )}
                            {tooltipContent.phone && (
                                <div><strong>Phone:</strong> {tooltipContent.phone}</div>
                            )}
                        </div>
                    )}
                    {tooltipOpen.startsWith('notes-') && (
                        <div>{tooltipContent.notes}</div>
                    )}
                    <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                </div>
            )}

            {/* Dropdown Portal */}
            {dropdownOpen && (
                <div
                    id={`dropdown-${dropdownOpen}`}
                    className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] z-50"
                    style={{
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                    }}
                >
                    <button
                        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                        onClick={() => {
                            const lead = leads.find(l => l.id === dropdownOpen)
                            if (lead) handleEdit(lead)
                        }}
                    >
                        <span>Edit</span>
                    </button>
                    <button
                        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-50 text-left"
                        onClick={() => {
                            const lead = leads.find(l => l.id === dropdownOpen)
                            if (lead) handleDeleteClick(lead)
                        }}
                    >
                        <span>Delete</span>
                    </button>
                </div>
            )}
        </div>
    )
}