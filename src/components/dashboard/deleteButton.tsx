"use client"

type Props = {
    id: number;
    type: "revenue" | "expense";
    onDeleted: (id: number, type: "revenue" | "expense") => void;
};

export const DeleteButton = ({ id, type, onDeleted }: Props) => {

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