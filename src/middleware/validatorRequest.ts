import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validate = (schema: Joi.ObjectSchema, source: 'body' | 'query' | 'params' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[source], { abortEarly: false, allowUnknown: false });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.context?.key,
        message: detail.message.replace(/['"]/g, '')
      }));
      return res.status(400).json({
        msg: 'Validation failed',
        errors: errors
      });
    }

    req[source] = value;
    next();
  };

export default validate;
