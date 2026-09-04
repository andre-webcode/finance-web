import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        return NextResponse.json(
            { error: "Usuário não autenticado" },
            { status: 401 }
        );
    }

    const response = await fetch(`http://localhost:3001/revenue/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
    });

    const data = await response.json();

    return NextResponse.json(data, {
        status: response.status,
    });
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const body = await request.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        return NextResponse.json(
            { error: "Usuário não autenticado" },
            { status: 401 }
        );
    }

    const response = await fetch(`http://localhost:3001/revenue/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(body),

    });

    const data = await response.json();

    return NextResponse.json(data, {
        status: response.status,
    })
}