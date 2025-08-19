import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
    try {
        const cookieStore = await cookies()

        // Clear the authentication cookie
        cookieStore.delete('admin-authenticated')

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json(
            { error: 'Logout failed' },
            { status: 500 }
        )
    }
}