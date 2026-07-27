type Props = {
    params : Promise<{
        mealSlug : string;
    }>
}

const MealSlug = async({params} : Props) => {
    const {mealSlug} = await params;
    return (
        <h1>
            Meal {mealSlug}
        </h1>
    )
}

export default MealSlug;