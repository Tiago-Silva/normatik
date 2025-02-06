import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json(); // Converte o corpo da requisição para JSON

        const businessGroup = await prisma.businessGroup.create({
            data,
        });

        return NextResponse.json(businessGroup, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao criar grupo de negócios" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const businessGroups = await prisma.businessGroup.findMany();
        return NextResponse.json(businessGroups, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao obter grupos de negócios" },
            { status: 500 }
        );
    }
}