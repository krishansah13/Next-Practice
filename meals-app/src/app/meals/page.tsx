import Link from "next/link"
import { Suspense } from "react"

import classes from "./page.module.css"
import MealsGrid from "./meals-grid"
import getMeals from "@/lib/meals"



async function Meals() {
    const meals = await getMeals();
    return <MealsGrid meals={meals} />
}

export default function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious Meals, created{' '}
                    <span className={classes.highlight}>
                        by you
                    </span>
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself. It is easy and amazing.
                </p>
                <p className={classes.cta}>
                    <Link href="/meals/share">Share Your Favorite Recipe</Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={
                    <p className={classes.loading}>
                        Preparing the dishes in our backend...
                    </p>
                }>
                    <Meals />
                </Suspense>
            </main>
        </>
    )
}