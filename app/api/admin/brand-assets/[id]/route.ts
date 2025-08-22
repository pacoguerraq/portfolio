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

        // If only googleDriveImagesUrl is present, update only that field
        if (
            Object.keys(data).length === 1 &&
            Object.prototype.hasOwnProperty.call(data, 'googleDriveImagesUrl')
        ) {
            const brandAsset = await prisma.brandAsset.update({
                where: { id },
                data: {
                    googleDriveImagesUrl: data.googleDriveImagesUrl || null,
                },
            })
            return NextResponse.json(brandAsset)
        }

        // Otherwise, update all fields as before
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
            },
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