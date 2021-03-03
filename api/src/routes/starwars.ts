import { Router } from "express";
import { filmsController, idFilmsController, idPlanetsController, idSpeciesController, idStarshipsController, idVehiclesController, peopleController, planetsController, speciesController, starshipsController, vehiclesController } from "../controllers";
import { auth, catchAsync } from "../middleware";

const router = Router();

router.get("/people/me", auth, catchAsync(peopleController));

router.get("/films/me", auth, catchAsync(filmsController));
router.get("/films/:id", auth, catchAsync(idFilmsController));

router.get("/species/me", auth, catchAsync(speciesController));
router.get("/species/:id", auth, catchAsync(idSpeciesController));

router.get("/vehicles/me", auth, catchAsync(vehiclesController));
router.get("/vehicles/:id", auth, catchAsync(idVehiclesController));

router.get("/starships/me", auth, catchAsync(starshipsController));
router.get("/starships/:id", auth, catchAsync(idStarshipsController));

router.get("/planets/me", auth, catchAsync(planetsController));
router.get("/planets/:id", auth, catchAsync(idPlanetsController));


export { router as starwarsRoute };