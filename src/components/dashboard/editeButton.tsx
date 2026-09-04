"use client"

import { SelectedTransaction } from "@/types/finance";

type Props = {
    id: number;
    type: "revenue" | "expense";
    onEdit: (transaction: SelectedTransaction) => void;
    transaction: SelectedTransaction
};

export const EditeButton = ({ id, type, onEdit, transaction }: Props) => {

    const handleEdit = () => {
        onEdit(transaction);

    }
    return (
        <button onClick={handleEdit} className="cursor-pointer px-3 py-1 rounded-md border border-orange-primary text-orange-primary transition hover:text-orange-dark">
            Editar
        </button>
    )
}