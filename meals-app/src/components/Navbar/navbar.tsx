"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import classes from "./navbar.module.css"

const Navlink = ({ href, children } : {href : string, children : ReactNode}) => {
    const path = usePathname();
    return (
        <Link href={href} className={path.startsWith(href) ? classes.active : undefined}>
            {children}
        </Link>
    )
}

export default Navlink;