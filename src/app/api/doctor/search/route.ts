import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name') || '';
    const status = searchParams.get('status') === 'true';

    try {
        const doctors = await prisma.doctor.findMany({
            where: {
                AND: [
                    {
                        name: {
                            contains: name,
                        },
                    },
                    {
                        status: status,
                    },
                ],
            },
        });
        return NextResponse.json(doctors, { status: 200 });
    } catch (error: any) {
        console.error("Erro ao buscar médicos:", error.message || error);
        return NextResponse.json(
            { error: "Erro ao buscar médicos" },
            { status: 500 }
        );
    }
}