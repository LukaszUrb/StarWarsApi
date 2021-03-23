import { compare, hash } from "bcryptjs";
import { createHash, createHmac, timingSafeEqual } from "crypto";
import { Schema, model, Document, Model } from "mongoose";
import { APP_ORIGIN, APP_SECRET, BCRYPT_WORK_FACTOR, EMAIL_VERIFICATION_TIMEOUT } from "../config";
import { CHARACTER_MAX_ID, CHARACTER_MIN_ID } from "../config/starwars";
import { randomFromRange } from "../utils";

export interface IUser {
    email: string;
    password: string;
    name: string;
    verifiedAt?: Date;
    swCharacterId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    matchesPassword: (password: string) => Promise<boolean>;
    verificationUrl: () => string;
}

interface UserModel extends Model<UserDocument> {
    signVerificationUrl: (url: string) => string;
    hasValidVerificationUrl: (path: string, query: any) => boolean;
}

const userSchema = new Schema<UserDocument>(
    {
        email: { type: String, required: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        verifiedAt: { type: Date, default: null },
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

userSchema.methods.verificationUrl = function (): string {
    const
        token = createHash("sha1").update(this.email).digest("hex"),
        expires = Date.now() + EMAIL_VERIFICATION_TIMEOUT,
        url = `${APP_ORIGIN}/user/email/verify?id=${this.id}&token=${token}&expires=${expires}`,
        signature = User.signVerificationUrl(url);

    return `${url}&signature=${signature}`;
};

userSchema.statics.signVerificationUrl = (url: string): string => createHmac("sha256", APP_SECRET).update(url).digest("hex");

userSchema.statics.hasValidVerificationUrl = (path: string, query: any): boolean => {
    const
        signatureFromClickedUrl = query.signature,
        clickedUrl = `${APP_ORIGIN}${path}`,
        queryDataWithoutSignature = clickedUrl.slice(0, clickedUrl.lastIndexOf("&")),
        freshCalculatedSignature = User.signVerificationUrl(queryDataWithoutSignature);

    return timingSafeEqual(Buffer.from(freshCalculatedSignature), Buffer.from(signatureFromClickedUrl)) && +query.expires > Date.now();
};

userSchema.set("toJSON", {
    transform: (doc: UserDocument, { __v, password, ...rest }: { __v: number; password: string; rest: any[] }, options: any) => rest
});

export interface UserDocument extends IUser, Document { }
export const User = model<UserDocument, UserModel>("User", userSchema);
