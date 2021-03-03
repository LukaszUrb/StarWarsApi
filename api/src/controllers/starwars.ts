import { RequestHandler } from "express";
import { swApiFilm, swApiPlanet, swApiSpecies, swApiStarship, swAPiVehicle } from "../services";
import { fetchMyCharacter, verifySWApiAccess } from "../starwars";
import { numberIdValidSchema, validate } from "../validation";

export const peopleController: RequestHandler = async (req, res, next) => {
    const myCharacter = await fetchMyCharacter(req.session.swCharacterId);

    return res.json(myCharacter);
};

export const filmsController: RequestHandler = async (req, res, next) => {
    const swFilms = await swApiFilm.getEntities(req.session.films);

    return res.json(swFilms);
};

export const idFilmsController: RequestHandler = async (req, res, next) => {
    await validate(numberIdValidSchema, req.params);

    const id = +req.params.id;

    verifySWApiAccess(id, req.session.films);

    const swFilms = await swApiFilm.getEntities(id);

    return res.json(swFilms[0]);
};

export const speciesController: RequestHandler = async (req, res, next) => {
    const swSpecies = await swApiSpecies.getEntities(req.session.species);

    return res.json(swSpecies);
};

export const idSpeciesController: RequestHandler = async (req, res, next) => {
    await validate(numberIdValidSchema, req.params);

    const id = +req.params.id;

    verifySWApiAccess(id, req.session.species);

    const swSpecies = await swApiSpecies.getEntities(id);

    return res.json(swSpecies[0]);
};

export const vehiclesController: RequestHandler = async (req, res, next) => {
    const swVehicles = await swAPiVehicle.getEntities(req.session.vehicles);

    return res.json(swVehicles);
};

export const idVehiclesController: RequestHandler = async (req, res, next) => {
    await validate(numberIdValidSchema, req.params);

    const id = +req.params.id;

    verifySWApiAccess(id, req.session.vehicles);

    const swVehicles = await swAPiVehicle.getEntities(id);

    return res.json(swVehicles[0]);
};

export const starshipsController: RequestHandler = async (req, res, next) => {
    const swStarships = await swApiStarship.getEntities(req.session.starships);

    return res.json(swStarships);
};

export const idStarshipsController: RequestHandler = async (req, res, next) => {
    await validate(numberIdValidSchema, req.params);

    const id = +req.params.id;

    verifySWApiAccess(id, req.session.starships);

    const swStarships = await swApiStarship.getEntities(id);

    return res.json(swStarships[0]);
};

export const planetsController: RequestHandler = async (req, res, next) => {
    const swPlanets = await swApiPlanet.getEntities(req.session.planets);

    return res.json(swPlanets);
};

export const idPlanetsController: RequestHandler = async (req, res, next) => {
    await validate(numberIdValidSchema, req.params);

    const id = +req.params.id;

    verifySWApiAccess(id, req.session.planets);

    const swPlanets = await swApiPlanet.getEntities(id);

    return res.json(swPlanets[0]);
};
