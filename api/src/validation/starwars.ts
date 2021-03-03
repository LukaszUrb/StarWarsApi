import Joi from "@hapi/joi";

export const numberIdValidSchema = Joi.object({
    id: Joi.number().required()
});
