
import Image from "next/image";
import classes from "./page.module.css"
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

const MealSlug = async ({ params }: {
    params: {
        mealSlug: string
    }
}) => {
    const { mealSlug } = await params
    const meal = getMeal(mealSlug) as {
        image: string,
        instructions: string,
        title: string,
        slug: string,
        creator: string,
        creator_email: string,
        summary: string
    };
    if (!meal) {
        notFound();
    }
    meal.instructions = meal.instructions.replace(/\n/g, '<br>');

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.slug} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>
                        {meal.title}
                    </h1>
                    <p className={classes.creator}>
                        by &nbsp;
                        <a href={`mailTo:${meal.creator_email}`}>
                            {meal.creator}
                        </a>
                    </p>
                    <p className={classes.summary}>
                        {meal.summary}
                    </p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={
                    { __html: meal.instructions, }
                }>

                </p>
            </main>
        </>
    )
}

export default MealSlug;