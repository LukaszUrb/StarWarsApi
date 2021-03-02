import { SessionOptions } from "express-session";
import { IN_PROD } from "./app";
import { Constants } from "../utils";

export const {
    SESSION_SECRET = "Rq65x7692j6PIgI7dHz7lb5n2qQmp5Q4",
    SESSION_NAME = "sid",
    SESSION_IDLE_TIMEOUT_MILLISEC = Constants.THIRTY_MINUTES_MILLISEC,
    SESSION_ABSOLUTE_TIMEOUT_MILLISEC = Constants.SIX_HOURS_MILLISEC
} = process.env;

export const SESSION_OPTIONS: SessionOptions = {
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    proxy: IN_PROD,
    cookie: {
        maxAge: Number(SESSION_IDLE_TIMEOUT_MILLISEC),
        secure: IN_PROD,
        sameSite: true
    },
    rolling: true,
    resave: false,
    saveUninitialized: false
};
