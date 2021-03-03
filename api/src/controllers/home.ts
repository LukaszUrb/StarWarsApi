import { RequestHandler } from "express";
import { User } from "../models";

export const homeController: RequestHandler = async (req, res) => {
    const user = await User.findById(req.session.userId);
    res.send(`Hello ${user ? user.email + ", your character ID is " + user.swCharacterId + " :)" : "visitor"}`);
};