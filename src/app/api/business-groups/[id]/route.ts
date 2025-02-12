import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Buscar um grupo empresarial por ID (GET)
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        console.log(id);

        const businessGroup = await prisma.businessGroup.findUnique({
            where: { id },
        });

        if (!businessGroup) {
            return NextResponse.json({ error: 'Grupo não encontrado' }, { status: 404 });
        }

        return NextResponse.json(businessGroup, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Erro ao buscar grupo de negócios' }, { status: 500 });
    }
}

// Atualizar um grupo empresarial (PUT)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        const data = await req.json();

        const updatedBusinessGroup = await prisma.businessGroup.update({
            where: { id },
            data,
        });

        return NextResponse.json(updatedBusinessGroup, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Erro ao atualizar grupo de negócios' }, { status: 500 });
    }
}

// Deletar um grupo empresarial (DELETE)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        
        if (!params.id) {
            return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
        }

        await prisma.businessGroup.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Grupo de negócios deletado com sucesso' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Erro ao deletar grupo de negócios' }, { status: 500 });
    }
}