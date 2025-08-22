import { useState } from 'react'
import { MoreHorizontal, Edit, Trash2, ExternalLink } from 'lucide-react'

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

interface LeadTableProps {
    leads: Lead[]
    onEdit: (lead: Lead) => void
    onDelete: (lead: Lead) => void
    onTooltipShow: (id: string, content: any, event: React.MouseEvent) => void
    tooltipOpen: string | null
    dropdownOpen: string | null
    onDropdownOpen: (leadId: string, event: React.MouseEvent<HTMLButtonElement>) => void
    isDeleting: boolean
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

export default function LeadTable({
    leads,
    onEdit,
    onDelete,
    onTooltipShow,
    tooltipOpen,
    dropdownOpen,
    onDropdownOpen,
    isDeleting
}: LeadTableProps) {
    const getDisplayName = (lead: Lead) => {
        return lead.businessName || lead.contactName || 'Unnamed Lead'
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contact / Business
                            </th>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                Source
                            </th>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                Project Type
                            </th>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                Notes
                            </th>
                            <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                Proposal
                            </th>
                            <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {leads.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-4 lg:px-6 py-8 text-center text-gray-500">
                                    No leads found. Add your first lead to get started.
                                </td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-50">
                                    <td className="px-4 lg:px-6 py-4">
                                        <ContactTooltip
                                            lead={lead}
                                            onTooltipShow={onTooltipShow}
                                            tooltipOpen={tooltipOpen}
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    {getDisplayName(lead)}
                                                </div>
                                                {lead.contactName && lead.businessName && (
                                                    <div className="text-sm text-gray-500">
                                                        {lead.contactName}
                                                    </div>
                                                )}
                                                {/* Mobile: Show additional info */}
                                                <div className="sm:hidden mt-1 space-y-1">
                                                    <div className="text-xs text-gray-500">
                                                        {sourceLabels[lead.source]}
                                                    </div>
                                                    {lead.projectType && (
                                                        <div className="text-xs text-gray-500">
                                                            {projectTypeLabels[lead.projectType]}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </ContactTooltip>
                                    </td>
                                    <td className="px-4 lg:px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[lead.status]}`}>
                                            {statusLabels[lead.status]}
                                        </span>
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 hidden sm:table-cell">
                                        {sourceLabels[lead.source]}
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 hidden md:table-cell">
                                        {lead.projectType ? projectTypeLabels[lead.projectType] : '-'}
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 hidden lg:table-cell">
                                        {lead.contactNotes ? (
                                            <NotesTooltip
                                                notes={lead.contactNotes}
                                                leadId={lead.id}
                                                onTooltipShow={onTooltipShow}
                                                tooltipOpen={tooltipOpen}
                                            >
                                                <div className="text-sm text-gray-900 max-w-xs truncate">
                                                    {lead.contactNotes}
                                                </div>
                                            </NotesTooltip>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 hidden lg:table-cell text-center">
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
                                    <td className="px-4 lg:px-6 py-4 text-center">
                                        <button
                                            onClick={(e) => onDropdownOpen(lead.id, e)}
                                            disabled={isDeleting}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
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