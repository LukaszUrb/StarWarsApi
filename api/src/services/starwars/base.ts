import {asArray, dataFetch} from "../../utils";
import {redisCache} from "../../cache";

interface TIdentifiable { // zawęża przekazywane typy do tych które mają w sobie propertis id
    id: number;
    // name: string; // Film się nie kwalifikuje 
}

export abstract class SWApi<TSerialized extends TIdentifiable, TPayload> {
    protected _payload: TPayload;

    constructor() { }

    protected getIdFromUrl(data: string[] | string): number[] {
        return asArray(data).map(el => +el.match(/([0-9]+)/g)[0]);
    }

    private async fetchEntityAsync(id: number): Promise<TSerialized> {
        const
            url = this.setUrl(id),
            cachedSWEntity = await redisCache.getEntity<TSerialized>(url);

        if (cachedSWEntity) {
            return cachedSWEntity;
        } else {
            this._payload = await dataFetch<TPayload>(url);
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
