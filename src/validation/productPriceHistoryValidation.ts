import Joi from 'joi';


export const addProductPriceEntrySchema = Joi.object({
  price: Joi.number()
    .precision(2) // Memastikan harga memiliki maksimal 2 angka di belakang koma (untuk Rupiah/Dolar)
    .min(0)       // Memastikan harga tidak negatif
    .required()    // Harga adalah wajib
    .messages({
      'number.base': 'Price must be a number.',
      'number.precision': 'Price can have at most {#limit} decimal places.',
      'number.min': 'Price cannot be less than {#limit}.',
      'any.required': 'Price is required.'
    })
});

export const getProductPriceHistorySchema = Joi.object({
  limit: Joi.number()
    .integer() // Harus bilangan bulat
    .min(1)    // Minimal 1
    .default(10) // Nilai default jika tidak disediakan
    .optional(), // Opsional
  page: Joi.number()
    .integer() // Harus bilangan bulat
    .min(1)    // Minimal 1
    .default(1) // Nilai default jika tidak disediakan
    .optional(), // Opsional
});
