import { Request, Response, NextFunction } from 'express';
import { Schema, ValidationResult } from 'joi';

interface Validator {
    validateBody: (schema: Schema) => (req: Request, res: Response, next: NextFunction) => void;
    validateParam: (schema: Schema) => (req: Request, res: Response, next: NextFunction) => void;
}

const validator: Validator = {
    validateBody: (schema: Schema) => {
        return (req: Request, res: Response, next: NextFunction) => {
            const { error }: ValidationResult = schema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ errors: error.details.map((err) => err.message) });
            }
            next();
        };
    },
    validateParam: (schema: Schema) => {
        return (req: Request, res: Response, next: NextFunction) => {
            const { error }: ValidationResult = schema.validate(req.params, { abortEarly: false });
            if (error) {
                return res.status(400).json({ errors: error.details.map((err) => err.message) });
            }
            next();
        };
    },
};

export default validator;
