
"use client"

import { useState } from "react";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/signin",{
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            })
            
            const data = await response.json();

            console.log("status",response.status)
            console.log("resposta",data)

        } catch (error) {
            console.log('Erro:',error)
        }
    }

    return (
        <main>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit">
                    Entrar
                </button>
            </form>
        </main>
    )
}

export default Login;