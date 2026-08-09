"use client"

import { useState } from "react";

const Register = () => {
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

        } catch (error) {
            console.log('Erro:',error)
        }
    }

    return (
        <main>
            <h1>Criar conta</h1>

            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>
            </form>

        </main>
    )
}

export default Register;