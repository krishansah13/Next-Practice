"use client"
import { useEffect, useState } from "react";

import images from "./image.data";
import Image from "next/image";

export default function ImageSlideshow() {

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
            return ()=> clearTimeout(timer);
        }, 5000);

        return () => clearInterval(timer);
    }, []);
    return (
        <div>
            <Image src ={images[currentImage].image} alt = {images[currentImage].alt} height={400} width = {400} className="border-amber-200 rounded-2xl"/>
        </div>
    )
}
