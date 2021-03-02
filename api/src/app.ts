import express, { Express } from "express";
import session, { Store } from "express-session";
import { SESSION_OPTIONS } from "./config";
import { homeRoute } from "./routes";

export const createApp = (store: Store): Express => {
    const app = express();
    app.use(express.json());
    app.use(session({ ...SESSION_OPTIONS, store }));

    app.use("/", homeRoute);

    return app;
};