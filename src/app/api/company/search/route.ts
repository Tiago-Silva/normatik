import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const businessGroupId = searchParams.get('businessGroupId');
    const status = searchParams.get('status') === 'true';

    if (businessGroupId) {
        try {
            const companies = await prisma.company.findMany({
                where: {
                    businessGroupId: parseInt(businessGroupId, 10),
                    status: status,
                },
            });
            return NextResponse.json(companies, { status: 200 });
        } catch (error: any) {
            console.error("Erro ao buscar empresas:", error.message || error);
            return NextResponse.json(
                { error: "Erro ao buscar empresas" },
                { status: 500 }
            );
        }
    } else {
        return NextResponse.json(
            { error: "Parâmetros de consulta inválidos" },
            { status: 400 }
        );
    }
}