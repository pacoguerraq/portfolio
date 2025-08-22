import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { decryptPassword } from '../../../../lib/password-utils'

const prisma = new PrismaClient()

// GET - Fetch project info for client portal (with password verification)
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ projectId: string }> }
) {
    try {
        const { projectId } = await context.params
        const password = request.nextUrl.searchParams.get('password')

        if (!password) {
            return NextResponse.json(
                { error: 'Password required' },
                { status: 401 }
            )
        }

        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: {
                client: {
                    include: {
                        lead: true
                    }
                },
                brandAsset: true,
            }
        })

        if (!project || !project.brandAsset) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            )
        }

        // Verify password by decrypting the stored password and comparing
        const decryptedStoredPassword = decryptPassword(project.brandAsset.accessPassword!)
        if (password !== decryptedStoredPassword) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            )
        }

        // Return project info without sensitive data
        return NextResponse.json({
            id: project.id,
            name: project.name,
            client: {
                businessName: project.client.lead.businessName,
                contactName: project.client.lead.contactName,
            },
            brandAsset: {
                id: project.brandAsset.id,
                colorPalette: project.brandAsset.colorPalette,
                businessContentUrl: project.brandAsset.businessContentUrl,
                businessContentName: project.brandAsset.businessContentName,
                googleDriveImagesUrl: project.brandAsset.googleDriveImagesUrl,
                additionalComments: project.brandAsset.additionalComments,
                isCompleted: project.brandAsset.isCompleted,
            }
        })
    } catch (error) {
        console.error('Error fetching project for client portal:', error)
        return NextResponse.json(
            { error: 'Failed to fetch project' },
            { status: 500 }
        )
    }
}

// POST - Submit brand assets from client
export async function POST(
    request: NextRequest,
    context: { params: Promise<{ projectId: string }> }
) {
    try {
        const { projectId } = await context.params
        const data = await request.json()

        // Verify password first
        if (!data.password) {
            return NextResponse.json(
                { error: 'Password required' },
                { status: 401 }
            )
        }

        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: { brandAsset: true }
        })

        if (!project || !project.brandAsset) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            )
        }

        // Verify password
        const decryptedStoredPassword = decryptPassword(project.brandAsset.accessPassword!)
        if (data.password !== decryptedStoredPassword) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            )
        }

        // Update brand asset with client data
        const updatedBrandAsset = await prisma.brandAsset.update({
            where: { id: project.brandAsset.id },
            data: {
                colorPalette: data.colorPalette || null,
                businessContentUrl: data.businessContentUrl || null,
                businessContentName: data.businessContentName || null,
                googleDriveImagesUrl: data.googleDriveImagesUrl || null,
                additionalComments: data.additionalComments || null,
                isCompleted: true,
                submittedAt: new Date(),
            }
        })

        return NextResponse.json({
            success: true,
            message: 'Brand assets submitted successfully'
        })
    } catch (error) {
        console.error('Error submitting brand assets:', error)
        return NextResponse.json(
            { error: 'Failed to submit brand assets' },
            { status: 500 }
        )
    }
}