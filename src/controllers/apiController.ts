import { Request, Response } from "express";
import { createHash } from "crypto";
import validUrl from "valid-url";
import ShortenedUrl from "../models/ShortedUrl";
import { ErrorMessageI } from "../middlewares/errorHandler";

function shortUniqueString(input: string, length: number = 8): string {
    return createHash("md5").update(input).digest("hex").slice(0, length);
}

interface ShortenedUrlI {
    id: string;
    url: string;
    shortCode: string;
    createdAt: string;
    updatedAt: string;
    accessCount?: number;
}

class ApiController {
    async createShortUrl(req: Request, res: Response, next) {
        const { url } = req.body;

        try {
            if (!validUrl.isWebUri(url)) {
                const errorMessage: ErrorMessageI = {
                    status: "error",
                    message: "Invalid Url",
                };
                return res.status(400).send(errorMessage);
            }
            const shortCode: string = shortUniqueString(url);

            const duplicate = await ShortenedUrl.findOne({
                shortCode: shortCode,
            }).exec();

            if (duplicate) {
                const errorMessage: ErrorMessageI = {
                    status: "error",
                    message: "Such Url already exists",
                };
                return res.status(400).send(errorMessage);
            }

            const created = await ShortenedUrl.create({
                url,
                shortCode,
            });

            const data: ShortenedUrlI = {
                id: created._id.toString(),
                url: created.url,
                shortCode: created.shortCode,
                createdAt: created.createdAt.toISOString(),
                updatedAt: created.updatedAt.toISOString(),
            };

            res.status(201).send(data);
        } catch (error) {
            return next(error);
        }
    }

    async retrieveOriginalUrl(req: Request, res: Response, next) {
        const shortCode: string = req.params.shortCode;

        try {
            const found = await ShortenedUrl.findOne({
                shortCode: shortCode,
            }).exec();

            if (!found) {
                const errorMessage: ErrorMessageI = {
                    status: "error",
                    message: "Shorted Url not found",
                };
                return res.status(404).send(errorMessage);
            } else {
                ++found.accessCount;
                found.save();

                const data: ShortenedUrlI = {
                    id: found._id.toString(),
                    url: found.url,
                    shortCode: found.shortCode,
                    createdAt: found.createdAt.toISOString(),
                    updatedAt: found.updatedAt.toISOString(),
                };
                res.send(data);
            }
        } catch (error) {
            return next(error);
        }
    }

    async updateShortUrl(req: Request, res: Response, next) {
        const shortCode: string = req.params.shortCode;
        const { url } = req.body;

        try {
            if (!validUrl.isWebUri(url)) {
                const errorMessage: ErrorMessageI = {
                    status: "error",
                    message: "Invalid Url",
                };
                return res.status(400).send(errorMessage);
            }

            await ShortenedUrl.findOneAndUpdate(
                { shortCode: shortCode },
                { url }
            );

            const updated = await ShortenedUrl.findOne({
                shortCode: shortCode,
            }).exec();

            if (!updated) {
                const errorMessage: ErrorMessageI = {
                    status: "error",
                    message: "Shorted Url not found",
                };
                return res.status(404).send(errorMessage);
            } else {
                const data: ShortenedUrlI = {
                    id: updated._id.toString(),
                    url: url,
                    shortCode: updated.shortCode,
                    createdAt: updated.createdAt.toISOString(),
                    updatedAt: updated.updatedAt.toISOString(),
                };
                res.send(data);
            }
        } catch (error) {
            return next(error);
        }
    }

    async deleteShortUrl(req: Request, res: Response, next) {
        const shortCode: string = req.params.shortCode;

        try {
            const toDelete = await ShortenedUrl.findOneAndDelete({
                shortCode: shortCode,
            }).exec();

            if (!toDelete) {
                const errorMessage: ErrorMessageI = {
                    status: "error",
                    message: "Shorted Url not found",
                };
                return res.status(404).send(errorMessage);
            } else {
                res.sendStatus(204);
            }
        } catch (error) {
            return next(error);
        }
    }

    async getUrlStatistics(req: Request, res: Response, next) {
        const shortCode: string = req.params.shortCode;

        try {
            const found = await ShortenedUrl.findOne({
                shortCode: shortCode,
            }).exec();

            if (!found) {
                const errorMessage: ErrorMessageI = {
                    status: "error",
                    message: "Shorted Url not found",
                };
                return res.status(404).send(errorMessage);
            } else {
                const data: ShortenedUrlI = {
                    id: found._id.toString(),
                    url: found.url,
                    shortCode: found.shortCode,
                    createdAt: found.createdAt.toISOString(),
                    updatedAt: found.updatedAt.toISOString(),
                    accessCount: found.accessCount,
                };
                res.send(data);
            }
        } catch (error) {
            return next(error);
        }
    }
}

export default ApiController;
