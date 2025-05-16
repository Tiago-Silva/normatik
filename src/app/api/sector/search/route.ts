import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const companyId = searchParams.get('companyId');
    const status = searchParams.get('status') === 'true';

    if (companyId) {
        try {
            const companies = await prisma.company.findMany({
                where: {
                    businessGroupId: parseInt(companyId, 10),
                    status: status,
                },
            });
            return NextResponse.json(companies, { status: 200 });
        } catch (error: any) {
            console.error("Error ao buscar setores:", error.message || error);
            return NextResponse.json(
                { error: "Error ao buscar setores" },
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