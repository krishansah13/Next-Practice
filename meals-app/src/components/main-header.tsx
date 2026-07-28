import Link from "next/link";
import logoImg from '../assets/logo.png'

export default function MainHeader() {
    console.log(logoImg)
    return (<header>
        <Link href='/'>
            <img src={logoImg.src} alt="Logo Image" />
            NextLevel Food
        </Link>

        <nav>
            <ul>
                <li>
                    <Link href="/meals">Browse Meals</Link>
                </li>
                <li>
                    <Link href="/community">Explore Community</Link>
                </li>
            </ul>
        </nav>
    </header>)
}