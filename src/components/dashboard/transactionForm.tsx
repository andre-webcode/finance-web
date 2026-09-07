"use client"

import { SelectedTransaction } from "@/types/finance";
import { useState } from "react";

type Props = {
    onCreated: (transaction: SelectedTransaction) => void;
}

export const TransactionForm = ({ onCreated }: Props) => {
    const [type, setType] = useState<"revenue" | "expense">("revenue");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formattedDate = new Date(`${date}T00:00:00`).toISOString();

        const endpoint =
            type === "revenue"
                ? "/api/revenues"
                : "/api/expenses";

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description,
                value,
                category,
                date: formattedDate,
            }),
        })

        const data = await response.json();

        if (!response.ok) {
            return;
        }

        const createdTransaction: SelectedTransaction = {
            ...data,
            type,
        }

        onCreated(createdTransaction);

        setDescription("");
        setValue("");
        setCategory("");
        setDate("");

    };


    return (
        <section>
            <h2 className="text-xl font-semibold text-gray-text">
                {type === "revenue" ? "Nova receita" : "Nova despesa"}
            </h2>

            <form
                onSubmit={handleSubmit}
                className="mt-4 flex w-full flex-col items-center rounded-xl border border-gray-light bg-white p-6 shadow-sm md:p-4"
            >

                <div className="mb-4 flex w-full flex-col items-end">
                    <label
                        htmlFor="type"
                        className="mb-2 text-sm  font-medium text-gray-text"
                    >
                        Tipo
                    </label>

                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value as "revenue" | "expense")}
                        className="w-32 rounded-lg border border-gray-light bg-white px-2 py-2 text-gray-text outline-none "
                    >
                        <option value="revenue">Receita</option>
                        <option value="expense">Despesa</option>
                    </select>
                </div>
                <div className="w-full flex flex-col gap-3 lg:flex-row lg:items-end">
                    <div className="w-full flex flex-col items-center gap-3 sm:flex-row lg:items-end">

                        <div className="w-full flex flex-col sm:flex-1">
                            <label
                                htmlFor="description"
                                className="mb-2 block text-sm font-medium text-gray-text"
                            >
                                Descrição
                            </label>

                            <input
                                id="description"
                                type="text"
                                placeholder="Descrição"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full outline-none border border-gray-light bg-white px-2 py-2 rounded-lg "
                            />
                        </div>

                        <div className="flex w-full flex-col sm:w-20">
                            <label
                                htmlFor="value"
                                className="mb-2 block text-sm font-medium text-gray-text"
                            >
                                Valor
                            </label>

                            <input
                                type="number"
                                id="value"
                                placeholder="100"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="w-full rounded-lg border border-gray-light bg-white px-2 py-2 outline-none "
                            />
                        </div>

                        <div className="flex w-full flex-col sm:w-30">
                            <label
                                htmlFor="category"
                                className="mb-2 block text-sm font-medium text-gray-text"
                            >
                                Categoria
                            </label>

                            <input
                                id="category"
                                type="text"
                                placeholder="Ex: Mercado"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full rounded-lg border border-gray-light bg-white px-2 py-2 outline-none "
                            />
                        </div>

                        <div className="flex w-full flex-col sm:w-36">
                            <label
                                htmlFor="date"
                                className="mb-2 block text-sm font-medium text-gray-text"
                            >
                                Data
                            </label>

                            <input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full rounded-lg border border-gray-light bg-white text-gray-text px-2 py-2 outline-none"
                            />
                        </div>

                    </div>
                    <div className="flex w-full mt-4 justify-center lg:w-auto">
                        <button
                            type="submit"
                            className="bg-orange-primary hover:bg-orange-dark p-2 px-4 rounded-md font-semibold text-white md:m-0 md:ml-3"
                        >
                            Adicionar
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}