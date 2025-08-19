import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    // Only apply to admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Check if user is authenticated
        const isAuthenticated = request.cookies.get('admin-authenticated')

        // If not authenticated, redirect to login
        if (!isAuthenticated) {
            const loginUrl = new URL('/login', request.url)
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*']
}