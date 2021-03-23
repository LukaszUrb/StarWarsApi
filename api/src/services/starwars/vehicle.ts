import { toNumber } from "../../utils";
import { SWApi } from "./base";

interface IPayloadVehicle {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    vehicle_class: string;
    pilots: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

export interface ISerializedVehicle {
    id: number;
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string | number;
    length: string | number;
    max_atmosphering_speed: string | number;
    crew: string | number;
    passengers: string | number;
    cargo_capacity: string | number;
    consumables: string;
    vehicle_class: string;
    pilots: number[];
    films: number[];
}

class SWAPiVehicle extends SWApi<ISerializedVehicle, IPayloadVehicle> {
    protected serialize(): ISerializedVehicle {
        return {
            id: this.getIdFromUrl(this._payload.url)[0],
            name: this._payload.name,
            model: this._payload.model,
            manufacturer: this._payload.manufacturer,
            cost_in_credits: toNumber(this._payload.cost_in_credits),
            length: toNumber(this._payload.length),
            max_atmosphering_speed: toNumber(this._payload.max_atmosphering_speed),
            crew: toNumber(this._payload.crew),
            passengers: toNumber(this._payload.passengers),
            cargo_capacity: toNumber(this._payload.cargo_capacity),
            consumables: this._payload.consumables,
            vehicle_class: this._payload.vehicle_class,
            pilots: this.getIdFromUrl(this._payload.pilots),
            films: this.getIdFromUrl(this._payload.films)
        };
    }

    protected setUrl(id: number): string {
        return `https://swapi.dev/api/vehicles/${id}/`;
    }
}

export const swAPiVehicle = new SWAPiVehicle();
