import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch a company by ID (GET)
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        console.log(id);

        const company = await prisma.company.findUnique({
            where: { id },
        });

        if (!company) {
            return NextResponse.json({ error: 'Company not found' }, { status: 404 });
        }

        return NextResponse.json(company, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error fetching company' }, { status: 500 });
    }
}

// Update a company (PUT)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        const data = await req.json();

        const updatedCompany = await prisma.company.update({
            where: { id },
            data,
        });

        return NextResponse.json(updatedCompany, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating company' }, { status: 500 });
    }
}

// Delete a company (DELETE)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);

        await prisma.company.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Company successfully deleted' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting company' }, { status: 500 });
    }
}