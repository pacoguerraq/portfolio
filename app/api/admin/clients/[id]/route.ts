import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Fetch single client with all related data
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        const client = await prisma.client.findUnique({
            where: { id },
            include: {
                lead: true,
                project: true,
            }
        })

        if (!client) {
            return NextResponse.json(
                { error: 'Client not found' },
                { status: 404 }
            )
        }

        // Manually fetch brand asset through project
        let brandAsset = null
        if (client.project) {
            brandAsset = await prisma.brandAsset.findUnique({
                where: { projectId: client.project.id }
            })
        }

        return NextResponse.json({
            ...client,
            brandAsset
        })
    } catch (error) {
        console.error('Error fetching client:', error)
        return NextResponse.json(
            { error: 'Failed to fetch client' },
            { status: 500 }
        )
    }
}

// PUT - Update client
export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const data = await request.json()
        const { id } = await context.params

        const client = await prisma.client.update({
            where: { id },
            data: {
                contractSigned: data.contractSigned ?? false,
                contractUrl: data.contractUrl || null,
                requiresFactura: data.requiresFactura ?? false,
                constanciaSituacionFiscalUrl: data.constanciaSituacionFiscalUrl || null,
            },
            include: {
                lead: true,
                project: true,
            }
        })

        return NextResponse.json(client)
    } catch (error) {
        console.error('Error updating client:', error)
        return NextResponse.json(
            { error: 'Failed to update client' },
            { status: 500 }
        )
    }
}

// DELETE - Delete client (and related project/brand assets)
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        // Use transaction to delete client and revert lead status
        await prisma.$transaction(async (tx) => {
            // Get client with lead info
            const client = await tx.client.findUnique({
                where: { id },
                include: { lead: true }
            })

            if (!client) {
                throw new Error('Client not found')
            }

            // Delete client (cascades to project and brand assets)
            await tx.client.delete({
                where: { id }
            })

            // Revert lead status back to PROPOSAL_SENT
            await tx.lead.update({
                where: { id: client.leadId },
                data: { status: 'PROPOSAL_SENT' }
            })
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting client:', error)
        return NextResponse.json(
            { error: 'Failed to delete client' },
            { status: 500 }
        )
    }
}