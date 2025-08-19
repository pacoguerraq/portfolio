import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json()

        // Check against environment variable
        const adminPassword = process.env.ADMIN_PASSWORD

        if (!adminPassword) {
            console.error('ADMIN_PASSWORD environment variable is not set')
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            )
        }

        if (password === adminPassword) {
            // Set authentication cookie (expires in 24 hours)
            const cookieStore = await cookies()
            cookieStore.set('admin-authenticated', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/'
            })

            return NextResponse.json({ success: true })
        } else {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            )
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        )
    }
}