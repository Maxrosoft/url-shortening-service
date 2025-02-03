import { Request, Response } from "express";

export interface ErrorMessageI {
    status: "error";
    message: string;
}

export default (err: Error, req: Request, res: Response, next) => {
    console.error("Error:", err.message);
    const errorMessage: ErrorMessageI = {
        status: "error",
        message: err.message,
    };
    res.status(500).send(errorMessage);
};
