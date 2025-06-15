import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
      'string.base': 'Product name must be a string.',
      'string.empty': 'Product name cannot be empty.',
      'string.min': 'Product name should have a minimum length of {#limit}.',
      'string.max': 'Product name should have a maximum length of {#limit}.',
      'any.required': 'Product name is required.'
    }),
  description: Joi.string()
    .max(1000)
    .optional()
    .allow(null, '') // Izinkan null atau string kosong
    .messages({
      'string.base': 'Product description must be a string.',
      'string.max': 'Product description should have a maximum length of {#limit}.'
    }),
  stock: Joi.number()
    .integer() // Harus bilangan bulat
    .min(0)
    .required()
    .messages({
      'number.base': 'Stock must be a number.',
      'number.integer': 'Stock must be an integer.',
      'number.min': 'Stock cannot be less than {#limit}.',
      'any.required': 'Stock is required.'
    }),
  imageUrl: Joi.string()
    .uri() // Harus format URL yang valid
    .optional()
    .allow(null, '')
    .messages({
      'string.base': 'Image URL must be a string.',
      'string.uri': 'Image URL must be a valid URL.'
    }),
  category: Joi.string() // ID kategori
    .alphanum() // Hanya huruf dan angka
    .length(24) // Jika ID MongoDB, atau sesuaikan panjang ID MySQL
    .required()
    .messages({
      'string.base': 'Category ID must be a string.',
      'string.empty': 'Category ID cannot be empty.',
      'string.alphanum': 'Category ID must contain only alphanumeric characters.',
      'string.length': 'Category ID must be exactly {#limit} characters long.',
      'any.required': 'Category ID is required.'
    }),
  // Untuk harga, kita menggunakan 'Decimal' di Prisma, tapi di input HTTP sering pakai number
  // Anda harus memastikan konversi/validasi di controller jika perlu BigDecimal library
  // Jika harga selalu sebagai float/number biasa di request, gunakan Joi.number()
  price: Joi.number()
    .precision(2) // Maksimal 2 angka di belakang koma
    .min(0)
    .required()
    .messages({
      'number.base': 'Price must be a number.',
      'number.precision': 'Price can have at most {#limit} decimal places.',
      'number.min': 'Price cannot be less than {#limit}.',
      'any.required': 'Price is required.'
    })
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(255).optional(),
  description: Joi.string().max(1000).optional().allow(null, ''),
  stock: Joi.number().integer().min(0).optional(),
  imageUrl: Joi.string().uri().optional().allow(null, ''),
  category: Joi.string().alphanum().length(24).optional(),
  price: Joi.number().precision(2).min(0).optional()
}).min(1); // Setidaknya satu field harus ada untuk update
