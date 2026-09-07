import { verifyToken } from "@/libs/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Expense = {
    id: number;
    description: string;
    value: string;
    category: string;
    date: string;
};

const Expenses = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        redirect("/login");
    }

    const payload = await verifyToken(token.value);

    if (!payload) {
        redirect("/login");
    }

    const response = await fetch("http://localhost:3001/expense", {
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
    });

    const expenses: Expense[] = await response.json();

    const totalExpense = expenses.reduce(
        (total, expense) => total + Number(expense.value),
        0
    );

    return (
        <main className="min-h-screen bg-gray-light">
            <div className="mx-auto max-w-6xl px-4 py-6">
                <h1 className="text-2xl font-bold text-orange-primary">
                    Minhas Despesas
                </h1>

                <section className="mt-6 rounded-xl border border-gray-light bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Total de despesas
                    </p>

                    <strong className="mt-2 block text-3xl font-bold text-red-600">
                        {totalExpense.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </strong>
                </section>

                <section className="mt-6 rounded-xl border border-gray-light bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-text">
                        Todas as despesas
                    </h2>

                    <div className="mt-4">
                        {expenses.map((expense) => (
                            <div
                                key={expense.id}
                                className="mt-3 rounded-lg border border-gray-light bg-gray-light/30 px-4 py-3"
                            >
                                <p className="font-semibold text-gray-text">
                                    {expense.description}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {expense.category}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {new Date(expense.date).toLocaleDateString("pt-BR")}
                                </p>

                                <strong className="text-red-600">
                                    {Number(expense.value).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </strong>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Expenses;