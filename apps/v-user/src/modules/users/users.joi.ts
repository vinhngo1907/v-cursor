import * as Joi from "joi";

export const loginJoi = Joi.object({
    login: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
});