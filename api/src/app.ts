import express, { Express } from "express";
import session, { Store } from "express-session";
import { SESSION_OPTIONS } from "./config";
import { active, notFound, serverError } from "./middleware";
import { homeRoute, userRoute } from "./routes";
import { starwarsRoute } from "./routes/starwars";

export const createApp = (store: Store): Express => {
    const app = express();
    app.use(express.json());
    app.use(session({ ...SESSION_OPTIONS, store }));
    app.use(active);

    app.use("/", homeRoute);
    app.use("/user", userRoute);
    app.use("/starwars", starwarsRoute);
    
    app.use(notFound);
    app.use(serverError);

    return app;
};