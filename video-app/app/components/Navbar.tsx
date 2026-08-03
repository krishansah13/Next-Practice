"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {
    const { data: session, status } = useSession();

    const loggedIn = status === "authenticated";

    return (
        <div className="bg-linear-60 from-mauve-900 to-gray-900 text-lg p-7 m-5 rounded-full text-gray-200 flex justify-between items-center font-bold shadow-xl uppercase">
            <span className="font-stretch-140% hover:scale-105 transition">
                <Link href="/">
                    Video Gallery
                </Link>
            </span>
            {!loggedIn ?
                (
                    <span className="flex gap-5">
                        <span className="hover:scale-105 hover:font-bold hover:underline underline-offset-8 transition">
                            <Link href="/login">Login</Link>
                        </span>
                        <span className="hover:scale-105 hover:font-bold hover:underline underline-offset-8 transition">
                            <Link href="/register">Register</Link>
                        </span>
                    </span>
                ) : (
                    <span className="flex gap-5">
                        <span className="hover:scale-105 hover:font-bold hover:underline underline-offset-8 transition">
                            <Link href="/upload">Upload</Link>
                        </span>
                        <span className="hover:scale-105 hover:font-bold hover:underline underline-offset-8 transition ">
                            <Link href="/register">Logout</Link>
                        </span>
                    </span>
                )
            }
        </div>
    )
}
