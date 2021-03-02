import { RequestHandler } from "express";

export const homeController: RequestHandler = (req, res) => {
    res.send(`Hello visitor`);
};