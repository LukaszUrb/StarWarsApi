import { Request, Response } from "express";
import { SESSION_NAME } from "./config";
import { UserDocument } from "./models";
import { fetchMyCharacter } from "./starwars";

export const isLoggedIn = (req: Request): boolean => !!req.session.userId;

export const logIn = async (req: Request, userId: string, swCharacterId: number): Promise<void> => {
    const myCharacter = await fetchMyCharacter(swCharacterId);

    req.session.userId = userId;
    req.session.createdAt = Date.now();
    req.session.swCharacterId = swCharacterId;
    req.session.films = myCharacter.films;
    req.session.species = myCharacter.species;
    req.session.vehicles = myCharacter.vehicles;
    req.session.starships = myCharacter.starships;
    req.session.planets = myCharacter.homeworld;
};

export const logOut = (req: Request, res: Response): Promise<void> => {
    return new Promise((resolve, reject) => {
        req.session.destroy((err: Error) => {
            if (err) reject(err);

            res.clearCookie(SESSION_NAME);

            resolve();
        });
    });
};
