"use client"
import { ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload, } from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUploadProps {
    onSuccess: (res: any) => void
    onProgress: (progress: number) => void
    fileType?: "image" | "video"
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File) => {
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
        if (file.size > 100 * 1024 * 1024) {
            setError("File Size must be less than 100 MB");
        }
        return true;
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (!file || !validateFile(file)) return

        setUploading(true)
        setError(null)

        try {
            const authRes = await fetch('/api/auth/imagekit-auth');

            if (!authRes.ok) {
                throw new Error("Failed to get ImageKit authentication.");
            }

            const auth = await authRes.json();
            const res = await upload({
                expire: auth.expire,
                token: auth.token,
                signature: auth.signature,
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                file,
                fileName: file.name,
                onProgress: (event) => {
                    if (event.lengthComputable && onProgress) {
                        const percent = (event.loaded / event.total) * 100;
                        onProgress(Math.round(percent));
                    }
                }
            })
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
        }
    }

    return (
        <>
            <input type="file" accept={fileType === "video" ? "video/*" : "image/*"} onChange={handleFileChange} />
            {uploading && <span>Loading....</span>}
            {error && <p className="text-red-500">{error}</p>}
        </>
    );
};

export default FileUpload;