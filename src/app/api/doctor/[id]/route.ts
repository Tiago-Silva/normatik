// src/app/api/doctor/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const doctor = await prisma.doctor.findUnique({
            where: { id: parseInt(id, 10) },
        });
        return NextResponse.json(doctor, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching doctor:", error.message || error);
        return NextResponse.json({ error: "Error fetching doctor" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const data = await req.json();
        const doctor = await prisma.doctor.update({
            where: { id: parseInt(id, 10) },
            data,
        });
        return NextResponse.json(doctor, { status: 200 });
    } catch (error: any) {
        console.error("Error updating doctor:", error.message || error);
        return NextResponse.json({ error: "Error updating doctor" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await prisma.doctor.delete({
            where: { id: parseInt(id, 10) },
        });
        return NextResponse.json({ message: "Doctor.ts deleted" }, { status: 200 });
    } catch (error: any) {
        console.error("Error deleting doctor:", error.message || error);
        return NextResponse.json({ error: "Error deleting doctor" }, { status: 500 });
    }
}