import { verifyToken } from "@/libs/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Dashboard = async () => {

    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if(!token){
        redirect("/login");
    }

    const payload = await verifyToken(token.value);
    if(!payload){
        redirect("/login");
    }

    return (
        <main>
            <h1>Dashboard</h1>
        </main>
    )
};

export default Dashboard