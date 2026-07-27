import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Time to get started!
        <div className='flex flex-row'>
          <Link href="/meals">Meals</Link>
          <br />
          <Link href="/meals/share">Share Meals</Link>
          <br />
          <Link href="/community">Community</Link>
        </div>
      </h1>
    </main>
  );
}
