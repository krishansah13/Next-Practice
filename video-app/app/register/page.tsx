"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

import Link from "next/link";

const RegisterPage = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (password !== confirmPassword) {
                throw new Error("Passwords Do Not Match");
            }

            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
                    email, password
                })
            })

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            } else {
                console.log(data);
                router.push("/login");
            }
        } catch (error: any) {
            console.error(error);
            alert(error.message)
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Email : </label>
                <input type="email" placeholder="Enter your email " name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="email">Password : </label>
                <input type="password" placeholder="Enter your password " name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="confirm password">Confirm Password : </label>
                <input type="password" placeholder="Confirm Password " name="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <button type="submit">Submit</button>
                <div>
                    <p>
                        <Link href="/login">
                            Already have an account?
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage;