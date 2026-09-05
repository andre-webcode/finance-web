
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
        <main className="min-h-screen flex items-center justify-center bg-gray-light">
            <div className="w-full max-w-sm rounded-2xl p-8 bg-white border-gray-light shadow-lg">
                <h1 className="text-3xl font-bold text-center text-orange-primary mb-6">
                    Login
                </h1>

                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}>

                    <input type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-gray-light bg-white text-gray-text px-4 py-2 outline-none focus:border-orange-primary focus:ring-2 focus:ring-orange-primary/20"
                    />

                    <input type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-light bg-white text-gray-text px-4 py-2 outline-none focus:border-orange-primary focus:ring-2 focus:ring-orange-primary/20"

                    />

                    <button
                        className="bg-orange-primary transition hover:bg-orange-dar w-full rounded-lg py-2 font-semibold text-white"
                        type="submit">
                        Entrar
                    </button>
                    <p className="mt-4 text-center">
                        Ainda não possiu uma conta? <a href="/register" className="font-semibold text-orange-primary underline transition hover:text-orange-dark">Criar conta</a>
                    </p>
                </form>
            </div>
        </main>
    )
}

export default Login;