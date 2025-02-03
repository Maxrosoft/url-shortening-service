import mongoose from "mongoose";

const shortenedUrlSchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
        shortCode: { type: String, required: true, unique: true },
        accessCount: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

const ShortenedUrl = mongoose.model("ShortedUrl", shortenedUrlSchema);

export default ShortenedUrl;
