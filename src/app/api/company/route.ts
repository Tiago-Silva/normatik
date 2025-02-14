import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json(); // Convert request body to JSON

        // Validate received data
        if (!data.name || !data.cnpj || !data.doctor || !data.registrationType || !data.fantasyName || !data.cnae || !data.cep || !data.esocialGroup) {
            throw new Error("Campos obrigatórios estão faltando ou inválidos");
        }

        const company = await prisma.company.create({
            data: {
                ...data,
                businessGroup: {
                    connect: { id: data.businessGroup.id }
                }
            },
        });

        return NextResponse.json(company, { status: 201 });
    } catch (error: any) {
        console.error("Erro ao criar empresa:", error.message || error); // Log the error message
        return NextResponse.json(
            { error: "Erro ao criar empresa" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const companies = await prisma.company.findMany();
        return NextResponse.json(companies, { status: 200 });
    } catch (error: any) {
        console.error("Erro ao buscar empresas:", error.message || error); // Log the error message
        return NextResponse.json(
            { error: "Error fetching companies" },
            { status: 500 }
        );
    }
}