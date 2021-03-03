import { toNumber, toStringArray } from "../../utils";
import { SWApi } from "./base";

interface IPayloadPlanet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: any[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

export interface ISerializedPlanet {
    name: string;
    rotation_period: number | string;
    orbital_period: number | string;
    diameter: number | string;
    climate: string[];
    gravity: string;
    terrain: string[];
    surface_water: number | string;
    population: number | string;
    residents: number[];
    films: number[];
}

class SWApiPlanet extends SWApi<ISerializedPlanet, IPayloadPlanet> {
    protected serialize(): ISerializedPlanet {
        return {
            name: this._payload.name,
            rotation_period: toNumber(this._payload.rotation_period),
            orbital_period: toNumber(this._payload.orbital_period),
            diameter: toNumber(this._payload.diameter),
            climate: toStringArray(this._payload.climate, ", "),
            gravity: this._payload.gravity,
            terrain: toStringArray(this._payload.terrain, ", "),
            surface_water: toNumber(this._payload.surface_water),
            population: toNumber(this._payload.population),
            residents: this.getIdFromUrl(this._payload.residents),
            films: this.getIdFromUrl(this._payload.films)
        };
    }

    protected setUrl(id: number): string {
        return `https://swapi.dev/api/planets/${id}/`;
    }
}

export const swApiPlanet = new SWApiPlanet();
