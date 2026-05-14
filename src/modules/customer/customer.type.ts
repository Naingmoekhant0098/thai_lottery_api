import Joi from "joi";

export interface Customer {
    name: string;
    phone: string;
    address?: string;
}

const customerSchema = {
    create: Joi.object<Customer>({
        name: Joi.string().min(3).max(100).required(),
        phone: Joi.string()
            .pattern(/^[0-9]{10,15}$/)
            .required(),
        address: Joi.string().max(255).optional(),
    }),
    update: Joi.object<Customer>({
        name: Joi.string().min(3).max(100).optional(),
        phone: Joi.string()
            .pattern(/^[0-9]{10,15}$/)
            .optional(),
        address: Joi.string().max(255).optional(),
    }),
};

export default customerSchema;
