import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// PUT - Update lead
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const data = await request.json()
        const { id } = params

        // Validate required fields
        if (!data.source) {
            return NextResponse.json(
                { error: 'Source is required' },
                { status: 400 }
            )
        }

        const lead = await prisma.lead.update({
            where: { id },
            data: {
                contactName: data.contactName || null,
                email: data.email || null,
                phone: data.phone || null,
                businessName: data.businessName || null,
                status: data.status,
                source: data.source,
                projectType: data.projectType,
                contactNotes: data.contactNotes || null,
                proposalUrl: data.proposalUrl || null,
            }
        })

        return NextResponse.json(lead)
    } catch (error) {
        console.error('Error updating lead:', error)
        return NextResponse.json(
            { error: 'Failed to update lead' },
            { status: 500 }
        )
    }
}

// DELETE - Delete lead
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params

        await prisma.lead.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting lead:', error)
        return NextResponse.json(
            { error: 'Failed to delete lead' },
            { status: 500 }
        )
    }
}