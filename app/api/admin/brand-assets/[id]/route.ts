import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// PUT - Update brand asset
export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const data = await request.json()
        const { id } = await context.params

        const brandAsset = await prisma.brandAsset.update({
            where: { id },
            data: {
                colorPalette: data.colorPalette || null,
                businessContentUrl: data.businessContentUrl || null,
                businessContentName: data.businessContentName || null,
                googleDriveImagesUrl: data.googleDriveImagesUrl || null,
                additionalComments: data.additionalComments || null,
                isCompleted: data.isCompleted ?? false,
                submittedAt: data.isCompleted ? new Date() : null,
            }
        })

        return NextResponse.json(brandAsset)
    } catch (error) {
        console.error('Error updating brand asset:', error)
        return NextResponse.json(
            { error: 'Failed to update brand asset' },
            { status: 500 }
        )
    }
}