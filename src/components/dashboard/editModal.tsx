"use client"

import { SelectedTransaction } from "@/types/finance";
import { useEffect, useState } from "react";


type Props = {
    onClose: () => void;
    transaction: SelectedTransaction | null;
}
export const EditModal = ({ onClose, transaction }: Props) => {

    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        if (transaction) {
            setDescription(transaction.description);
            setValue(transaction.value);
            setCategory(transaction.category);
            setDate(transaction.date);
        }
    }, [transaction])


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
            <div className="relative w-full max-w-md rounded-lg bg-white p-5">
                <button className="absolute -top-3 -right-3 cursor-pointer font-bold " onClick={onClose}>
                    X
                </button>
                <h2 className="text-xl font-bold">
                    Editar movimentação
                </h2>

                <div className="flex flex-col gap-4">
                    <div className="">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700">
                            Descrição
                        </label>

                        <input
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none text-gray-900"
                        />
                    </div>

                    <div>
                        <label htmlFor="value" className="text-sm font-medium text-gray-700">
                            Valor
                        </label>

                        <input
                            id="value"
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none text-gray-900"
                        />
                    </div>

                    <div className="">
                        <label htmlFor="category" className="text-sm font-medium text-gray-700">
                            Categoria
                        </label>

                        <input
                            id="category"
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none text-gray-900"
                        />
                    </div>

                    <div className="">
                        <label htmlFor="date" className="text-sm font-medium text-gray-700">
                            Data
                        </label>

                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none text-gray-900"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}