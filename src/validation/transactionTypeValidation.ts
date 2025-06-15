import Joi from 'joi';

export const createTransactionTypeSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.base': 'Transaction type name must be a string.',
      'string.empty': 'Transaction type name cannot be empty.',
      'string.min': 'Transaction type name should have a minimum length of {#limit} characters.',
      'string.max': 'Transaction type name should have a maximum length of {#limit} characters.',
      'any.required': 'Transaction type name is required.'
    }),
  description: Joi.string()
    .max(500)
    .optional()
    .allow(null, '')
    .messages({
      'string.base': 'Description must be a string.',
      'string.max': 'Description should have a maximum length of {#limit} characters.'
    }),
  isPositiveStockEffect: Joi.boolean()
    .required()
    .messages({
      'boolean.base': 'isPositiveStockEffect must be a boolean (true or false).',
      'any.required': 'isPositiveStockEffect is required.'
    }),
  isPositiveRevenueEffect: Joi.boolean()
    .required()
    .messages({
      'boolean.base': 'isPositiveRevenueEffect must be a boolean (true or false).',
      'any.required': 'isPositiveRevenueEffect is required.'
    }),
});

export const updateTransactionTypeSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  description: Joi.string().max(500).optional().allow(null, ''),
  isPositiveStockEffect: Joi.boolean().optional(),
  isPositiveRevenueEffect: Joi.boolean().optional(),
}).min(1)
  .messages({
    'object.min': 'At least one field must be provided for update.'
  });
