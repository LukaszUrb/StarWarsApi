import { toStringArray, toNumber } from "../../utils";
import { SWApi } from "./base";

interface IPayloadSpecies {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    skin_colors: string;
    hair_colors: string;
    eye_colors: string;
    average_lifespan: string;
    homeworld: string;
    language: string;
    people: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

export interface ISerializedSpecies {
    id: number;
    name: string;
    classification: string;
    designation: string;
    average_height: number;
    hair_colors: string[];
    skin_colors: string[];
    eye_colors: string[];
    average_lifespan: number | string;
    homeworld: number;
    language: string;
    people: number[];
    films: number[];
}

class SWApiSpecies extends SWApi<ISerializedSpecies, IPayloadSpecies> {
    protected serialize(): ISerializedSpecies {
        return {
            id: this.getIdFromUrl(this._payload.url)[0],
            name: this._payload.name,
            classification: this._payload.classification,
            designation: this._payload.designation,
            average_height: +this._payload.average_height,
            hair_colors: toStringArray(this._payload.hair_colors, ", "),
            skin_colors: toStringArray(this._payload.skin_colors, ", "),
            eye_colors: toStringArray(this._payload.eye_colors, ", "),
            average_lifespan: toNumber(this._payload.average_lifespan),
            language: this._payload.language,
            homeworld: this.getIdFromUrl(this._payload.homeworld)[0],
            people: this.getIdFromUrl(this._payload.people),
            films: this.getIdFromUrl(this._payload.films)
        };
    }

    protected setUrl(id: number): string {
        return `https://swapi.dev/api/species/${id}/`;
    }
}

export const swApiSpecies = new SWApiSpecies();
