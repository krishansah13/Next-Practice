"use client"
import { useEffect, useState } from "react";

import images from "./image.data";
import Image from "next/image";
import classes from "./image-slideshow.module.css"

export default function ImageSlideshow() {

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentImage]);
    return (
        <div>
            <Image className={classes.image} key = {currentImage} src={images[currentImage].image} alt={images[currentImage].alt} height={400} width={400} />
        </div>
    )
}
