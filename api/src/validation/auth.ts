import { Joi } from "./joi";
import { Constants } from "../utils";
import { BCRYPT_MAX_BYTES, EMAIL_VERIFICATION_TOKEN_BYTES, EMAIL_VERIFICATION_SIGNATURE_BYTES, PASSWORD_RESET_BYTES } from "../config";

const
    id = Joi.objectId().required(),
    email = Joi.string().email().min(8).max(254).lowercase().trim().required(),
    name = Joi.string().min(3).max(128).trim().required(),
    passwordLogin = Joi.string().required(),
    passwordConfirmation = Joi.valid(Joi.ref("password")).required(),
    passwordCreate = Joi.string()
        .min(8)
        .max(BCRYPT_MAX_BYTES, "utf8")
        .regex(Constants.EMAIL_EXP)
        .message('"{#label}" must contain one uppercase letter, one lowercase letter, and one digit.')
        .required();

export const
    registerValidSchema = Joi.object({
        email,
        name,
        password: passwordCreate,
        passwordConfirmation
    }),
    loginValidSchema = Joi.object({
        email,
        password: passwordLogin
    }),
    emailValidSchema = Joi.object({
        email
    }),
    verifyEmailValidSchema = Joi.object({
        id,
        token: Joi.string().length(EMAIL_VERIFICATION_TOKEN_BYTES).required(),
        expires: Joi.date().timestamp().required(),
        signature: Joi.string().length(EMAIL_VERIFICATION_SIGNATURE_BYTES).required()
    }),
    resetPasswordValidSchema = Joi.object({
        query: Joi.object({
            id,
            token: Joi.string()
                .length(PASSWORD_RESET_BYTES * 2)
                .required()
        }),
        body: Joi.object({
            password: passwordCreate,
            passwordConfirmation
        })
    });
