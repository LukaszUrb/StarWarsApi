import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import connectRedis from "connect-redis";
import path from "path";
dotenv.config({ path: path.join(path.dirname(require.main.filename), "../.env") });
import { APP_PORT, MONGO_URI, MONGO_OPTIONS, APP_ORIGIN } from "./config";
import { createApp } from "./app";
import { redisCache } from "./cache";

(async (): Promise<void> => {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
    const RedisStore = connectRedis(session);
    const store = new RedisStore({ client: redisCache.redisClient });
    const app = createApp(store);
    app.listen(APP_PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Server is up on ${APP_ORIGIN}`);
    });
})();
