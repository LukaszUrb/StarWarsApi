import { Constants } from "../utils";

export const {
    NODE_ENV = "development",
    APP_PORT = 3000,
    APP_HOSTNAME = "localhost",
    APP_SECRET = "gsDdGloKLgd93kgGW4bln1b06nAde"
} = process.env;

export const IN_PROD = NODE_ENV === Constants.PROD;
export const APP_ORIGIN = `${IN_PROD ? "https" : "http"}://${APP_HOSTNAME}${IN_PROD ? "" : ":" + APP_PORT}`; 