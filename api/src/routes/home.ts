
import { Router } from "express";
import { homeController } from "../controllers";
import { catchAsync } from "../middleware";

const router = Router();

router.get("/", catchAsync(homeController));

export { router as homeRoute };