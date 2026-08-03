"use client";

import { useState } from "react";
import FileUpload from "../components/FileUpload";
import classes from "./page.module.css";

export default function VideoUploader() {
    const [videoURL, setVideoURL] = useState("");
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        videoURL: videoURL,
        thumbnailURL: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const videoData = {
            ...formData,
            videoURL,
        };

        console.log(videoData);

        async function uploadVideo() {
            if (!videoData) return;

            const res = await fetch("/api/video", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(videoData),
            });

            const data = await res.json();
            console.log(data);
        }
        uploadVideo();
    };

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit} className={classes.form}>
                <h1 className={classes.heading}>Upload Video</h1>

                <div className={classes.field}>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Video title"
                        value={formData.title}
                        onChange={handleChange}
                        className={classes.input}
                    />
                </div>

                <div className={classes.field}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter video description"
                        value={formData.description}
                        onChange={handleChange}
                        className={classes.textarea}
                    />
                </div>

                <div className={classes.field}>
                    <label htmlFor="videoURL">Video Link</label>
                    <input
                        id="videoURL"
                        name="videoURL"
                        type="url"
                        placeholder="Enter video URL"
                        value={formData.videoURL}
                        onChange={handleChange}
                        className={classes.input}
                    />
                </div>

                <div className={classes.field}>
                    <label htmlFor="thumbnailURL">Thumbnail URL</label>
                    <input
                        id="thumbnailURL"
                        name="thumbnailURL"
                        type="url"
                        placeholder="Enter thumbnail URL"
                        value={formData.thumbnailURL}
                        onChange={handleChange}
                        className={classes.input}
                    />
                </div>


                <FileUpload
                    fileType="video"
                    onProgress={(progress) => {
                        console.log(`Uploading: ${progress}%`);
                    }}
                    onSuccess={(res) => {
                        setVideoURL(res.url);

                        setFormData((prev) => ({
                            ...prev,
                            videoURL: res.url,
                        }));
                    }}
                />


                {videoURL && (
                    <video
                        src={videoURL}
                        controls
                        className={classes.preview}
                    />
                )}

                <button type="submit" className={classes.button}>
                    Upload Video
                </button>
            </form>
        </div>
    );
}