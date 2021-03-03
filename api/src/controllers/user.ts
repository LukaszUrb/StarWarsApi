import { RequestHandler } from "express";
import { emailValidSchema, loginValidSchema, registerValidSchema, resetPasswordValidSchema, validate, verifyEmailValidSchema } from "../validation";
import { PasswordReset, User } from "../models";
import { BadRequest, Unauthorized } from "../errors";
import { logIn, logOut, markAsVerified, resetPassword } from "../auth";
import { sendMail } from "../mail";

export const registerController: RequestHandler = async (req, res, next) => {
    await validate(registerValidSchema, req.body);

    const
        email: string = req.body.email,
        password: string = req.body.password,
        name: string = req.body.name;

    if (await User.findOne({ email })) throw new BadRequest("Email already exists in database.");

    const
        user = await User.create({
            email,
            password,
            name
        }),
        link = user.verificationUrl();

    await sendMail({
        to: email,
        subject: "Verify your email address",
        text: link
    });

    return res.json({ message: `Activation link has been sent to email ${user.email}.` });
};

export const loginController: RequestHandler = async (req, res) => {
    await validate(loginValidSchema, req.body);

    const
        password: string = req.body.password,
        email: string = req.body.email,
        user = await User.findOne({ email });

    if (!(await user?.matchesPassword(password))) throw new Unauthorized("Incorrect email or password.");

    if (!user.verifiedAt) throw new Unauthorized("Please confirm your email before logging in.");

    await logIn(req, user.id, user.swCharacterId);

    return res.json({ message: "OK" });
};

export const logoutController: RequestHandler = async (req, res) => {
    await logOut(req, res);

    return res.json({ message: "OK" });
};

export const forgotPasswordController: RequestHandler = async (req, res) => {
    await validate(emailValidSchema, req.body);

    const
        email: string = req.body.email,
        user = await User.findOne({ email });

    if (user?.verifiedAt) {
        const
            token = PasswordReset.plaintextToken(),
            reset = await PasswordReset.create({
                user: user.id,
                token,
                expiredAt: null
            });

        await sendMail({
            to: email,
            subject: "Reset your password",
            text: reset.url(token)
        });
    }

    return res.json({ message: "If you have an active account with us, you will receive an email with a link to reset your password." });
};

export const submitPasswordController: RequestHandler = async ({ query, body }, res) => {
    await validate(resetPasswordValidSchema, { query, body });

    const
        token = query.token as string,
        id = query.id as string,
        password: string = body.password,
        reset = await PasswordReset.findById(id),
        user = await User.findById(reset?.user);

    if (!reset?.isValid(token) || !user) throw new BadRequest("Invalid password reset token.");

    await Promise.all([resetPassword(user, password), PasswordReset.deleteMany({ user: reset.user })]);

    await sendMail({
        to: user.email,
        subject: "Password reset",
        text: "Your password has been reset successfully."
    });

    return res.json({ message: "OK" });
};

export const emailVerifyController: RequestHandler = async (req, res) => {
    await validate(verifyEmailValidSchema, req.query);

    const
        id = req.query.id as string,
        user = await User.findById(id);

    if (!user || !User.hasValidVerificationUrl(req.originalUrl, req.query)) throw new BadRequest("Invalid activation link.");

    if (user.verifiedAt) throw new BadRequest("Email already verified.");

    await markAsVerified(user);
    await logIn(req, user.id, user.swCharacterId);

    return res.json({ message: "Email verified correctly. Now you are logged in." });
};

export const emailResendController: RequestHandler = async (req, res) => {
    await validate(emailValidSchema, req.body);

    const
        email: string = req.body.email,
        user = await User.findOne({ email }).select("email verifiedAt");

    if (!user?.verifiedAt) {
        const link = user.verificationUrl();

        await sendMail({
            to: email,
            subject: "Verify your email address",
            text: link
        });
    }

    return res.json({ message: "If your email address needs to be verified, you will receive an email with the activation link." });
};
