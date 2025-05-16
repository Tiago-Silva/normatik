import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, {params}: { params: { id: string } }) {
    const {id} = params;

    try {
        const sector = await prisma.sector.findUnique({
            where: {id: parseInt(id, 10)},
        });
        return NextResponse.json(sector, {status: 200});
    } catch (error: any) {
        console.error("Error fetching sector:", error.message || error);
        return NextResponse.json({error: "Error fetching sector"}, {status: 500});
    }
}

export async function PUT(req: Request, {params}: { params: { id: string } }) {
    const {id} = params;

    try {
        const data = await req.json();
        const sector = await prisma.sector.update({
            where: {id: parseInt(id, 10)},
            data,
        });
        return NextResponse.json(sector, {status: 200});
    } catch (error: any) {
        console.error("Error updating sector:", error.message || error);
        return NextResponse.json({error: "Error updating sector"}, {status: 500});
    }
}

export async function DELETE(req: Request, {params}: { params: { id: string } }) {
    const {id} = params;

    try {
        await prisma.sector.delete({
            where: {id: parseInt(id, 10)},
        });
        return NextResponse.json({message: "sector.ts deleted"}, {status: 200});
    } catch (error: any) {
        console.error("Error deleting sector:", error.message || error);
        return NextResponse.json({error: "Error deleting sector"}, {status: 500});
    }
}