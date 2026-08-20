
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/libs/auth";

const Home = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        redirect("/login");
    }

    const payload = await verifyToken(token.value);

    if (!payload) {
        redirect("/login");
    }

    redirect("/dashboard");
};

export default Home;
