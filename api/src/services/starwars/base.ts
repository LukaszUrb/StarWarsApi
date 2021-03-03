import fetch, { Response } from "node-fetch";
import { asArray } from "../../utils";
import { ServiceUnavailable, ExternalError } from "../../errors";
import { redisCache } from "../../cache";

export abstract class SWApi<TSerialized, TPayload> {
    private _response: Response;
    protected _payload: TPayload;

    constructor() { }

    protected getIdFromUrl(data: string[] | string): number[] {
        return asArray(data).map(el => +el.match(/([0-9]+)/g)[0]);
    }

    private async fetch(url: string): Promise<void> {
        try {
            this._response = await fetch(url);
        } catch (err) {
            throw new ServiceUnavailable("External service SW API is unavailable.");
        }

        if (!this._response.ok) throw new ExternalError(this._response.statusText, this._response.status);
    }

    private async parse(): Promise<void> {
        this._payload = await this._response.json();
    }

    private async fetchEntityAsync(id: number): Promise<TSerialized> {
        const
            url = this.setUrl(id),
            cachedSWEntity = await redisCache.getEntity<TSerialized>(url);

        if (cachedSWEntity) {
            return cachedSWEntity;
        } else {
            await this.fetch(url);
            await this.parse();
            const newSWEntity = this.serialize();
            await redisCache.storeEntity(url, newSWEntity);

            return newSWEntity;
        }
    }

    async getEntities(ids: number | number[]): Promise<TSerialized[]> {
        const promises: Promise<TSerialized>[] = [];

        asArray(ids).forEach(id => {
            promises.push(this.fetchEntityAsync(id));

        });

        return await Promise.all(promises);
    }

    protected abstract setUrl(id: number): string;
    protected abstract serialize(): TSerialized;
}
