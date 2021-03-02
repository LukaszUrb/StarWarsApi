import mongoose from "mongoose";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { REDIS_OPTIONS, APP_PORT, MONGO_URI, MONGO_OPTIONS, APP_ORIGIN } from "./config";
import { createApp } from "./app";

export let redisClient: Redis.Redis;

(async (): Promise<void> => {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
    const RedisStore = connectRedis(session);
    redisClient = new Redis(REDIS_OPTIONS);
    const store = new RedisStore({ client: redisClient });
    const app = createApp(store);
    app.listen(APP_PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Server is up on ${APP_ORIGIN}`);
    });
})();