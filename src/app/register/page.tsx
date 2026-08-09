"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/signup", {
                method: "POST",
                headers: {
                    'content-Type': "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                })
            });

            const data = await response.json();

            if(response.ok){
                router.push("/login")
            }

        } catch (error) {
            console.log('Erro:', error)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-sm rounded-xl border p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Criar conta
                </h1>

                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}>

                    <input type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" />

                    <button type="submit" className="w-full rounded-lg py-2 font-semibold bg-blue-600 text-white hover:bg-blue-700">
                        Cadastrar
                    </button>
                </form>
            </div>
        </main>
    )
}

export default Register;