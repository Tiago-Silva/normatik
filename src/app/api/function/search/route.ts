import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const companyId = searchParams.get('companyId');
    const status = searchParams.get('status') === 'true';
    const functionName = searchParams.get('functionName');
    const internalCode = searchParams.get('internalCode');

    if (companyId) {
        try {
            const whereConditions: Record<string, unknown> = {
                companyId: parseInt(companyId, 10),
                status: status,
            };

            if (functionName && functionName.trim() !== '') {
                whereConditions.name = {
                    contains: functionName.toLowerCase(),
                };
            }

            if (internalCode && !isNaN(parseInt(internalCode, 10)) && internalCode != '0') {
                whereConditions.code = parseInt(internalCode, 10);
            }

            const functions = await prisma.function.findMany({
                where: whereConditions,
            });

            return NextResponse.json(functions, {status: 200});
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            console.error("Error ao buscar funções:", errorMessage);
            return NextResponse.json(
                {error: "Error ao buscar funções"},
                {status: 500}
            );
        }
    } else {
        return NextResponse.json(
            {error: "Parâmetros de consulta inválidos"},
            {status: 400}
        );
    }
}