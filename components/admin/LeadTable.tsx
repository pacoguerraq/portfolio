// components/admin/LeadTable.tsx
import { useState } from 'react'
import { MoreHorizontal, Edit, Trash2, ExternalLink, UserCheck, SortAsc, SortDesc } from 'lucide-react'

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

interface LeadTableProps {
    leads: Lead[]
    onEdit: (lead: Lead) => void
    onDelete: (lead: Lead) => void
    onConvertToClient: (lead: Lead) => void
    onTooltipShow: (id: string, content: any, event: React.MouseEvent) => void
    tooltipOpen: string | null
    dropdownOpen: string | null
    onDropdownOpen: (leadId: string, event: React.MouseEvent<HTMLButtonElement>) => void
    isDeleting: boolean
    isConverting: boolean
    sortField: SortField
    sortDirection: SortDirection
    onSort: (field: SortField) => void
}

const statusColors = {
    FOUND: 'bg-gray-100 text-gray-800',
    CONTACTED: 'bg-blue-100 text-blue-800',
    PROPOSAL_SENT: 'bg-yellow-100 text-yellow-800',
    WON: 'bg-green-100 text-green-800',
    LOST: 'bg-red-100 text-red-800',
}

const statusLabels = {
    FOUND: 'Found',
    CONTACTED: 'Contacted',
    PROPOSAL_SENT: 'Proposal Sent',
    WON: 'Won',
    LOST: 'Lost',
}

const sourceLabels = {
    INSTAGRAM: 'Instagram',
    LINKEDIN: 'LinkedIn',
    FACEBOOK: 'Facebook',
    GOOGLE_MAPS: 'Google Maps',
    REFERRAL: 'Referral',
    OTHER: 'Other',
}

const projectTypeLabels = {
    STATIC_WEBSITE: 'Static Website',
    OTHER: 'Other',
}

const formatDate = (dateString: string) => {
    // Create date object from UTC string and convert to Mexico timezone (UTC-6)
    const date = new Date(dateString)

    // Convert to Mexico timezone (America/Mexico_City)
    const mexicoDate = new Date(date.toLocaleString("en-US", { timeZone: "America/Mexico_City" }))

    // Format to DD/MMM/YY (e.g., 29/Aug/25)
    const day = mexicoDate.getDate().toString().padStart(2, '0')
    const month = mexicoDate.toLocaleDateString('en-US', { month: 'short' })
    const year = mexicoDate.getFullYear().toString().slice(-2)

    return `${day}/${month}/${year}`
}

const ContactTooltip = ({
    lead,
    children,
    onTooltipShow,
    tooltipOpen
}: {
    lead: Lead
    children: React.ReactNode
    onTooltipShow: (id: string, content: any, event: React.MouseEvent) => void
    tooltipOpen: string | null
}) => {
    const contactContent = {
        contactName: lead.contactName,
        businessName: lead.businessName,
        email: lead.email,
        phone: lead.phone
    }

    const isActive = tooltipOpen === `contact-${lead.id}`

    return (
        <div
            onClick={(e) => onTooltipShow(`contact-${lead.id}`, contactContent, e)}
            className={`cursor-pointer transition-all duration-200 ${isActive ? 'underline text-blue-700' : 'hover:underline'
                }`}
        >
            {children}
        </div>
    )
}

const NotesTooltip = ({
    notes,
    leadId,
    children,
    onTooltipShow,
    tooltipOpen
}: {
    notes: string
    leadId: string
    children: React.ReactNode
    onTooltipShow: (id: string, content: any, event: React.MouseEvent) => void
    tooltipOpen: string | null
}) => {
    const isActive = tooltipOpen === `notes-${leadId}`

    return (
        <div
            onClick={(e) => onTooltipShow(`notes-${leadId}`, { notes }, e)}
            className={`cursor-pointer transition-all duration-200 inline-block ${isActive ? 'underline text-blue-700' : 'hover:underline'
                }`}
        >
            {children}
        </div>
    )
}

const SortableHeader = ({
    field,
    children,
    sortField,
    sortDirection,
    onSort
}: {
    field: SortField
    children: React.ReactNode
    sortField: SortField
    sortDirection: SortDirection
    onSort: (field: SortField) => void
}) => {
    const isActive = sortField === field

    return (
        <th
            className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none"
            onClick={() => onSort(field)}
        >
            <div className="flex items-center space-x-1">
                <span>{children}</span>
                <div className="flex flex-col">
                    {isActive ? (
                        sortDirection === 'asc' ? (
                            <SortAsc className="w-3 h-3 text-gray-700" />
                        ) : (
                            <SortDesc className="w-3 h-3 text-gray-700" />
                        )
                    ) : (
                        <div className="w-3 h-3 opacity-30">
                            <SortAsc className="w-3 h-3" />
                        </div>
                    )}
                </div>
            </div>
        </th>
    )
}

export default function LeadTable({
    leads,
    onEdit,
    onDelete,
    onConvertToClient,
    onTooltipShow,
    tooltipOpen,
    dropdownOpen,
    onDropdownOpen,
    isDeleting,
    isConverting,
    sortField,
    sortDirection,
    onSort
}: LeadTableProps) {
    const getDisplayName = (lead: Lead) => {
        return lead.businessName || lead.contactName || 'Unnamed Lead'
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-20">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <SortableHeader
                                field="name"
                                sortField={sortField}
                                sortDirection={sortDirection}
                                onSort={onSort}
                            >
                                Contact / Business
                            </SortableHeader>
                            <SortableHeader
                                field="status"
                                sortField={sortField}
                                sortDirection={sortDirection}
                                onSort={onSort}
                            >
                                Status
                            </SortableHeader>
                            <SortableHeader
                                field="source"
                                sortField={sortField}
                                sortDirection={sortDirection}
                                onSort={onSort}
                            >
                                <span className="hidden sm:inline">Source</span>
                                <span className="sm:hidden">Src</span>
                            </SortableHeader>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                Project Type
                            </th>
                            <SortableHeader
                                field="createdAt"
                                sortField={sortField}
                                sortDirection={sortDirection}
                                onSort={onSort}
                            >
                                <span className="hidden lg:inline">Date Added</span>
                                <span className="lg:hidden">Date</span>
                            </SortableHeader>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                Notes
                            </th>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                                Proposal
                            </th>
                            <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {leads.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-4 lg:px-6 py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="text-gray-400">
                                            <UserCheck className="w-12 h-12 mx-auto mb-2" />
                                        </div>
                                        <p className="text-lg font-medium">No leads found</p>
                                        <p className="text-sm">Try adjusting your filters or add your first lead to get started.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-50 h-16">
                                    <td className="px-4 lg:px-6 py-4">
                                        <ContactTooltip
                                            lead={lead}
                                            onTooltipShow={onTooltipShow}
                                            tooltipOpen={tooltipOpen}
                                        >
                                            <div className="flex flex-col justify-center h-full">
                                                <div className="font-medium text-gray-900 truncate max-w-[200px]">
                                                    {getDisplayName(lead)}
                                                </div>
                                                {lead.contactName && lead.businessName && (
                                                    <div className="text-sm text-gray-500 truncate max-w-[200px]">
                                                        {lead.contactName}
                                                    </div>
                                                )}
                                            </div>
                                        </ContactTooltip>
                                    </td>
                                    <td className="px-4 lg:px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[lead.status]}`}>
                                            {statusLabels[lead.status]}
                                        </span>
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-900">
                                        <span className="hidden sm:inline">{sourceLabels[lead.source]}</span>
                                        <span className="sm:hidden">{sourceLabels[lead.source].substring(0, 3)}</span>
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 hidden md:table-cell">
                                        {lead.projectType ? projectTypeLabels[lead.projectType] : '-'}
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-500">
                                        <div className="flex flex-col justify-center h-full">
                                            <span className="hidden sm:inline">{formatDate(lead.createdAt)}</span>
                                            <span className="sm:hidden text-xs">{formatDate(lead.createdAt)}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 hidden lg:table-cell">
                                        {lead.contactNotes ? (
                                            <NotesTooltip
                                                notes={lead.contactNotes}
                                                leadId={lead.id}
                                                onTooltipShow={onTooltipShow}
                                                tooltipOpen={tooltipOpen}
                                            >
                                                <div className="text-sm text-gray-900 max-w-[120px] truncate">
                                                    {lead.contactNotes}
                                                </div>
                                            </NotesTooltip>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 hidden xl:table-cell text-center">
                                        {lead.proposalUrl ? (
                                            <a
                                                href={lead.proposalUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center p-2 rounded-lg text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200"
                                                title="View proposal document"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 text-right">
                                        <div className="flex justify-end">
                                            <button
                                                onClick={(e) => onDropdownOpen(lead.id, e)}
                                                disabled={isDeleting || isConverting}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                title="More actions"
                                            >
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}