import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            )
        }

        // Validate file type
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'image/jpeg',
            'image/png',
            'image/jpg',
        ]

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only PDF, Word, PowerPoint, and image files (JPG, JPEG, PNG) are allowed.' },
                { status: 400 }
            )
        }

        // Validate file size (10MB limit)
        const maxSize = 10 * 1024 * 1024 // 10MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File too large. Maximum size is 10MB.' },
                { status: 400 }
            )
        }

        // Generate unique filename
        const timestamp = Date.now()
        const originalName = file.name.replace(/\s+/g, '_') // Replace spaces with underscores
        const fileName = `proposals/${timestamp}_${originalName}`

        // Upload to Vercel Blob
        const blob = await put(fileName, file, {
            access: 'public',
        })

        return NextResponse.json({
            url: blob.url,
            fileName: originalName,
            size: file.size,
        })
    } catch (error) {
        console.error('Error uploading file:', error)
        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 }
        )
    }
}