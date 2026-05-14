import Joi from "joi";

export interface AuthRequest {
  phone: string;
  password: string;
}

const authSchema = {
  login: Joi.object<AuthRequest>({
    phone: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required()
      .messages({
        "string.pattern.base": "Phone number must be 10 to 15 digits",
        "string.empty": "Phone number is required",
        "any.required": "Phone number is required",
      }),
    password: Joi.string().min(6).max(255).required(),
  }),
};

export default authSchema;
