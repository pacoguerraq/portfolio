import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Fetch all clients with their related data
export async function GET() {
    try {
        const clients = await prisma.client.findMany({
            include: {
                lead: true, // Include original lead data
                project: true, // Include project data
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        // Manually fetch brand assets for each client through their projects
        const clientsWithBrandAssets = await Promise.all(
            clients.map(async (client) => {
                let brandAsset = null
                if (client.project) {
                    brandAsset = await prisma.brandAsset.findUnique({
                        where: { projectId: client.project.id }
                    })
                }
                return {
                    ...client,
                    brandAsset
                }
            })
        )

        return NextResponse.json(clientsWithBrandAssets)
    } catch (error) {
        console.error('Error fetching clients:', error)
        return NextResponse.json(
            { error: 'Failed to fetch clients' },
            { status: 500 }
        )
    }
}