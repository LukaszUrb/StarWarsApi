import express, { Express } from "express";
import { homeRoute } from "./routes";


export const createApp = (): Express => {
    const app = express();
    app.use(express.json());

    app.use("/", homeRoute);

    return app;
};