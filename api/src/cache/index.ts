import Redis from "ioredis";
import { REDIS_RESPONSE_STORAGE_TIME_SEC } from "../config";

class RedisCache {
    private _redisClient: Redis.Redis;

    async storeEntity<T>(key: string, entity: T): Promise<void> {
        await this._redisClient.set(key, JSON.stringify(entity));
        await this._redisClient.expire(key, +REDIS_RESPONSE_STORAGE_TIME_SEC);
    }

    async getEntity<T>(key: string): Promise<T> {
        const entity = await this._redisClient.get(key);
        if (!entity) return null;
        return JSON.parse(entity);
    }

    set redisClient(client: Redis.Redis) {
        if (!this._redisClient)
            this._redisClient = client;
        else
            throw new Error("Redis client already set.");
    }

    get redisClient(): Redis.Redis {
        return this._redisClient;
    }
}


export const redisCache = new RedisCache();