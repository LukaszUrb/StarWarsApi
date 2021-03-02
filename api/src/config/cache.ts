import { RedisOptions } from "ioredis";
import { Constants } from "../utils";

export const {
    REDIS_PORT = 6379,
    REDIS_HOST = "localhost",
    REDIS_PASSWORD = "secret",
    REDIS_RESPONSE_STORAGE_TIME_SEC = Constants.TWELVE_FOUR_HOURS_SEC
} = process.env;

export const REDIS_OPTIONS: RedisOptions = {
    port: +REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD
};
