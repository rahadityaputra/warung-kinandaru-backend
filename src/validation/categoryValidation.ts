import Joi from 'joi';

export const createCategorySchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.base': 'Category name must be a string.',
      'string.empty': 'Category name cannot be empty.',
      'string.min': 'Category name should have a minimum length of {#limit} characters.',
      'string.max': 'Category name should have a maximum length of {#limit} characters.',
      'any.required': 'Category name is required.'
    }),
  description: Joi.string()
    .max(500)
    .optional()
    .allow(null, '')
    .messages({
      'string.base': 'Category description must be a string.',
      'string.max': 'Category description should have a maximum length of {#limit} characters.'
    }),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  description: Joi.string().max(500).optional().allow(null, ''),
}).min(1)
  .messages({
    'object.min': 'At least one field must be provided for update.'
  });
