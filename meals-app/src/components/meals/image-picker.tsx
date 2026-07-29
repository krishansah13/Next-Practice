"use client"

import { Ref, useRef } from "react"
import classes from "./image-picker.module.css"

const ImagePicker = ({ label, name }: { label: string, name: string }) => {

    const imageInputRef  = useRef<HTMLInputElement>(null);

    function handlePickClick() {
        imageInputRef.current?.click();
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <input
                    ref = {imageInputRef}
                    className={classes.input}
                    type="file"
                    id={name}
                    accept="image/png, image/jpeg"
                    name={name} />
                <button className={classes.button} type="button" onClick={handlePickClick}>Pick an Image</button>
            </div>
        </div>
    )
}

export default ImagePicker;