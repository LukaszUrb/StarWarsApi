import { RequestHandler } from "express";

export const homeController: RequestHandler = async (req, res) => {
    res.send(`Hello visitor`);
};