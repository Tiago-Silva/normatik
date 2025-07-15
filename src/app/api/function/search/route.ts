import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const sectorId = searchParams.get('sectorId');
    const status = searchParams.get('status') === 'true';

    if (sectorId) {
        try {
            const functions = await prisma.function.findMany({
                where: {
                    sectorId: parseInt(sectorId, 10),
                    status: status,
                },
            });
            return NextResponse.json(functions, { status: 200 });
        } catch (error: any) {
            console.error("Error ao buscar funções:", error.message || error);
            return NextResponse.json(
                { error: "Error ao buscar funções" },
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