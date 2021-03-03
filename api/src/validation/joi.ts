import mongoose from "mongoose";
import joi, { ExtensionFactory, Root, StringSchema, ObjectSchema } from "@hapi/joi";
import { BadRequest } from "../errors";

interface validationError {
    [key: string]: joi.ErrorReport;
}

const objectId: ExtensionFactory = (joi) => ({
    type: "objectId",
    base: joi.string(),
    messages: {
        objectId: '"{#label}" is not a valid ID.'
    },
    validate(value, helpers): validationError | true {
        if (!mongoose.Types.ObjectId.isValid(value)) return { value, errors: helpers.error("objectId") };

        return true;
    }
});

interface ExtendedRoot extends Root {
    objectId(): StringSchema;
}

export const Joi: ExtendedRoot = joi.extend(objectId);

export const validate = async (schema: ObjectSchema, payload: any): Promise<void> => {
    try {
        await schema.validateAsync(payload, { abortEarly: false });
    } catch (err) {
        throw new BadRequest(err);
    }
};
