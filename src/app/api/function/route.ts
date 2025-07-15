import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json(); // Convert request body to JSON

        const func = await prisma.function.create({
            data,
        });

        return NextResponse.json(func, {status: 201});
    } catch (error: any) {
        console.error("Erro ao criar function:", error.message || error); // Log the error message
        return NextResponse.json(
            {error: "Erro ao criar function"},
            {status: 500}
        );
    }
}

export async function GET() {
    try {
        const sectors = await prisma.sector.findMany();
        return NextResponse.json(sectors, {status: 200});
    } catch (error: any) {
        console.error("Erro ao buscar functions:", error.message || error); // Log the error message
        return NextResponse.json(
            {error: "Erro ao buscar functions"},
            {status: 500}
        );
    }
}