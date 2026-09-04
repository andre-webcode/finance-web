

import { verifyToken } from "@/libs/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboardLayout";
import { DashboardClient } from "@/components/dashboard/dashboardClient";


type Revenue = {
    id: number;
    description: string;
    value: string;
    category: string;
    date: string;
};
type Expense = {
    id: number;
    description: string;
    value: string;
    category: string;
    date: string;
};



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

    const expenseResponse = await fetch("http://localhost:3001/expense", {
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
    });

    const expenses: Expense[] = await expenseResponse.json();


    return (
        <main className="min-h-screen bg-gray-light">

            <DashboardLayout email={String(payload.email)}>

                <DashboardClient
                    revenues={revenues}
                    expenses={expenses}
                    email={String(payload.email)}
                />

                
            </DashboardLayout>

        </main>
    )
};

export default Dashboard