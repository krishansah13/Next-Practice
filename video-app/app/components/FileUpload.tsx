"use client"

import { ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload, } from "@imagekit/next";
import { useState } from "react";

interface FileUploadProps {
    onSuccess: (res: any) => void
    onProgress: (progress: number) => void
    fileType?: "image" | "video"
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {

    const [loader, setLoader] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const validateFile = (file: File) => {
        if (fileType === "video" && !file.type.startsWith("video/")) {
            setError("Please upload a valid video file.");
            return false;
        }

        if (fileType === "image" && !file.type.startsWith("image/")) {
            setError("Please upload a valid image file.");
            return false;
        }

        if (file.size > 100 * 1024 * 1024) {
            setError("File size must be less than 100 MB.");
            return false;
        }

        return true;
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (!file || !validateFile(file)) return

        setUploading(true)
        setError(null)
        onProgress: (event: any) => {
            if (event.lengthComputable) {
                const percent = (event.loaded / event.total) * 100;
                const progress = Math.round(percent);

                setLoader(progress);
                onProgress(progress);
            }
        }

        try {
            const authRes = await fetch('/api/imagekit');

            if (!authRes.ok) {
                throw new Error("Failed to get ImageKit authentication.");
            }

            const auth = await authRes.json();

            const res = await upload({
                expire: auth.expire,
                token: auth.token,
                signature: auth.signature,
                publicKey: auth.publicKey,
                file,
                fileName: file.name,

                onProgress: (event) => {
                    if (event.lengthComputable) {
                        const percent = Math.round(
                            (event.loaded / event.total) * 100
                        );

                        setLoader(percent);
                        onProgress(percent);
                    }
                }
            });

            onSuccess(res);

        } catch (error) {
            if (error instanceof ImageKitAbortError) {
                setError("Upload aborted.");
            } else if (error instanceof ImageKitInvalidRequestError) {
                setError("Invalid upload request.");
            } else if (error instanceof ImageKitUploadNetworkError) {
                setError("Network error during upload.");
            } else if (error instanceof ImageKitServerError) {
                setError("ImageKit server error.");
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setUploading(false);
            setLoader(0);
        }
    }
    return (
        <>
            <input
                type="file"
                accept={fileType === "video" ? "video/*" : "image/*"}
                onChange={handleFileChange}
                className="
                        text-gray-200
                        file:bg-violet-600
                        file:text-white
                        file:border-0
                        file:rounded-full
                        file:px-5
                        file:py-2
                        file:font-semibold
                        file:cursor-pointer
                        hover:file:bg-violet-500
                        transition-all
                        "/>
            {loader !== 100 && uploading && <span>{loader}% uploaded</span>}
            {loader === 100 && <span>Uploading..</span>}
            {error && <p className="text-red-500">{error}</p>}
        </>
    );
}

export default FileUpload;