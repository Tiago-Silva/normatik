import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, {params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    try {
        const func = await prisma.function.findUnique({
            where: {id: parseInt(id, 10)},
        });
        return NextResponse.json(func, {status: 200});
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error("Error fetching function:", errorMessage);
        return NextResponse.json({error: "Error fetching function"}, {status: 500});
    }
}

export async function PUT(req: Request, {params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    try {
        const data = await req.json();

        const func = await prisma.function.update({
            where: {id: parseInt(id, 10)},
            data,
        });

        return NextResponse.json(func, {status: 200});
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error("Error updating function:", errorMessage);
        return NextResponse.json({error: "Error updating function"}, {status: 500});
    }
}

export async function DELETE(req: Request, {params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    try {
        await prisma.function.delete({
            where: {id: parseInt(id, 10)},
        });
        return NextResponse.json({message: "function deleted"}, {status: 200});
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error("Error deleting function:", errorMessage);
        return NextResponse.json({error: "Error deleting function"}, {status: 500});
    }
}