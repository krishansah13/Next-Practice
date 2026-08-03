"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");

        let hasError = false;

        if (!email) {
            setEmailError("Email is required");
            hasError = true;
        }

        if (!password) {
            setPasswordError("Password is required");
            hasError = true;
        }

        if (!confirmPassword) {
            setConfirmPasswordError("Please confirm your password");
            hasError = true;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            hasError = true;
        }

        if (hasError) return;

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            router.push("/login");

        } catch (error: any) {
            setEmailError(error.message);
        }
    };

    return (
        <div>
            <h1 className="text-4xl px-4 py-5 font-bold text-center">
                Create Account
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col bg-gray-800 px-4 py-4 m-2 max-w-2xl rounded-xl mx-auto"
            >

                <label htmlFor="email" className="font-bold mt-2 mx-2">
                    Email :
                </label>

                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                    }}
                    className="max-w-2xl p-2 my-2 bg-gray-600 rounded-xl outline-none"
                />

                {emailError && (
                    <p className="text-red-400 mb-2">
                        {emailError}
                    </p>
                )}


                <label htmlFor="password" className="font-bold mt-2">
                    Password :
                </label>

                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                    }}
                    className="max-w-2xl p-2 my-3 bg-gray-600 rounded-xl outline-none"
                />

                {passwordError && (
                    <p className="text-red-400 mb-2">
                        {passwordError}
                    </p>
                )}


                <label htmlFor="confirmPassword" className="font-bold">
                    Confirm Password :
                </label>

                <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setConfirmPasswordError("");
                    }}
                    className="max-w-2xl p-2 my-3 bg-gray-600 rounded-xl outline-none"
                />

                {confirmPasswordError && (
                    <p className="text-red-400 mb-2">
                        {confirmPasswordError}
                    </p>
                )}


                <button
                    type="submit"
                    className="bg-gray-700 rounded-full h-10 w-50 hover:bg-gray-500 hover:scale-95 transition mx-auto m-2 cursor-pointer"
                >
                    Register
                </button>


                <p className="flex justify-end gap-2 font-light">
                    Already have an account?
                    <Link
                        href="/login"
                        className="text-blue-400"
                    >
                        Login Now !!!
                    </Link>
                </p>

            </form>

        </div>
    );
};

export default RegisterPage;