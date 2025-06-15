import Joi from 'joi';

export const createSupplierSchema = Joi.object({
  name: Joi.string()
    .min(3) // Nama minimal 3 karakter
    .max(255) // Nama maksimal 255 karakter
    .required() // Nama wajib diisi
    .messages({
      'string.base': 'Supplier name must be a string.',
      'string.empty': 'Supplier name cannot be empty.',
      'string.min': 'Supplier name should have a minimum length of {#limit} characters.',
      'string.max': 'Supplier name should have a maximum length of {#limit} characters.',
      'any.required': 'Supplier name is required.'
    }),
  contactPerson: Joi.string()
    .max(255) // Nama kontak maksimal 255 karakter
    .optional() // Opsional
    .allow(null, '') // Izinkan null atau string kosong
    .messages({
      'string.base': 'Contact person must be a string.',
      'string.max': 'Contact person should have a maximum length of {#limit} characters.'
    }),
  phone: Joi.string()
    .max(50) // Nomor telepon maksimal 50 karakter
    .pattern(/^[0-9\-\(\)\+\s]+$/) // Contoh: hanya angka, hyphen, kurung, plus, spasi
    .optional()
    .allow(null, '')
    .messages({
      'string.base': 'Phone number must be a string.',
      'string.max': 'Phone number should have a maximum length of {#limit} characters.',
      'string.pattern.base': 'Phone number contains invalid characters.'
    }),
  email: Joi.string()
    .email() // Format email yang valid
    .max(255) // Email maksimal 255 karakter
    .optional()
    .allow(null, '')
    .messages({
      'string.base': 'Email must be a string.',
      'string.email': 'Email must be a valid email address.',
      'string.max': 'Email should have a maximum length of {#limit} characters.'
    }),
  address: Joi.string()
    .max(1000) // Alamat maksimal 1000 karakter
    .optional()
    .allow(null, '')
    .messages({
      'string.base': 'Address must be a string.',
      'string.max': 'Address should have a maximum length of {#limit} characters.'
    }),
  notes: Joi.string()
    .max(1000) // Catatan maksimal 1000 karakter
    .optional()
    .allow(null, '')
    .messages({
      'string.base': 'Notes must be a string.',
      'string.max': 'Notes should have a maximum length of {#limit} characters.'
    }),
});

export const updateSupplierSchema = Joi.object({
  name: Joi.string().min(3).max(255).optional(),
  contactPerson: Joi.string().max(255).optional().allow(null, ''),
  phone: Joi.string().max(50).pattern(/^[0-9\-\(\)\+\s]+$/).optional().allow(null, ''),
  email: Joi.string().email().max(255).optional().allow(null, ''),
  address: Joi.string().max(1000).optional().allow(null, ''),
  notes: Joi.string().max(1000).optional().allow(null, ''),
}).min(1) // Setidaknya satu field harus ada untuk update
  .messages({
    'object.min': 'At least one field must be provided for update.'
  });
