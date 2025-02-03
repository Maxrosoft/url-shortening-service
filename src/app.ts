import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import apiRouter from "./routes/api";
import errorHandler from "./middlewares/errorHandler";

const PORT: number = +(process.env.PORT || 3000);
const MONGO_URI: string = process.env.MONGO_URI || "mongodb://localhost:27017/";

const app = express();
app.use(express.json());
app.use(apiRouter);
app.use(errorHandler);

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to the database :)");
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting the database :(");
        console.log(error.message);
    });
