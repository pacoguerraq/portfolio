// app/admin/leads/page.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import { Plus, Trash2, UserCheck, CheckCircle, Search, Filter, SortAsc, SortDesc } from 'lucide-react'
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

type SortField = 'name' | 'status' | 'source' | 'createdAt'
type SortDirection = 'asc' | 'desc'

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [convertDialogOpen, setConvertDialogOpen] = useState(false)
    const [successDialogOpen, setSuccessDialogOpen] = useState(false)
    const [editingLead, setEditingLead] = useState<Lead | null>(null)
    const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null)
    const [leadToConvert, setLeadToConvert] = useState<Lead | null>(null)
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
    const [tooltipOpen, setTooltipOpen] = useState<string | null>(null)
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
    const [tooltipContent, setTooltipContent] = useState<any>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isConverting, setIsConverting] = useState(false)

    // Filters and Search
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [sourceFilter, setSourceFilter] = useState<string>('all')
    const [sortField, setSortField] = useState<SortField>('createdAt')
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

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
                // Filter out leads that have been converted to clients (status = WON)
                const activeLeads = data.filter((lead: Lead) => lead.status !== 'WON')
                setLeads(activeLeads)
            }
        } catch (error) {
            console.error('Error fetching leads:', error)
        } finally {
            setLoading(false)
        }
    }

    // Filtered and sorted leads
    const filteredAndSortedLeads = useMemo(() => {
        let filtered = leads

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(lead => {
                const searchableText = [
                    lead.contactName,
                    lead.businessName,
                    lead.email,
                    lead.phone,
                    lead.contactNotes
                ].filter(Boolean).join(' ').toLowerCase()
                return searchableText.includes(searchTerm.toLowerCase())
            })
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(lead => lead.status === statusFilter)
        }

        // Apply source filter
        if (sourceFilter !== 'all') {
            filtered = filtered.filter(lead => lead.source === sourceFilter)
        }

        // Apply sorting
        filtered.sort((a, b) => {
            let valueA: any
            let valueB: any

            switch (sortField) {
                case 'name':
                    valueA = (a.businessName || a.contactName || '').toLowerCase()
                    valueB = (b.businessName || b.contactName || '').toLowerCase()
                    break
                case 'status':
                    valueA = a.status
                    valueB = b.status
                    break
                case 'source':
                    valueA = a.source
                    valueB = b.source
                    break
                case 'createdAt':
                    valueA = new Date(a.createdAt)
                    valueB = new Date(b.createdAt)
                    break
                default:
                    return 0
            }

            if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1
            if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1
            return 0
        })

        return filtered
    }, [leads, searchTerm, statusFilter, sourceFilter, sortField, sortDirection])

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('asc')
        }
    }

    const clearFilters = () => {
        setSearchTerm('')
        setStatusFilter('all')
        setSourceFilter('all')
        setSortField('createdAt')
        setSortDirection('desc')
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

    const handleConvertToClient = async (lead: Lead) => {
        setLeadToConvert(lead)
        setConvertDialogOpen(true)
        setDropdownOpen(null)
    }

    const handleConfirmConvert = async () => {
        if (!leadToConvert) return

        setIsConverting(true)
        try {
            const response = await fetch(`/api/admin/leads/${leadToConvert.id}/convert`, {
                method: 'POST',
            })

            if (response.ok) {
                await fetchLeads() // Refresh the leads list
                setConvertDialogOpen(false)
                setLeadToConvert(null)
                setSuccessDialogOpen(true)
            } else {
                const error = await response.json()
                alert(error.error || 'Failed to convert lead to client')
            }
        } catch (error) {
            console.error('Error converting lead to client:', error)
            alert('Failed to convert lead to client')
        } finally {
            setIsConverting(false)
        }
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
        setEditingLead(null)
    }

    const getDisplayName = (lead: Lead) => {
        return lead.businessName || lead.contactName || 'Unnamed Lead'
    }

    const activeFiltersCount = [
        searchTerm,
        statusFilter !== 'all' ? statusFilter : null,
        sourceFilter !== 'all' ? sourceFilter : null
    ].filter(Boolean).length

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
                    <p className="text-gray-600 mt-1">
                        Track and manage potential clients
                        {activeFiltersCount > 0 && (
                            <span className="text-sm">
                                {' '}• Showing {filteredAndSortedLeads.length} of {leads.length} leads
                            </span>
                        )}
                    </p>
                </div>
                <button
                    onClick={() => setDialogOpen(true)}
                    className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Lead</span>
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search leads by name, email, phone, or notes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="min-w-[140px]">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="FOUND">Found</option>
                            <option value="CONTACTED">Contacted</option>
                            <option value="PROPOSAL_SENT">Proposal Sent</option>
                            <option value="LOST">Lost</option>
                        </select>
                    </div>

                    {/* Source Filter */}
                    <div className="min-w-[140px]">
                        <select
                            value={sourceFilter}
                            onChange={(e) => setSourceFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        >
                            <option value="all">All Sources</option>
                            <option value="INSTAGRAM">Instagram</option>
                            <option value="LINKEDIN">LinkedIn</option>
                            <option value="FACEBOOK">Facebook</option>
                            <option value="GOOGLE_MAPS">Google Maps</option>
                            <option value="REFERRAL">Referral</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    {/* Clear Filters */}
                    {activeFiltersCount > 0 && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Clear ({activeFiltersCount})</span>
                        </button>
                    )}
                </div>
            </div>

            <LeadTable
                leads={filteredAndSortedLeads}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onConvertToClient={handleConvertToClient}
                onTooltipShow={handleTooltipShow}
                tooltipOpen={tooltipOpen}
                dropdownOpen={dropdownOpen}
                onDropdownOpen={handleDropdownOpen}
                isDeleting={isDeleting}
                isConverting={isConverting}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
            />

            <LeadFormModal
                isOpen={dialogOpen}
                onClose={handleCloseDialog}
                editingLead={editingLead}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />

            {/* Convert to Client Confirmation Dialog */}
            <Dialog.Root open={convertDialogOpen} onOpenChange={setConvertDialogOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                    <Dialog.Content className="fixed top-1/2 left-0 right-0 mx-auto -translate-y-1/2 bg-white rounded-xl shadow-xl p-4 lg:p-6 w-[90vw] max-w-md z-50 max-h-[90vh] overflow-y-auto">
                        <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
                            Convert to Client
                        </Dialog.Title>
                        <p className="text-gray-600 mb-4 text-sm lg:text-base">
                            Are you sure you want to convert "{leadToConvert ? getDisplayName(leadToConvert) : ''}" to a client? This will:
                        </p>
                        <ul className="text-sm text-gray-600 mb-6 space-y-1 pl-4">
                            <li>• Mark the lead as won</li>
                            <li>• Create a client record</li>
                            <li>• Set up an empty project</li>
                            <li>• Prepare brand assets collection</li>
                        </ul>
                        <div className="flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-3">
                            <Dialog.Close asChild>
                                <button
                                    className="w-full lg:flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 text-sm lg:text-base"
                                    onClick={() => setLeadToConvert(null)}
                                    disabled={isConverting}
                                >
                                    Cancel
                                </button>
                            </Dialog.Close>
                            <button
                                onClick={handleConfirmConvert}
                                disabled={isConverting}
                                className="w-full lg:flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm lg:text-base"
                            >
                                {isConverting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Converting...</span>
                                    </>
                                ) : (
                                    <>
                                        <UserCheck className="w-4 h-4" />
                                        <span>Convert to Client</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* Success Dialog */}
            <Dialog.Root open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                    <Dialog.Content className="fixed top-1/2 left-0 right-0 mx-auto -translate-y-1/2 bg-white rounded-xl shadow-xl p-4 lg:p-6 w-[90vw] max-w-md z-50 max-h-[90vh] overflow-y-auto">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <Dialog.Title className="text-lg font-semibold text-gray-900 mb-2">
                                Successfully Converted!
                            </Dialog.Title>
                            <p className="text-gray-600 mb-6 text-sm lg:text-base">
                                The lead has been successfully converted to a client with a new project set up and ready for onboarding.
                            </p>
                            <Dialog.Close asChild>
                                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm lg:text-base">
                                    Continue
                                </button>
                            </Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* Delete Confirmation Dialog */}
            <Dialog.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                    <Dialog.Content className="fixed top-1/2 left-0 right-0 mx-auto -translate-y-1/2 bg-white rounded-xl shadow-xl p-4 lg:p-6 w-[90vw] max-w-md z-50 max-h-[90vh] overflow-y-auto">
                        <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
                            Delete Lead
                        </Dialog.Title>
                        <p className="text-gray-600 mb-6 text-sm lg:text-base">
                            Are you sure you want to delete "{leadToDelete ? getDisplayName(leadToDelete) : ''}"? This action cannot be undone.
                        </p>
                        <div className="flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-3">
                            <Dialog.Close asChild>
                                <button
                                    className="w-full lg:flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 text-sm lg:text-base"
                                    onClick={() => setLeadToDelete(null)}
                                    disabled={isDeleting}
                                >
                                    Cancel
                                </button>
                            </Dialog.Close>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="w-full lg:flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm lg:text-base"
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
                    className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[140px] z-50"
                    style={{
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                    }}
                >
                    <button
                        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                            const lead = leads.find(l => l.id === dropdownOpen)
                            if (lead) handleEdit(lead)
                        }}
                        disabled={isConverting}
                    >
                        <span>Edit</span>
                    </button>

                    <button
                        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-green-600 hover:bg-gray-50 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                            const lead = leads.find(l => l.id === dropdownOpen)
                            if (lead) handleConvertToClient(lead)
                        }}
                        disabled={isConverting || isDeleting}
                    >
                        {isConverting ? (
                            <>
                                <div className="w-3 h-3 border border-green-600 border-t-transparent rounded-full animate-spin"></div>
                                <span>Converting...</span>
                            </>
                        ) : (
                            <>
                                <UserCheck className="w-4 h-4" />
                                <span>Convert to Client</span>
                            </>
                        )}
                    </button>

                    <button
                        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-50 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                            const lead = leads.find(l => l.id === dropdownOpen)
                            if (lead) handleDeleteClick(lead)
                        }}
                        disabled={isConverting}
                    >
                        <span>Delete</span>
                    </button>
                </div>
            )}
        </div>
    )
}