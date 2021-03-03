import { Request } from "express";

declare global {
    namespace Express {
        interface Session {
            createdAt: number;
            userId: string;
            swCharacterId: number;
            films: number[];
            species: number[];
            vehicles: number[];
            starships: number[];
            planets: number;
        }
    }
}
