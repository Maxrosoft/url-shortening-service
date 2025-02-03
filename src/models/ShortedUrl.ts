import mongoose from "mongoose";

const shortenedUrlSchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
        shortCode: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

const ShortenedUrl = mongoose.model("ShortedUrl", shortenedUrlSchema);

export default ShortenedUrl;
