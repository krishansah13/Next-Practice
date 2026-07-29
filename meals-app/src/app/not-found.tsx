"use client"
import { usePathname } from "next/navigation";

const NotFound = () => {
    const path = usePathname();
    return (
        <main className="not-found">
            <h1>
                Not Found
            </h1>
            <p>
                The requested path {path} cannot be found!
            </p>
        </main>
    )
}

export default NotFound;