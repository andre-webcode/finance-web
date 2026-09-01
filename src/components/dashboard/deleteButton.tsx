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
            ? `/api/revenues/${999}`
            : `/api/expenses/${999}`;

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
            className="cursor-point"
        >
            Excluir
        </button>
    );
};