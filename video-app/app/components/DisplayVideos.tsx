"use client";

import { useEffect, useState } from "react";

interface Video {
    _id: string;
    title: string;
    description: string;
    videoURL: string;
    thumbnailURL: string;
}

export default function DisplayVideos() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState("");

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/video", {
                cache: "no-store",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch videos");
            }
            const data = await res.json();
            console.log(data);

            setVideos(data);
            
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to fetch videos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetchVideos();
        }, 3000)

        // Refresh every 5 seconds
        const interval = setInterval(fetchVideos, 5000);

        return () => clearInterval(interval);
    }, []);

    if (loading && videos.length === 0) {
        return (
            <div className="flex justify-center items-center h-60">
                <p className="text-lg animate-pulse">Loading videos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-60">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    if (videos.length === 0) {
        return (
            <div className="flex justify-center items-center h-60">
                <p className="text-gray-400 text-lg">No videos found.</p>
            </div>
        );
    }

    return (
        <>
            {loading && (
                <div className="fixed top-5 right-5 bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg">
                    Refreshing...
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {videos.map((video) => (
                    <div
                        key={video._id}
                        className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
                    >
                        <video
                            src={video.videoURL}
                            controls
                            poster={video.thumbnailURL}
                            className="w-full aspect-video object-cover"
                        />

                        <div className="p-4">
                            <h2 className="text-xl font-bold">{video.title}</h2>

                            <p className="text-gray-400 mt-2 line-clamp-3">
                                {video.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}