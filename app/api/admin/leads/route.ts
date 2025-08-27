// app/api/admin/leads/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Fetch all leads
export async function GET() {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(leads)
    } catch (error) {
        console.error('Error fetching leads:', error)
        return NextResponse.json(
            { error: 'Failed to fetch leads' },
            { status: 500 }
        )
    }
}

// POST - Create new lead
export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        // Validate required fields
        if (!data.source) {
            return NextResponse.json(
                { error: 'Source is required' },
                { status: 400 }
            )
        }

        const lead = await prisma.lead.create({
            data: {
                contactName: data.contactName || null,
                email: data.email || null,
                phone: data.phone || null,
                businessName: data.businessName || null,
                status: data.status || 'FOUND',
                source: data.source,
                projectType: data.projectType || 'STATIC_WEBSITE',
                contactNotes: data.contactNotes || null,
                proposalUrl: data.proposalUrl || null,
            }
        })

        return NextResponse.json(lead, { status: 201 })
    } catch (error) {
        console.error('Error creating lead:', error)
        return NextResponse.json(
            { error: 'Failed to create lead' },
            { status: 500 }
        )
    }
}