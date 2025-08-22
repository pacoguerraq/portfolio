import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// POST - Convert lead to client
export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        // Check if lead exists and is not already converted
        const existingLead = await prisma.lead.findUnique({
            where: { id },
            include: { client: true }
        })

        if (!existingLead) {
            return NextResponse.json(
                { error: 'Lead not found' },
                { status: 404 }
            )
        }

        if (existingLead.client) {
            return NextResponse.json(
                { error: 'Lead is already converted to client' },
                { status: 400 }
            )
        }

        // Use transaction to ensure all operations succeed or fail together
        const result = await prisma.$transaction(async (tx) => {
            // 1. Update lead status to WON
            const updatedLead = await tx.lead.update({
                where: { id },
                data: { status: 'WON' }
            })

            // 2. Create client record
            const client = await tx.client.create({
                data: {
                    leadId: id,
                    contractSigned: false,
                    requiresFactura: false,
                }
            })

            // 3. Create empty project
            const project = await tx.project.create({
                data: {
                    clientId: client.id,
                    name: `${updatedLead.businessName || updatedLead.contactName || 'Unnamed'} Project`,
                    description: `Project ${updatedLead.businessName ? updatedLead.businessName : ''} ${updatedLead.contactName ? `for ${updatedLead.contactName}` : ''}`,
                    status: 'PLANNING',
                    currency: 'USD',
                }
            })

            // 4. Create empty brand asset for client onboarding
            const brandAsset = await tx.brandAsset.create({
                data: {
                    projectId: project.id,
                    isCompleted: false,
                }
            })

            return {
                lead: updatedLead,
                client,
                project,
                brandAsset
            }
        })

        return NextResponse.json({
            message: 'Lead successfully converted to client',
            data: result
        })

    } catch (error) {
        console.error('Error converting lead to client:', error)
        return NextResponse.json(
            { error: 'Failed to convert lead to client' },
            { status: 500 }
        )
    }
}