import { fixNewLines, toStringArray } from "../../utils";
import { SWApi } from "./base";

interface IPayloadFilm {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: string;
    edited: string;
    url: string;
}

export interface ISerializedFilm {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string[];
    producer: string[];
    release_date: string;
    characters: number[];
    planets: number[];
    starships: number[];
    vehicles: number[];
    species: number[];
}

class SWApiFilm extends SWApi<ISerializedFilm, IPayloadFilm> {
    protected serialize(): ISerializedFilm {
        return {
            title: this._payload.title,
            episode_id: this._payload.episode_id,
            opening_crawl: fixNewLines(this._payload.opening_crawl),
            director: toStringArray(this._payload.director, ", "),
            producer: toStringArray(this._payload.producer, ", "),
            release_date: this._payload.release_date,
            characters: this.getIdFromUrl(this._payload.characters),
            planets: this.getIdFromUrl(this._payload.planets),
            starships: this.getIdFromUrl(this._payload.starships),
            vehicles: this.getIdFromUrl(this._payload.vehicles),
            species: this.getIdFromUrl(this._payload.species)
        };
    }

    protected setUrl(id: number): string {
        return `https://swapi.dev/api/films/${id}/`;
    }
}

export const swApiFilm = new SWApiFilm();
