import { compare, hash } from "bcryptjs";
import { Schema, model, Document } from "mongoose";
import { BCRYPT_WORK_FACTOR } from "../config";

export interface ITSUser {
    email: string;
    password: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    matchesPassword: (password: string) => Promise<boolean>;
}


const userSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
    },
    { timestamps: true }
);


userSchema.pre<UserDocument>("save", async function () {
    if (this.isModified("password")) this.password = await hash(this.password, BCRYPT_WORK_FACTOR);
});


userSchema.methods.matchesPassword = function (password: string): Promise<boolean> {
    return compare(password, this.password);
};


userSchema.set("toJSON", {
    transform: (doc, { __v, password, ...rest }, options) => rest
});


export interface UserDocument extends ITSUser, Document { }
export const User = model<UserDocument>("User", userSchema);