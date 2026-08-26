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

    const response = await fetch(`http://localhost:3001/expense/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
    });

    const data = await response.json();

    console.log("RESPOSTA DO BACKEND:", data);
    return NextResponse.json(data, {
        status: response.status,
    });
}