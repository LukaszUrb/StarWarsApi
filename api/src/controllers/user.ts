import { RequestHandler } from "express";
import { loginValidSchema, registerValidSchema, validate } from "../validation";
import { User } from "../models";
import { BadRequest, Unauthorized } from "../errors";
import { logIn, logOut } from "../auth";

export const registerController: RequestHandler = async (req, res, next) => {
    await validate(registerValidSchema, req.body);
    const
        email: string = req.body.email,
        password: string = req.body.password,
        name: string = req.body.name;

    if (await User.findOne({ email })) throw new BadRequest("Email already exists in database.");

    const user = await User.create({
        email,
        password,
        name
    });

    logIn(req, user.id);

    return res.json({ message: `The account for ${user.email} has been created, your character ID is ${user.swCharacterId} :) Now you are logged in!` });
};

export const loginController: RequestHandler = async (req, res) => {
    await validate(loginValidSchema, req.body);

    const
        { email, password } = req.body,
        user = await User.findOne({ email });

    if (!await user?.matchesPassword(password)) throw new Unauthorized("Incorrect email or password.");

    logIn(req, user.id);

    res.json({ message: "OK" });
};

export const logoutController: RequestHandler = async (req, res) => {
    await logOut(req, res);
    res.json({ message: "OK" });
};