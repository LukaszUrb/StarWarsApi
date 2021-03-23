import { toNumber } from "../../utils";
import { SWApi } from "./base";

interface IPayloadPerson {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

export interface ISerializedPerson {
    id: number;
    name: string;
    height: number | string;
    mass: number | string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: number;
    films: number[];
    species: number[];
    vehicles: number[];
    starships: number[];
}

class SWApiPerson extends SWApi<ISerializedPerson, IPayloadPerson> {
    protected serialize(): ISerializedPerson {
        return {
            id: this.getIdFromUrl(this._payload.url)[0],
            name: this._payload.name,
            height: toNumber(this._payload.height),
            mass: toNumber(this._payload.mass),
            hair_color: this._payload.hair_color,
            skin_color: this._payload.skin_color,
            eye_color: this._payload.eye_color,
            birth_year: this._payload.birth_year,
            gender: this._payload.gender,
            homeworld: this.getIdFromUrl(this._payload.homeworld)[0],
            films: this.getIdFromUrl(this._payload.films),
            species: this.getIdFromUrl(this._payload.species),
            vehicles: this.getIdFromUrl(this._payload.vehicles),
            starships: this.getIdFromUrl(this._payload.starships)
        };
    }

    protected setUrl(id: number): string {
        return `https://swapi.dev/api/people/${id}/`;
    }
}

export const swApiPerson = new SWApiPerson();
