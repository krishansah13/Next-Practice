"use client"

import { useRef, useState } from "react"
import classes from "./image-picker.module.css"
import Image from "next/image";

const ImagePicker = ({ label, name }: { label: string, name: string }) => {
    const [pickedImage, setPickedImage] = useState<string | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    function handlePickClick() {
        imageInputRef.current?.click();
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            const res = fileReader.result;
            if (typeof res === 'string')
                setPickedImage(res);
        }
        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No Image Picked Yet</p>}
                    {pickedImage && <Image src={pickedImage} alt="Image picked by user" fill />}
                </div>
                <input
                    ref={imageInputRef}
                    className={classes.input}
                    type="file"
                    id={name}
                    accept="image/png, image/jpeg"
                    name={name}
                    onChange={handleImageChange}
                    required
                />
                <button className={classes.button} type="button" onClick={handlePickClick}>Pick an Image</button>
            </div>
        </div>
    )
}

export default ImagePicker;