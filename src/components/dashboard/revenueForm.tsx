"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"
import { Revenue } from "@/types/finance";

type Props = {
    onRevenueCreated: (revenue: Revenue) => void;
};

export const RevenueForm = ({ onRevenueCreated }: Props) => {
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!date) {
            alert("informe a data");
            return;
        }


        try {
            const formattedDate = new Date(`${date}T00:00:00`);



            const res = await fetch("/api/revenues", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({
                    description,
                    value,
                    category,
                    date: formattedDate,
                })
            })

            const data = await res.json();
            console.log("status:", res.status);
            console.log("resposta:", data);

            if (!res.ok) {
                return;
            }

            onRevenueCreated(data);

            setDescription("");
            setValue("");
            setCategory("");
            setDate("");

        } catch (error) {
            console.error("Erro ao criar receita:", error);
        }
    }


    return (
        <section className="mt-8">
            <h2 className="text-xl font-semibold text-center text-gray-text">
                Nova receita
            </h2>
            <form
                onSubmit={handleSubmit}
                className="mt-4 flex w-full flex-col items-center  rounded-xl border border-gray-light bg-white p-6 shadow-sm lg:flex-row md:p-4">

                <div className="w-full flex flex-col items-center gap-3 sm:flex-row ">

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
                            className="w-full outline-none border border-gray-light bg-white px-2 py-2 rounded-lg transition focus:border-orange-primary focus:ring-2 focus:ring-orange-primary/20"
                        />
                    </div>

                    <div className="flex w-full flex-col sm:w-28 md:w-32 lg:w-36">
                        <label
                            htmlFor="value"
                            className="mb-2 block text-sm font-medium text-gray-text"
                        >
                            Valor
                        </label>
                        <input type="number"
                            id="value"
                            placeholder="2500"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full rounded-lg border border-gray-light bg-white px-2 py-2 outline-none transition focus:border-orange-primary focus:ring-2 focus:ring-orange-primary/20"
                        />
                    </div>

                    <div className="flex w-full flex-col sm:w-24 md:w-28 lg:w-40">
                        <label
                            htmlFor="category"
                            className="mb-2 block text-sm font-medium text-gray-text"
                        >
                            Categoria
                        </label>
                        <input
                            id="category"
                            type="text"
                            placeholder="Ex: Salário"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-lg border  border-gray-light bg-white px-2 py-2 outline-none transition focus:border-orange-primary focus:ring-2 focus:ring-orange-primary/20"
                        />
                    </div>

                    <div className="flex w-full flex-col sm:w-36 md:w-40 lg:w-44">
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
                            className="w-full rounded-lg border border-gray-light bg-white px-2 py-2 text-gray-text outline-none transition  focus:border-orange-primary focus:ring-2 focus:ring-orange-primary/20"
                        />
                    </div>

                </div>

                <div className="flex w-full justify-center lg:w-auto md:mt-4 md:self-end">
                    <button type="submit" className="bg-orange-primary hover:bg-orange-dark p-2 px-4 rounded-md mt-4 font-semibold text-white md:m-0 md:ml-3">
                        Adicionar
                    </button>
                </div>
            </form>
        </section>
    )
}