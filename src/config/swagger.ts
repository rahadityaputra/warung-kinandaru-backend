// src/config/swagger.ts
import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Point of Sale (POS) Backend API',
      version: '1.0.0',
      description: 'API documentation for a Point of Sale (POS) backend application, serving web (Next.js) and mobile (Flutter) clients.',
      contact: {
        name: 'Your Name/Team',
        email: 'your.email@example.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api', // Sesuaikan dengan URL backend Anda
        description: 'Development Server'
      },
      // {
      //     url: 'https://api.your-pos-app.com/api',
      //     description: 'Production Server'
      // }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in the format: Bearer <token>'
        }
      },
      schemas: {

        // // ================== AUTH Schemas ==================
        // AuthLoginRequest: {
        //     type: 'object',
        //     required: ['email', 'password'],
        //     properties: {
        //         email: {
        //             type: 'string',
        //             format: 'email',
        //             description: 'User email'
        //         },
        //         password: {
        //             type: 'string',
        //             format: 'password',
        //             description: 'User password (min 6 characters)',
        //             minLength: 6
        //         }
        //     },
        //     example: {
        //         email: 'cashier@example.com',
        //         password: 'password123'
        //     }
        // },
        // AuthRegisterRequest: {
        //     type: 'object',
        //     required: ['name', 'email', 'password'],
        //     properties: {
        //         name: {
        //             type: 'string',
        //             description: 'User full name'
        //         },
        //         email: {
        //             type: 'string',
        //             format: 'email',
        //             description: 'User email'
        //         },
        //         password: {
        //             type: 'string',
        //             format: 'password',
        //             description: 'User password (min 6 characters)',
        //             minLength: 6
        //         },
        //         role: {
        //             type: 'string',
        //             description: 'User role (e.g., admin, cashier)',
        //             enum: ['admin', 'cashier'], // Sesuaikan dengan role Anda
        //             default: 'cashier'
        //         }
        //     },
        //     example: {
        //         name: 'Kasir Utama',
        //         email: 'cashier@example.com',
        //         password: 'password123',
        //         role: 'cashier'
        //     }
        // },
        // AuthResponse: {
        //     type: 'object',
        //     properties: {
        //         token: {
        //             type: 'string',
        //             description: 'JWT authentication token'
        //         }
        //     },
        //     example: {
        //         token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2OTI5N2RkNDcxNTNhY2I3YzA5OGZmIn0sImlhdCI6MTcxODE4NTA1MywiZXhwIjoxNzE4MTg4NjUzfQ.someRandomHash'
        //     }
        // },
        // User: {
        //     type: 'object',
        //     properties: {
        //         _id: { type: 'string', description: 'User ID' },
        //         name: { type: 'string', description: 'User full name' },
        //         email: { type: 'string', format: 'email', description: 'User email' },
        //         role: { type: 'string', description: 'User role' },
        //         date: { type: 'string', format: 'date-time', description: 'Registration date' }
        //     },
        //     example: {
        //         _id: '6669297dd47153acb7c098ff',
        //         name: 'Kasir Utama',
        //         email: 'cashier@example.com',
        //         role: 'cashier',
        //         date: '2024-06-12T07:10:00.000Z'
        //     }
        // },

        // ================== PRODUCT Schemas ==================

        Product: {
          type: 'object',
          required: ['name', 'price', 'stock', 'category'],
          properties: {
            _id: { type: 'string', description: 'Product ID' },
            name: { type: 'string', description: 'Product name', minLength: 3 },
            description: { type: 'string', description: 'Product description', nullable: true },
            price: { $ref: '#/components/schemas/ProductPriceHistoryRef', minimum: 0 },
            stock: { type: 'integer', description: 'Current stock quantity', minimum: 0 },
            imageUrl: { type: 'string', format: 'url', description: 'URL of the product image', nullable: true },
            category: { $ref: '#/components/schemas/CategoryRef' }, // Referensi ke Category
            date: { type: 'string', format: 'date-time', description: 'Date of product creation' },
            discount: {
              type: 'number',
              format: 'float',
              description: 'Discount applied to this item (e.g., in percentage like 0.10 for 10% or fixed amount).',
              minimum: 0,
              nullable: true // Diskon bisa jadi tidak selalu ada
            },
          },
          example: {
            _id: '66692b2f9b1d8e001c8c8c8d',
            name: 'Nasi Goreng Spesial',
            description: 'Nasi goreng dengan telur, ayam, dan kerupuk',
            price: {
              _id: '66692b2f9b1d8e001c8c8c8e',
              price: 20000
            },
            stock: 50,
            imageUrl: 'https://example.com/nasgor.jpg',
            category: {
              _id: '66692b2f9b1d8e001c8c8c8e',
              name: 'Food'
            },
            date: '2024-06-12T07:30:00.000Z',
            discount: 0.10
          }
        },
        ProductInput: { // Untuk POST/PUT request body
          type: 'object',
          required: ['name', 'price', 'stock', 'category'],
          properties: {
            name: { type: 'string', description: 'Product name', minLength: 3 },
            description: { type: 'string', description: 'Product description', nullable: true },
            price: { type: 'number', format: 'float', description: 'Product price', minimum: 0 },
            stock: { type: 'integer', description: 'Current stock quantity', minimum: 0 },
            imageUrl: { type: 'string', format: 'url', description: 'URL of the product image', nullable: true },
            category: { type: 'string', description: 'Category ID of the product' },
            discount: {
              type: 'number',
              format: 'float',
              description: 'Discount applied to this item (e.g., in percentage like 0.10 for 10% or fixed amount).',
              minimum: 0,
              nullable: true // Diskon bisa jadi tidak selalu ada
            },
          },
          example: {
            name: 'Nasi Goreng Spesial',
            description: 'Nasi goreng dengan telur, ayam, dan kerupuk',
            price: 25000,
            stock: 50,
            imageUrl: 'https://example.com/nasgor.jpg',
            category: '66692b2f9b1d8e001c8c8c8e',
            discount: 0.10
          }
        },

        ProductRef: { // Untuk referensi produk di item transaksi
          type: 'object',
          properties: {
            _id: { type: 'string', description: 'Product ID' },
            name: { type: 'string', description: 'Product name' }
          },
          example: {
            _id: '66692b2f9b1d8e001c8c8c8d',
            name: 'Nasi Goreng Spesial'
          }
        },

        // ================== CATEGORY Schemas ==================
        Category: {
          type: 'object',
          required: ['name'],
          properties: {
            _id: { type: 'string', description: 'Category ID' },
            name: { type: 'string', description: 'Category name', unique: true },
            date: { type: 'string', format: 'date-time', description: 'Date of category creation' },
            description: { type: 'string', description: 'Category description', nullable: true },
          },
          example: {
            _id: '66692b2f9b1d8e001c8c8c8e',
            name: 'Food',
            description: 'Makanan berat dan ringan',
            date: '2024-06-12T07:20:00.000Z'
          }
        },

        CategoryInput: { // Untuk POST/PUT request body
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', description: 'Category name', unique: true },
            description: { type: 'string', description: 'Category description', nullable: true },
          },
          example: {
            name: 'Minuman',
            description: "Minuman dingin"
          }
        },

        CategoryRef: { // Untuk referensi kategori di Product
          type: 'object',
          properties: {
            _id: { type: 'string', description: 'Category ID' },
            name: { type: 'string', description: 'Category name' }
          },
          example: {
            _id: '66692b2f9b1d8e001c8c8c8e',
            name: 'Food'
          }
        },

        // ================== Product Price History Schemas ==================
        ProductPriceHistory: {
          type: 'object',
          required: ['price'],
          properties: {
            _id: { type: 'string', description: 'Category ID' },
            price: { type: 'number', format: 'float', description: 'Price of the product' },
            startDate: { type: 'string', format: 'date-time', description: 'Date of price creation' },
            endDate: { type: 'string', format: 'date-time', description: 'The date and time when this price ceased to be effective (null if current)' }
          },
          example: {
            _id: '66692b2f9b1d8e001c8c8c8e',
            price: 10000,
            startDate: '2024-06-12T07:20:00.000Z',
            endDate: '2024-06-12T07:20:00.000Z'
          }
        },
        ProductPriceHistoryInput: { // Untuk POST/PUT request body
          type: 'object',
          required: ['price'],
          properties: {
            price: { type: 'number', format: 'float', description: 'Price of the product' },
            startDate: { type: 'string', format: 'date-time', description: 'Date of price creation' },
            endDate: { type: 'string', format: 'date-time', description: 'The date and time when this price ceased to be effective (null if current)' }
          },
          example: {
            price: 20000,
            startDate: '2024-06-12T07:20:00.000Z',
            endDate: '2024-06-12T07:20:00.000Z'
          }
        },

        ProductPriceHistoryRef: { // Untuk referensi history harga di Product
          type: 'object',
          properties: {
            _id: { type: 'string', description: 'ProductPriceHistory ID' },
            price: { type: 'string', description: 'ProductPriceHistory price' }
          },
          example: {
            _id: '66692b2f9b1d8e001c8c8c8e',
            name: '20000'
          }
        },



        // ================== Supplier Schemas ==================

        Supplier: {
          type: 'object',
          required: ['name'],
          properties: {
            _id: { type: 'string', description: 'The auto-generated ID of the supplier' },
            name: { type: 'string', description: 'The name of the supplier/vendor' },
            contactPerson: { type: 'string', description: 'Name of the primary contact person at the supplier', nullable: true },
            phone: { type: 'string', description: 'Contact phone number of the supplier', nullable: true },
            email: { type: 'string', format: 'email', description: 'Contact email of the supplier', nullable: true },
            address: { type: 'string', description: 'Full address of the supplier', nullable: true },
            notes: { type: 'string', description: 'Any additional notes about the supplier', nullable: true },
            createdAt: { type: 'string', format: 'date-time', description: 'Date when the supplier was added' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Date when the supplier information was last updated' }
          },
          example: {
            _id: "60c72b2f9b1d8e001c8c8d01",
            name: "PT. Maju Bersama Distributor",
            contactPerson: "Budi Santoso",
            phone: "+6281234567890",
            email: "info@majubersama.com",
            address: "Jl. Raya Industri No. 123, Jakarta",
            createdAt: "2024-05-15T10:00:00.000Z",
            updatedAt: "2024-05-15T10:00:00.000Z"
          }
        },
        SupplierRef: {
          type: 'object',
          properties: {
            _id: { type: 'string', description: 'Supplier ID' },
            name: { type: 'string', description: 'Supplier name' }
          },
          example: {
            _id: '60c72b2f9b1d8e001c8c8d01',
            name: 'PT. Maju Bersama Distributor'
          }
        },

        ProductSupplier: {
          type: 'object',
          required: ['product', 'supplier', 'unitCost'],
          properties: {
            _id: { type: 'string', description: 'The auto-generated ID of the product-supplier link' },
            product: { $ref: '#/components/schemas/ProductRef' },
            supplier: { $ref: '#/components/schemas/SupplierRef' },
            supplierSku: { type: 'string', description: 'The SKU or item number of the product as used by the supplier', nullable: true },
            unitCost: {
              type: 'number',
              format: 'float',
              description: 'The cost of purchasing this product from this specific supplier',
              minimum: 0
            },
            minOrderQuantity: { type: 'integer', description: 'Minimum order quantity for this product from this supplier', minimum: 1, nullable: true },
            leadTimeDays: { type: 'integer', description: 'Estimated lead time for delivery in days from this supplier', minimum: 0, nullable: true },
            lastPurchasedAt: { type: 'string', format: 'date-time', description: 'The last date this product was purchased from this supplier', nullable: true },
            createdAt: { type: 'string', format: 'date-time', description: 'Date when this product-supplier link was created' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Date when this product-supplier link was last updated' }
          },
          example: {
            _id: "60c72b2f9b1d8e001c8c8d02",
            product: { _id: "66692b2f9b1d8e001c8c8c8d", name: "Nasi Goreng Spesial" },
            supplier: { _id: "60c72b2f9b1d8e001c8c8d01", name: "PT. Maju Bersama Distributor" },
            supplierSku: "NSG-001-MB",
            unitCost: 15000,
            minOrderQuantity: 10,
            leadTimeDays: 3,
            lastPurchasedAt: "2024-06-10T09:00:00.000Z",
            createdAt: "2024-05-20T11:00:00.000Z",
            updatedAt: "2024-06-10T09:00:00.000Z"
          }
        },

        // --- Tambahkan juga skema input untuk ProductSupplier (untuk POST/PUT) ---
        ProductSupplierInput: {
          type: 'object',
          required: ['productId', 'supplierId', 'unitCost'],
          properties: {
            productId: {
              type: 'string',
              description: 'ID of the product to link'
            },
            supplierId: {
              type: 'string',
              description: 'ID of the supplier to link'
            },
            supplierSku: {
              type: 'string',
              description: 'The SKU or item number of the product as used by the supplier',
              nullable: true
            },
            unitCost: {
              type: 'number',
              format: 'float',
              description: 'The cost of purchasing this product from this specific supplier',
              minimum: 0
            },
            minOrderQuantity: {
              type: 'integer',
              description: 'Minimum order quantity for this product from this supplier',
              minimum: 1,
              nullable: true
            },
            leadTimeDays: {
              type: 'integer',
              description: 'Estimated lead time for delivery in days from this supplier',
              minimum: 0,
              nullable: true
            }
          },
          example: {
            productId: "66692b2f9b1d8e001c8c8c8d",
            supplierId: "60c72b2f9b1d8e001c8c8d01",
            supplierSku: "NSG-001-MB",
            unitCost: 15000,
            minOrderQuantity: 10,
            leadTimeDays: 3
          }
        },


        // ================== TRANSACTION TYPE Schemas ==================

        TransactionType: {
          type: 'object',
          required: ['name', 'description'],
          properties: {
            _id: { type: 'string', description: 'Transaction Type ID' }, // Untuk MySQL, ini bisa 'id' (integer), tapi di API sering string
            name: { type: 'string', description: 'Name of the transaction type (e.g., Sale, Return, Cancellation)', unique: true },
            description: { type: 'string', description: 'Brief description of the transaction type', nullable: true },
            createdAt: { type: 'string', format: 'date-time', description: 'Date when the transaction type was created' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Date when the transaction type was last updated' }
          },
          example: {
            _id: '1', // Contoh ID untuk MySQL
            name: 'Sale',
            description: 'Regular product sale',
            createdAt: '2024-06-14T08:00:00.000Z',
            updatedAt: '2024-06-14T08:00:00.000Z'
          }
        },
        TransactionTypeRef: { // Untuk referensi di skema lain
          type: 'object',
          properties: {
            _id: { type: 'string', description: 'Transaction Type ID' },
            name: { type: 'string', description: 'Transaction Type Name' }
          },
          example: {
            _id: '1',
            name: 'Sale'
          }
        },

        TransactionTypeInput: { // Untuk POST/PUT request body
          type: 'object',
          required: ['name', 'description'],
          properties: {
            name: { type: 'string', description: 'Name of the transaction type (e.g., Sale, Return, Cancellation)', unique: true },
            description: { type: 'string', description: 'Brief description of the transaction type', nullable: true },
          },
          example: {
            name: 'Return',
            description: 'Product return from customer',
          }
        },

        // ================== TRANSACTION Schemas ==================
        Transaction: {
          type: 'object',
          required: ['items', 'totalAmount', 'paymentMethod'],
          properties: {
            _id: { type: 'string', description: 'Transaction ID' },
            transactionId: { type: 'string', description: 'Unique transaction ID (e.g., INV-20240612-001)' },
            transactionTypeId: { type: 'string', description: 'Transaction Type ID' },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/TransactionItem'
              },
              description: 'List of products in the transaction'
            },
            totalAmount: { type: 'number', format: 'float', description: 'Total amount of the transaction' },
            paymentMethod: { type: 'string', enum: ['Cash', 'Card', 'QRIS'], description: 'Payment method used' },
            amountPaid: { type: 'number', format: 'float', description: 'Amount paid by customer', minimum: 0 },
            changeDue: { type: 'number', format: 'float', description: 'Change given to customer', minimum: 0 },
            status: { type: 'string', enum: ['Completed', 'Pending', 'Cancelled'], default: 'Completed', description: 'Transaction status' },
            date: { type: 'string', format: 'date-time', description: 'Date and time of the transaction' }
          },
          example: {
            _id: '66692b2f9b1d8e001c8c8c9a',
            transactionId: 'INV-20240612-001',// kenapa ada ini
            transactionTypeId: '6669b34234',
            items: [
              {
                product: { _id: '66692b2f9b1d8e001c8c8c8d', name: 'Nasi Goreng Spesial' },
                quantity: 1,
                price: 25000,
                subtotal: 25000
              },
              {
                product: { _id: '66692b2f9b1d8e001c8c8c90', name: 'Es Teh Manis' },
                quantity: 2,
                price: 5000,
                subtotal: 10000
              }
            ],
            totalAmount: 35000,
            paymentMethod: 'Cash',
            amountPaid: 40000,
            changeDue: 5000,
            status: 'Completed',
            cashier: {
              _id: '6669297dd47153acb7c098ff',
              name: 'Kasir Utama'
            },
            date: '2024-06-12T07:45:00.000Z'
          }
        },

        TransactionItem: {
          type: 'object',
          required: ['product', 'quantity', 'price', 'subtotal'],
          properties: {
            product: { $ref: '#/components/schemas/ProductRef' }, // Referensi ke produk
            quantity: { type: 'integer', description: 'Quantity of the product', minimum: 1 },
            price: { $ref: '#/conponents/schemas/ProductPriceHistoryRef' },
            subtotal: { type: 'number', format: 'float', description: 'Subtotal for this item (quantity * price)' }
          },
          example: {
            product: { _id: '66692b2f9b1d8e001c8c8c8d', name: 'Nasi Goreng Spesial' },
            quantity: 1,
            price: {
              _id: '66692b2f9b1d8e001c8c8c8d',
              price: 25000
            },
            subtotal: 25000
          }
        },

        TransactionInput: { // Untuk POST request body transaksi
          type: 'object',
          required: ['items', 'totalAmount', 'paymentMethod', 'amountPaid', 'transactionTypeId'],
          properties: {
            items: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'object',
                required: ['productId', 'quantity'],
                  productId: { type: 'string', description: 'ID of the product' },
                properties: {
                  quantity: { type: 'integer', description: 'Quantity purchased', minimum: 1 }
                }
              }
            },
            totalAmount: { type: 'number', format: 'float', description: 'Total amount of the transaction (calculated by backend)' },
            paymentMethod: { type: 'string', enum: ['Cash', 'Card', 'QRIS'], description: 'Payment method used' },
            amountPaid: { type: 'number', format: 'float', description: 'Amount paid by customer', minimum: 0 },
            transactionTypeId: { type: 'string', description: 'Transaction Type ID' },
          },
          example: {
            items: [
              { productId: '66692b2f9b1d8e001c8c8c8d', quantity: 1 },
              { productId: '66692b2f9b1d8e001c8c8c90', quantity: 2 }
            ],
            totalAmount: 35000,
            paymentMethod: 'Cash',
            amountPaid: 40000
          }
        },

        // UserRef: { // Untuk referensi pengguna (kasir)
        //   type: 'object',
        //   properties: {
        //     _id: { type: 'string', description: 'User ID' },
        //     name: { type: 'string', description: 'User name' }
        //   },
        //   example: {
        //     _id: '6669297dd47153acb7c098ff',
        //     name: 'Kasir Utama'
        //   }
        // },

        // ================== COMMON Responses ==================
        ErrorResponse: {
          type: 'object',
          properties: {
            msg: { type: 'string', description: 'Error message' }
          },
          example: {
            msg: 'Resource not found'
          }
        }
      },
    },
    security: [ // Global security, can be overridden by individual paths
      {
        BearerAuth: []
      }
    ]
  },
  apis: [
    '../routes/*.ts',
    '../models/*.ts',// Termasuk ini untuk skema yang didefinisikan di komentar mode
    '../routes/*.js',
    '../models/*.js' // Termasuk ini untuk skema yang didefinisikan di komentar model
  ],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
export default swaggerSpec;

