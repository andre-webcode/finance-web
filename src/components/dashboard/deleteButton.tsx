"use client"

type Props = {
    id: number;
    type: "revenue" | "expense";
    onDeleted: (id: number, type: "revenue" | "expense") => void;
    onError: (message: string) => void;
};

export const DeleteButton = ({ id, type, onDeleted,onError }: Props) => {

    const handleDelete = async () => {

        const endpoint = type === "revenue"
            ? `/api/revenues/${id}`
            : `/api/expenses/${id}`;

        const response = await fetch(endpoint, {
            method: "DELETE",
        });

        if (!response.ok) {
            const error = await response.json();
            console.log("Erro ao excluir",error);

            onError("Não foi possivel excluir a movimentação.")
            return;
        }

        console.log("STATUS DELETE:", response.status);

        onDeleted(id, type);
    }

    return (
        <button
            onClick={handleDelete}
            className="cursor-pointer rounded-md border border-red-600 px-3 py-1 text-red-600 transition hover:bg-red-50 hover:text-red-700"
        >
            Excluir
        </button>
    );
};