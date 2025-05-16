import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json(); // Convert request body to JSON

        // Validate received data
        // if (!data.name || !data.cpf || !data.CRM) {
        //     throw new Error("Campos obrigatórios estão faltando ou inválidos");
        // }

        const sector = await prisma.sector.create({
            data,
        });

        return NextResponse.json(sector, {status: 201});
    } catch (error: any) {
        console.error("Erro ao criar setor:", error.message || error); // Log the error message
        return NextResponse.json(
            {error: "Erro ao criar setor"},
            {status: 500}
        );
    }
}

export async function GET() {
    try {
        const sectors = await prisma.sector.findMany();
        return NextResponse.json(sectors, {status: 200});
    } catch (error: any) {
        console.error("Erro ao buscar setores:", error.message || error); // Log the error message
        return NextResponse.json(
            {error: "Erro ao buscar setores"},
            {status: 500}
        );
    }
}