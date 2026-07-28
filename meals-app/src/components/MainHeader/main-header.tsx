import Link from "next/link";
import Image from "next/image";

import logoImg from '@/assets/logo.png'
import classes from "./main-header.module.css"
import MainHeaderBackground from "./main-header-background";
import Navlink from "../Navbar/navbar";

export default function MainHeader() {
    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link href='/' className={classes.logo}>
                    <Image src={logoImg} alt="Logo Image" priority />
                    NextLevel Food
                </Link>

                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <Navlink href = "/meals">Browse Meals</Navlink>
                        </li>
                        <li>
                            <Navlink href = "/community">Foodies Community</Navlink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}