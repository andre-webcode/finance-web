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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
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
        <main className="min-h-screen flex items-center justify-center bg-gray-light">
            <div className="w-full max-w-sm rounded-2xl p-8 border border-gray-light bg-white shadow-xl">
                <h1 className="text-3xl font-bold text-center text-orange-primary mb-6">
                    Criar conta
                </h1>

                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}>

                    <input type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-gray-light bg-white text-gray-text px-4 py-2 outline-none "
                    />

                    <input type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-gray-light bg-white text-gray-text px-4 py-2 outline-none "
                    />

                    <input type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-light bg-white text-gray-text px-4 py-2 outline-none " />

                    <button type="submit" className="bg-orange-primary transition hover:bg-orange-dark w-full rounded-lg py-2 font-semibold text-white">
                        Cadastrar
                    </button>
                </form>
            </div>
        </main>
    )
}

export default Register;