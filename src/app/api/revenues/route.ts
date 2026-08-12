import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json(
                { error: "Usuário não autenticado" },
                { status: 401 }
            );
        }

        const response = await fetch("http://localhost:3001/revenue", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        return NextResponse.json(data, {
            status: response.status,
        });
    } catch (error) {
        console.error("ERRO AO CRIAR RECEITA:", error);

        return NextResponse.json(
            { error: "Erro interno no servidor" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json(
                { error: "Usuário não autenticado" },
                { status: 401 }
            );
        }

        const response = await fetch("http://localhost:3001/revenue", {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        });

        const data = await response.json();

        return NextResponse.json(data, {
            status: response.status,
        });
    } catch (error) {
        console.error("ERRO AO BUSCAR RECEITAS:", error);

        return NextResponse.json(
            { error: "Erro interno no servidor" },
            { status: 500 }
        );
    }
}