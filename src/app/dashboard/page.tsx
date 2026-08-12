import { verifyToken } from "@/libs/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogoutButton } from "./logoutButton";
import { TransactionsItem } from "./transactionItem";
import { RevenueForm } from "./revenueForm";

type Revenue = {
    id: number;
    description: string;
    value: string;
    category: string;
    date: string;
};


const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
}

const Dashboard = async () => {

    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        redirect("/login");
    }

    const payload = await verifyToken(token.value);
    if (!payload) {
        redirect("/login");
    }

    const response = await fetch("http://localhost:3001/revenues", {
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
    });

    const revenues: Revenue[] = await response.json();

    console.log(revenues);



    return (
        <main className="min-h-screen bg-gray-400">
            <div className="mx-auto max-w-6xl px-4 border border-red-400">
                <header className="flex items-center justify-between py-6">
                    <h1 className="text-2xl font-bold">Finance</h1>

                    <div className="flex items-center gap-4">
                        <span>{String(payload.email)}</span>

                        <LogoutButton />
                    </div>
                </header>

                <section className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-6 ">
                        <p className="text-sm text-gray-500">
                            Saldo atual
                        </p>
                        <strong className="mt-2 block text-3xl font-bold text-blue-600">
                            R$ 0,00
                        </strong>
                        <p className="text-sm text-gray-500">
                            Suas finanças em um só lugar
                        </p>
                    </div>

                    <div className="rounded-lg border p-6">
                        <p className="text-sm text-gray-500">
                            Receitas
                        </p>
                        <strong className="mt-2 block text-2xl font-bold text-green-600">
                            R$ 0,00
                        </strong>
                    </div>

                    <div className="rounded-lg border p-6">
                        <p className="text-sm text-gray-500">
                            Despesas
                        </p>
                        <strong className="mt-2 block text-2xl font-bold text-red-500">
                            R$ 0,00
                        </strong>
                    </div>
                </section>

                <RevenueForm />

                <section className="w-full mt-8 mb-10">
                    <h2 className="text-xl font-semibold text-center">
                        Ultimas movimentações
                    </h2>

                    <div className="mt-4 rounded-xl border p-6 mx-auto">
                        {revenues.map((revenue) => (
                            <TransactionsItem
                                key={revenue.id}
                                description={revenue.description}
                                date={formatDate(revenue.date)}
                                value={`+ R$ ${revenue.value}`}
                            />
                        ))}
                    </div>

                </section>

            </div>
        </main>
    )
};

export default Dashboard