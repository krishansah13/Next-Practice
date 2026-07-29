import classes from "./loading.module.css"

export default function LoadingMeals() {
    return (
        <p className={classes.loading}>
            Preparing the dishes in our backend...
        </p>
    )
}