

import { NextResponse } from "next/server";
    import { PrismaClient } from "@prisma/client";

    const prisma = new PrismaClient();

    export async function POST(req: Request) {
        try {
            const data = await req.json(); // Convert request body to JSON

            // Validate received data
            if (!data.name || !data.cpf || !data.CRM) {
                throw new Error("Campos obrigatórios estão faltando ou inválidos");
            }

            const doctor = await prisma.doctor.create({
                data,
            });

            return NextResponse.json(doctor, { status: 201 });
        } catch (error: any) {
            console.error("Erro ao criar médico:", error.message || error); // Log the error message
            return NextResponse.json(
                { error: "Erro ao criar médico" },
                { status: 500 }
            );
        }
    }

    export async function GET() {
        try {
            const doctors = await prisma.doctor.findMany();
            return NextResponse.json(doctors, { status: 200 });
        } catch (error: any) {
            console.error("Erro ao buscar médicos:", error.message || error); // Log the error message
            return NextResponse.json(
                { error: "Erro ao buscar médicos" },
                { status: 500 }
            );
        }
    }