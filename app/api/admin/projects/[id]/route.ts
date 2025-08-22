import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Fetch single project with all related data
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        const project = await prisma.project.findUnique({
            where: { id },
            include: {
                client: {
                    include: {
                        lead: true
                    }
                },
                brandAsset: true,
            }
        })

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(project)
    } catch (error) {
        console.error('Error fetching project:', error)
        return NextResponse.json(
            { error: 'Failed to fetch project' },
            { status: 500 }
        )
    }
}

// PUT - Update project
export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const data = await request.json()
        const { id } = await context.params

        const project = await prisma.project.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description || null,
                status: data.status,
                planSelected: data.planSelected || null,
                finalAmount: data.finalAmount ? parseFloat(data.finalAmount) : null,
                currency: data.currency || 'USD',
                websiteUrl: data.websiteUrl || null,
                googleDriveUrl: data.googleDriveUrl || null,
            },
            include: {
                client: {
                    include: {
                        lead: true
                    }
                },
                brandAsset: true,
            }
        })

        return NextResponse.json(project)
    } catch (error) {
        console.error('Error updating project:', error)
        return NextResponse.json(
            { error: 'Failed to update project' },
            { status: 500 }
        )
    }
}