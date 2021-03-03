import { compare, hash } from "bcryptjs";
import { Schema, model, Document } from "mongoose";
import { BCRYPT_WORK_FACTOR } from "../config";
import { CHARACTER_MAX_ID, CHARACTER_MIN_ID } from "../config/starwars";
import { randomFromRange } from "../utils";

export interface ITSUser {
    email: string;
    password: string;
    name: string;
    swCharacterId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    matchesPassword: (password: string) => Promise<boolean>;
}


const userSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        swCharacterId: { type: Number, default: 1 }
    },
    { timestamps: true }
);


userSchema.pre<UserDocument>("save", async function () {
    if (this.isModified("password")) this.password = await hash(this.password, BCRYPT_WORK_FACTOR);
    if (this.isNew) this.swCharacterId = randomFromRange(CHARACTER_MIN_ID, CHARACTER_MAX_ID);
});


userSchema.methods.matchesPassword = function (password: string): Promise<boolean> {
    return compare(password, this.password);
};


userSchema.set("toJSON", {
    transform: (doc, { __v, password, ...rest }, options) => rest
});


export interface UserDocument extends ITSUser, Document { }
export const User = model<UserDocument>("User", userSchema);