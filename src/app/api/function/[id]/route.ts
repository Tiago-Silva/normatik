import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, {params}: { params: { id: string } }) {
    const {id} = params;

    try {
        const func = await prisma.function.findUnique({
            where: {id: parseInt(id, 10)},
        });
        return NextResponse.json(func, {status: 200});
    } catch (error: any) {
        console.error("Error fetching function:", error.message || error);
        return NextResponse.json({error: "Error fetching function"}, {status: 500});
    }
}

export async function PUT(req: Request, {params}: { params: { id: string } }) {
    const {id} = params;

    try {
        const data = await req.json();
        const func = await prisma.function.update({
            where: {id: parseInt(id, 10)},
            data,
        });
        return NextResponse.json(func, {status: 200});
    } catch (error: any) {
        console.error("Error updating function:", error.message || error);
        return NextResponse.json({error: "Error updating function"}, {status: 500});
    }
}

export async function DELETE(req: Request, {params}: { params: { id: string } }) {
    const {id} = params;

    try {
        await prisma.function.delete({
            where: {id: parseInt(id, 10)},
        });
        return NextResponse.json({message: "function.ts deleted"}, {status: 200});
    } catch (error: any) {
        console.error("Error deleting function:", error.message || error);
        return NextResponse.json({error: "Error deleting function"}, {status: 500});
    }
}