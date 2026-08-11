"use client"

import { useRouter } from "next/navigation"

export const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/logout", {
            method: "POST",
        });
        router.push("/login");
    }


    return (
        <button className="p-2 px-3 text-white font-bold bg-red-500 rounded-md hover:bg-red-700" onClick={handleLogout}>
            Sair
        </button>
    )
}