import { verifyToken } from "@/libs/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


type Revenue = {
    id: number;
    description: string;
    value: string;
    category: string;
    date: string;
};

const Revenues = async () => {
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

    const totalRevenue = revenues.reduce(
        (total, revenue) => total + Number(revenue.value), 0
    )

    return (
        <main className="min-h-screen bg-gray-light">
            <div className="mx-auto max-w-6xl px-4 py-6">
                <h1 className="text-2xl font-bold text-orange-primary">
                    Minhas Receitas
                </h1>

                <section className="mt-6 rounded-xl border border-gray-light bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Total de receitas
                    </p>

                    <strong className="mt-2 block text-3xl font-bold text-green-600">
                        {totalRevenue.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </strong>
                </section>

                <section className="mt-6 rounded-xl border border-gray-light bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-text">
                        Todas as receitas
                    </h2>

                    <div className="mt-4">
                        {revenues.map((revenue) => (
                            <div key={revenue.id}
                                className="mt-3 rounded-lg border border-gray-light bg-gray-light/30 px-4 py-3"
                            >

                                <p className="font-semibold text-gray-text">
                                    {revenue.description}
                                </p>
                                <p className="font-semibold text-gray-text">
                                    {revenue.category}
                                </p>
                                <p className="font-semibold text-gray-text">
                                    {new Date(revenue.date).toLocaleDateString("pt-BR")}
                                </p>
                                <p className="text-green-600">
                                    {Number(revenue.value).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </p>

                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Revenues;