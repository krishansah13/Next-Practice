"use client"

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");

        let hasError = false;

        if (!email) {
            setEmailError("Email is required");
            hasError = true;
        }

        if (!password) {
            setPasswordError("Password is required");
            hasError = true;
        }

        if (hasError) return;

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setPasswordError(res.error);
                return;
            }

            router.push("/");
        } catch (error) {
            setPasswordError("Something went wrong");
        }
    };

    return (
        <div >
            <h1 className="text-4xl px-4 py-5 font-bold mx-auto text-center">
                Welcome Back
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col justify-between bg-gray-800 px-4 m-2 py-2 max-w-2xl rounded-xl mx-auto">

                <label htmlFor="email" className="font-bold mt-2 mx-2">Email : </label>
                <input type="email" value={email} name="email" placeholder="Enter your email" onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError("")
                }} className="max-w-2xl p-2 my-2 bg-gray-600 rounded-xl " />

                {emailError && <p className="text-red-400 mb-2">{emailError}</p>}

                <label htmlFor="password">Password : </label>
                <input type="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => {
                    setPassword(e.target.value)
                    setPasswordError("");
                }} className="max-w-2xl p-2 my-3 bg-gray-600  rounded-xl" />
                {passwordError && <p className="text-red-400 mb-2">{passwordError}</p>}

                <button type="submit" className="bg-gray-700 rounded-full h-10 w-50 hover:bg-gray-500 hover:scale-95 hover:transition-smootcursor-pointer mx-auto m-1">Log In</button>

                <p className="flex text-center gap-2 justify-end font-light">
                    Don't Have an account?
                    <Link href="/register" className="text-blue-400">
                        Register Now !!!
                    </Link>
                </p>
            </form>

        </div>
    )
}

export default Login