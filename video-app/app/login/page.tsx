"use client"

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (!email || !password) {
                throw new Error("Email or password is missing")
            }
            const res = await signIn("credentials", {
                email, password, redirect: false
            })

            if (res?.error) throw new Error(res?.error);
            else router.push('/')

        } catch (error: any) {
            console.error(error.message);
            alert(error.message);
        }
    }

    return (
        <div>
            <h1>
                Welcome Back
            </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email : </label>
                <input type="email" value={email} name="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password : </label>
                <input type="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Log In</button>
                <br />
            </form>
            <Link href="/register">
                Don't Have an account? Register Now !!!
            </Link>
        </div>
    )
}

export default Login