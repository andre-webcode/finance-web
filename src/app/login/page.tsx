
"use client"

import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useState } from "react";


const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            })

            const data = await response.json();

            if (!response.ok) {
                return;
            }
    
            router.push("/dashboard");

        } catch (error) {
            console.log('Erro:', error)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-zinc-950 via-zinc-900 to-purple-950">
            <div className="w-full max-w-sm rounded-2xl p-8 bg-zinc-900/80 border border-zinc-800 shadow-xl">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>

                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}>

                    <input type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2"
                    />

                    <input type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2"

                    />

                    <button
                        className="bg-purple-600 hover:bg-purple-700 w-full rounded-lg py-2 font-semibold text-white"
                        type="submit">
                        Entrar
                    </button>
                    <p className="mt-4 text-center">
                        Ainda não possiu uma conta? <a href="/register" className="font-semibold underline">Criar conta</a>
                    </p>
                </form>
            </div>
        </main>
    )
}

export default Login;