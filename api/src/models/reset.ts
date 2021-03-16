import { Schema, Document, Model, model } from "mongoose";
import { randomBytes, createHmac, timingSafeEqual } from "crypto";
import { PASSWORD_RESET_BYTES, APP_SECRET, PASSWORD_RESET_TIMEOUT, APP_ORIGIN } from "../config";
import { UserDocument } from "./user";

interface PasswordResetDocument extends Document {
    user: string | UserDocument;
    token: string;
    expiredAt: Date;
    url: (plaintextToken: string) => string;
    isValid: (plaintextToken: string) => boolean;
}

interface PasswordResetModel extends Model<PasswordResetDocument> {
    plaintextToken: () => string;
    hashedToken: (plaintextToken: string) => string;
}

const passwordResetSchema = new Schema<PasswordResetDocument>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        token: { type: String, required: true },
        expiredAt: { type: Date }
    },
    { timestamps: true }
);

passwordResetSchema.pre<PasswordResetDocument>("save", function () {
    if (this.isModified("token")) this.token = PasswordReset.hashedToken(this.token);

    if (!this.expiredAt) this.expiredAt = new Date(new Date().getTime() + PASSWORD_RESET_TIMEOUT);
});

passwordResetSchema.methods.url = function (plaintextToken: string): string {
    return `${APP_ORIGIN}/user/password/submit?id=${this.id}&token=${plaintextToken}`;
};

passwordResetSchema.methods.isValid = function (plaintextToken: string): boolean {
    const hash = PasswordReset.hashedToken(plaintextToken);

    return timingSafeEqual(Buffer.from(hash), Buffer.from(this.token)) && this.expiredAt > new Date();
};

passwordResetSchema.statics.plaintextToken = (): string => {
    return randomBytes(PASSWORD_RESET_BYTES).toString("hex");
};

passwordResetSchema.statics.hashedToken = (plaintextToken: string): string => {
    return createHmac("sha256", APP_SECRET).update(plaintextToken).digest("hex");
};

export const PasswordReset = model<PasswordResetDocument, PasswordResetModel>("PasswordReset", passwordResetSchema);
