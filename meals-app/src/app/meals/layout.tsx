import { ReactNode } from "react"
export default function MealsLayout({children} : {children : ReactNode}) {
    return (
        <p>
            I am Meal Layout
            {children}
        </p>
    )
}