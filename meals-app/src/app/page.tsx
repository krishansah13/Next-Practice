import Link from 'next/link';

import classes from "./page.module.css"


export default function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}>

        </div>
        <div>
          <div className={classes.hero}>
            <h1>
              Have Your Meals, Your Way
            </h1>
            <p>
              Served By Us, With Love and Taste
            </p>
          </div>
          <div className={classes.cta}>
            <Link href="/community">Join the Community</Link>
            <Link href="/meals">Explore the Meals</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={classes.section}>
          <h2>
            How it Works
          </h2>
          <p>
            Next Level Food is a platform for foodies to share their favorite recipes with the world. It&apos;s a place to discover new dishes and connect with other food lovers.
          </p>          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>


      </main>

    </>
  );
}
