import { useState } from 'react'
import { MoreHorizontal, Edit, Trash2, ExternalLink, FileText, CheckCircle, XCircle, FolderOpen } from 'lucide-react'

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
    project: {
        id: string
        name: string
        status: string
        planSelected: string | null
        finalAmount: number | null
        websiteUrl: string | null
        googleDriveUrl: string | null
    } | null
    brandAsset: {
        id: string
        isCompleted: boolean
        submittedAt: string | null
    } | null
}

interface ClientTableProps {
    clients: Client[]
    onEdit: (client: Client) => void
    onDelete: (client: Client) => void
    onViewProjectDetails: (client: Client) => void
    onTooltipShow: (id: string, content: any, event: React.MouseEvent) => void
    tooltipOpen: string | null
    dropdownOpen: string | null
    onDropdownOpen: (clientId: string, event: React.MouseEvent<HTMLButtonElement>) => void
    isDeleting: boolean
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

const ContactTooltip = ({
    client,
    children,
    onTooltipShow,
    tooltipOpen
}: {
    client: Client
    children: React.ReactNode
    onTooltipShow: (id: string, content: any, event: React.MouseEvent) => void
    tooltipOpen: string | null
}) => {
    const contactContent = {
        contactName: client.lead.contactName,
        businessName: client.lead.businessName,
        email: client.lead.email,
        phone: client.lead.phone
    }

    const isActive = tooltipOpen === `contact-${client.id}`

    return (
        <div
            onClick={(e) => onTooltipShow(`contact-${client.id}`, contactContent, e)}
            className={`cursor-pointer transition-all duration-200 ${isActive ? 'underline text-blue-700' : 'hover:underline'
                }`}
        >
            {children}
        </div>
    )
}

const NotesTooltip = ({
    notes,
    clientId,
    children,
    onTooltipShow,
    tooltipOpen
}: {
    notes: string
    clientId: string
    children: React.ReactNode
    onTooltipShow: (id: string, content: any, event: React.MouseEvent) => void
    tooltipOpen: string | null
}) => {
    const isActive = tooltipOpen === `notes-${clientId}`

    return (
        <div
            onClick={(e) => onTooltipShow(`notes-${clientId}`, { notes }, e)}
            className={`cursor-pointer transition-all duration-200 inline-block ${isActive ? 'underline text-blue-700' : 'hover:underline'
                }`}
        >
            {children}
        </div>
    )
}

export default function ClientTable({
    clients,
    onEdit,
    onDelete,
    onViewProjectDetails,
    onTooltipShow,
    tooltipOpen,
    dropdownOpen,
    onDropdownOpen,
    isDeleting
}: ClientTableProps) {
    const getDisplayName = (client: Client) => {
        return client.lead.businessName || client.lead.contactName || 'Unnamed Client'
    }

    const formatCurrency = (amount: number | null | undefined) => {
        if (!amount) return '-'
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Client / Business
                            </th>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                Contract
                            </th>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                Factura Required
                            </th>
                            {/* Project columns with darker background */}
                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-200">
                                Project Status
                            </th>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell bg-gray-200">
                                Brand Assets
                            </th>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell bg-gray-200">
                                Website
                            </th>
                            <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {clients.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-4 lg:px-6 py-8 text-center text-gray-500">
                                    No clients found. Convert some leads to get started.
                                </td>
                            </tr>
                        ) : (
                            clients.map((client) => (
                                <tr key={client.id} className="hover:bg-gray-50">
                                    <td className="px-4 lg:px-6 py-4">
                                        <ContactTooltip
                                            client={client}
                                            onTooltipShow={onTooltipShow}
                                            tooltipOpen={tooltipOpen}
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    {getDisplayName(client)}
                                                </div>
                                                {client.lead.contactName && client.lead.businessName && (
                                                    <div className="text-sm text-gray-500">
                                                        {client.lead.contactName}
                                                    </div>
                                                )}
                                                {/* Mobile: Show additional info */}
                                                <div className="sm:hidden mt-1 space-y-1">
                                                    <div className="text-xs text-gray-500">
                                                        Contract: {client.contractSigned ? '✓ Signed' : '✗ Pending'}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        Factura: {client.requiresFactura ? 'Required' : 'Not Required'}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        Assets: {client.brandAsset?.isCompleted ? '✓ Complete' : '✗ Pending'}
                                                    </div>
                                                </div>
                                            </div>
                                        </ContactTooltip>
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 hidden sm:table-cell">
                                        <div className="flex items-center space-x-2">
                                            {client.contractSigned ? (
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-red-600" />
                                            )}
                                            <span className={`text-sm ${client.contractSigned ? 'text-green-600' : 'text-red-600'}`}>
                                                {client.contractSigned ? 'Signed' : 'Pending'}
                                            </span>
                                            {client.contractUrl && (
                                                <a
                                                    href={client.contractUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center p-1 rounded text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200"
                                                    title="View contract"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                                        <div className="flex items-center space-x-2">
                                            <span className={`text-sm ${client.requiresFactura ? 'text-blue-600' : 'text-gray-600'}`}>
                                                {client.requiresFactura ? 'Required' : 'Not Required'}
                                            </span>
                                            {client.constanciaSituacionFiscalUrl && (
                                                <a
                                                    href={client.constanciaSituacionFiscalUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center p-1 rounded text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200"
                                                    title="View fiscal document"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                    {/* Project columns with darker background */}
                                    <td className="px-4 lg:px-6 py-4 bg-gray-100">
                                        {client.project ? (
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[client.project.status as keyof typeof statusColors]}`}>
                                                {statusLabels[client.project.status as keyof typeof statusLabels]}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">No Project</span>
                                        )}
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 hidden md:table-cell bg-gray-100">
                                        <div className="flex items-center space-x-2">
                                            {client.brandAsset?.isCompleted ? (
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-orange-600" />
                                            )}
                                            <span className={`text-sm ${client.brandAsset?.isCompleted ? 'text-green-600' : 'text-orange-600'}`}>
                                                {client.brandAsset?.isCompleted ? 'Complete' : 'Pending'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 hidden lg:table-cell text-center bg-gray-100">
                                        {client.project?.websiteUrl ? (
                                            <a
                                                href={client.project.websiteUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center p-2 rounded-lg text-blue-600 hover:text-blue-800 hover:bg-blue-100 transition-all duration-200"
                                                title="Visit website"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 text-right">
                                        <button
                                            onClick={(e) => onDropdownOpen(client.id, e)}
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