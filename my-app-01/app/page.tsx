import Link from 'next/link'

import Header from "@/components/header"

export default function Home() {
  return (
    <div className="text-center">
      <Header/>
      <p className="text-2xl">
        I am configuring a code written in NextJS
      </p>
      <Link href="/awesome">
        Click Me to Navigate to /awesome
      </Link>
    </div>
  );
}
