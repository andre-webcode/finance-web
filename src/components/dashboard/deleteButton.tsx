"use client"

type Props = {
    id: number;
    type: "revenue" | "expense";
};

export const DeleteButton = ({ id, type }: Props) => {

    const handleDelete = async () => {

        const endpoint = type === "revenue"
            ? `/api/revenues/${id}`
            : `/api/expenses/${id}`;

        const response = await fetch(endpoint, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.log("Erro ao excluir");
            return;
        }

        console.log("STATUS DELETE:", response.status);
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