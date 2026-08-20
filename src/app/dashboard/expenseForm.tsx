"use client"

import { useState } from "react"

export const ExpenseForm = () => {
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!date) {
            console.log("Selecione uma data");
            return;
        }

        try {
            const formattedDate = new Date(`${date}T00:00:00`).toISOString();

            const res = await fetch("/api/expenses", {
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
            });

            const data = await res.json();

            console.log("status:", res.status);
            console.log("resposta:", data);

        } catch (error) {
            console.error("Erro ao criar despesa:", error);
        }
    };

    return (
        <section className="mt-8">
            <h2 className="text-xl font-semibold text-center text-zinc-100">
                Nova despesa
            </h2>

            <form
                onSubmit={handleSubmit}
                className="mt-4 flex w-full flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm md:flex-row md:p-4"
            >
                <div className="w-full flex flex-col items-center gap-3 sm:flex-row">
                    <input
                        id="description"
                        type="text"
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full outline-none border px-2 py-2 rounded-lg overflow-hidden sm:flex-1"
                    />

                    <input
                        type="number"
                        id="value"
                        placeholder="100"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full rounded-lg border px-2 py-2 outline-none sm:w-28 md:w-36"
                    />

                    <input
                        id="category"
                        type="text"
                        placeholder="Ex: Mercado"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-lg border px-2 py-2 outline-none sm:w-28 md:w-36"
                    />

                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-lg border px-2 py-2 outline-none sm:w-28 md:w-36"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 p-2 px-4 rounded-md mt-4 font-semibold text-white md:m-0 md:ml-3"
                    >
                        Adicionar
                    </button>
                </div>
            </form>
        </section>
    );
};