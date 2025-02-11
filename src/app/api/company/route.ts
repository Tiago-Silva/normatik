import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json(); // Convert the request body to JSON

        const company = await prisma.company.create({
            data,
        });

        return NextResponse.json(company, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error creating company" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const companies = await prisma.company.findMany();
        return NextResponse.json(companies, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching companies" },
            { status: 500 }
        );
    }
}