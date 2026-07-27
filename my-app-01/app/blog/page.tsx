import Link  from "next/link"
export default function Blog() {
    return (
        <>
            <h1>You will find Blogs here !</h1>
            <p>
                <Link href = "/blog/post-1" > Post-1   
                </Link>
                <Link href = "/blog/post-2"> Post-2   
                </Link>
            </p>
        </>
    )
}