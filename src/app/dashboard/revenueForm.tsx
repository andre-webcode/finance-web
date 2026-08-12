"use client"

import { useState } from "react"

export const RevenueForm = () => {
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");


    return (
        <section className="mt-8">
            <h2 className="text-xl font-semibold text-center">
                Nova receita
            </h2>
            <form className=" mt-4 w-full max-w-4xl border rounded-xl p-6 shadow-sm gap-10 mx-auto">
                <div className="grid grid-cols-1 items-center justify-center sm:grid-cols-4 gap-4">
                    <input
                        id="description"
                        type="text"
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full min-w-0 flex-1 outline-none overflow-hidden text-center"
                    />

                    <input type="number"
                        id="value"
                        placeholder="2500"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full min-w-0 rounded-lg border px-2 py-2 outline-none"
                    />

                    <input
                        id="category"
                        type="text"
                        placeholder="Ex: Salário"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full min-w-0 rounded-lg border px-2 py-2 outline-none"
                    />

                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-2 w-full min-w-0 rounded-lg border px-2 py-2 outline-none "
                    />
                </div>

                <button type="submit"
                className=" bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                >
                    Adicionar receita
                </button>

            </form>
        </section>
    )
}