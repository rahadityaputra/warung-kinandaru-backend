
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
        url: 'http://localhost:3000/api-docs',
        description: 'Development Server'
      },




    ],
    components: {
      schemas: {


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
            category: { $ref: '#/components/schemas/CategoryRef' },
            date: { type: 'string', format: 'date-time', description: 'Date of product creation' },
            discount: {
              type: 'number',
              format: 'float',
              description: 'Discount applied to this item (e.g., in percentage like 0.10 for 10% or fixed amount).',
              minimum: 0,
              nullable: true
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
            imageUrl: 'https:image.com',
            category: {
              _id: '66692b2f9b1d8e001c8c8c8e',
              name: 'Food'
            },
            date: '2024-06-12T07:30:00.000Z',
            discount: 0.10
          }
        },
        ProductInput: {
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
              nullable: true
            },
          },
          example: {
            name: 'Nasi Goreng Spesial',
            description: 'Nasi goreng dengan telur, ayam, dan kerupuk',
            price: 25000,
            stock: 50,
            imageUrl: 'https://image.com',
            category: '66692b2f9b1d8e001c8c8c8e',
            discount: 0.10
          }
        },

        ProductRef: {
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

        CategoryInput: {
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

        CategoryRef: {
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
        ProductPriceHistoryInput: {
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

        ProductPriceHistoryRef: {
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




        TransactionType: {
          type: 'object',
          required: ['name', 'description'],
          properties: {
            _id: { type: 'string', description: 'Transaction Type ID' },
            name: { type: 'string', description: 'Name of the transaction type (e.g., Sale, Return, Cancellation)', unique: true },
            description: { type: 'string', description: 'Brief description of the transaction type', nullable: true },
            createdAt: { type: 'string', format: 'date-time', description: 'Date when the transaction type was created' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Date when the transaction type was last updated' }
          },
          example: {
            _id: '1',
            name: 'Sale',
            description: 'Regular product sale',
            createdAt: '2024-06-14T08:00:00.000Z',
            updatedAt: '2024-06-14T08:00:00.000Z'
          }
        },
        TransactionTypeRef: {
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

        TransactionTypeInput: {
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
            transactionId: 'INV-20240612-001',
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
            product: { $ref: '#/components/schemas/ProductRef' },
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

        TransactionInput: {
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


    paths: {
      '/products': {
        get: {
          summary: 'Get all products with optional filtering, search, and pagination',
          tags: ['Products'],
          parameters: [
            { in: 'query', name: 'category', schema: { type: 'string' }, description: 'Filter products by category name' },
            { in: 'query', name: 'search', schema: { type: 'string' }, description: 'Search products by name or description' },
            { in: 'query', name: 'limit', schema: { type: 'integer', default: 10 }, description: 'Number of products to return per page' },
            { in: 'query', name: 'page', schema: { type: 'integer', default: 1 }, description: 'Page number' }
          ],
          responses: {
            '200': {
              description: 'List of products',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      products: { type: 'array', items: { $ref: '#/components/schemas/Product' } },
                      total: { type: 'integer' },
                      page: { type: 'integer' },
                      pages: { type: 'integer' }
                    }
                  }
                }
              }
            },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        post: {
          summary: 'Create a new product',
          tags: ['Products'],
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ProductInput' }
              }
            }
          },
          responses: {
            '201': { description: 'Product created successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
            '400': { description: 'Invalid input or product with name already exists', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }
      },
      '/products/{id}': {
        get: {
          summary: 'Get product by ID',
          tags: ['Products'],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: 'The product ID' }],
          responses: {
            '200': { description: 'Product data', content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
            '400': { description: 'Invalid Product ID format', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Product not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        put: {
          summary: 'Update a product by ID',
          tags: ['Products'],
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: 'The product ID' }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ProductInput' }
              }
            }
          },
          responses: {
            '200': { description: 'Product updated successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
            '400': { description: 'Invalid Product ID or invalid input', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Product not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        delete: {
          summary: 'Delete a product by ID',
          tags: ['Products'],
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: 'The product ID' }],
          responses: {
            '200': { description: 'Product removed successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '400': { description: 'Invalid Product ID format', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Product not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }
      },

      '/products/{productId}/price-history': {
        get: {
          summary: 'Get price history for a product',
          tags: ['Product Price History', 'Products'],
          parameters: [
            { in: 'path', name: 'productId', schema: { type: 'string' }, required: true, description: 'The product ID' },
            { in: 'query', name: 'limit', schema: { type: 'integer', default: 10 }, description: 'Number of history entries to return' },
            { in: 'query', name: 'page', schema: { type: 'integer', default: 1 }, description: 'Page number' }
          ],
          responses: {
            '200': { description: 'List of price history entries', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/ProductPriceHistory' } } } } },
            '400': { description: 'Invalid Product ID format', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Product not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        post: {
          summary: 'Add a new price history entry for a product (update product price)',
          tags: ['Product Price History', 'Products'],
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'productId', schema: { type: 'string' }, required: true, description: 'The product ID' }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['price'],
                  properties: {
                    price: { type: 'number', format: 'float', description: 'The new price for the product' }
                  }
                }
              }
            }
          },
          responses: {
            '201': { description: 'New price history entry created', content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductPriceHistory' } } } },
            '400': { description: 'Invalid Product ID or invalid input', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Product not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }
      },





      '/categories': {
        get: {
          summary: 'Get all categories',
          tags: ['Categories'],
          responses: {
            '200': { description: 'List of categories', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Category' } } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        post: {
          summary: 'Create a new category',
          tags: ['Categories'],
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CategoryInput' }
              }
            }
          },
          responses: {
            '201': { description: 'Category created successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/Category' } } } },
            '400': { description: 'Invalid input or category with name already exists', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }
      },
      '/categories/{id}': {
        get: {
          summary: 'Get category by ID',
          tags: ['Categories'],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: 'The category ID' }],
          responses: {
            '200': { description: 'Category data', content: { 'application/json': { schema: { $ref: '#/components/schemas/Category' } } } },
            '400': { description: 'Invalid Category ID format', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Category not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        put: {
          summary: 'Update a category by ID',
          tags: ['Categories'],
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: 'The category ID' }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CategoryInput' }
              }
            }
          },
          responses: {
            '200': { description: 'Category updated successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/Category' } } } },
            '400': { description: 'Invalid Category ID or invalid input', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Category not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        delete: {
          summary: 'Delete a category by ID',
          tags: ['Categories'],
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: 'The category ID' }],
          responses: {
            '200': { description: 'Category removed successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '400': { description: 'Invalid Category ID format', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Category not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }
      },





      '/suppliers': {
        get: {
          summary: 'Get all suppliers',
          tags: ['Suppliers'],
          security: [{ BearerAuth: [] }],
          responses: {
            '200': { description: 'List of suppliers', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Supplier' } } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        post: {
          summary: 'Create a new supplier',
          tags: ['Suppliers'],
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string' },
                    contactPerson: { type: 'string', nullable: true },
                    phone: { type: 'string', nullable: true },
                    email: { type: 'string', format: 'email', nullable: true },
                    address: { type: 'string', nullable: true },
                    notes: { type: 'string', nullable: true }
                  }
                }
              }
            }
          },
          responses: {
            '201': { description: 'Supplier created successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/Supplier' } } } },
            '400': { description: 'Invalid input or supplier name already exists', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }
      },
      '/suppliers/{id}': {
        get: {
          summary: 'Get supplier by ID',
          tags: ['Suppliers'],
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: 'The supplier ID' }],
          responses: {
            '200': { description: 'Supplier data', content: { 'application/json': { schema: { $ref: '#/components/schemas/Supplier' } } } },
            '404': { description: 'Supplier not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        put: {
          summary: 'Update a supplier by ID',
          tags: ['Suppliers'],
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: 'The supplier ID' }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    contactPerson: { type: 'string', nullable: true },
                    phone: { type: 'string', nullable: true },
                    email: { type: 'string', format: 'email', nullable: true },
                    address: { type: 'string', nullable: true },
                    notes: { type: 'string', nullable: true }
                  }
                }
              }
            }
          },
          responses: {
            '200': { description: 'Supplier updated successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/Supplier' } } } },
            '400': { description: 'Invalid input', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Supplier not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        delete: {
          summary: 'Delete a supplier by ID',
          tags: ['Suppliers'],
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: 'The supplier ID' }],
          responses: {
            '200': { description: 'Supplier removed successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '400': { description: 'Invalid Supplier ID format', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Supplier not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }
      },





      '/products/{productId}/suppliers': {
        get: {
          summary: 'Get all suppliers linked to a specific product',
          tags: ['Product Suppliers', 'Products'],
          security: [{ BearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'productId', schema: { type: 'string' }, required: true, description: 'The product ID' }
          ],
          responses: {
            '200': { description: 'List of product-supplier links', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/ProductSupplier' } } } } },
            '404': { description: 'Product not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        post: {
          summary: 'Link a supplier to a product (e.g., set purchasing cost)',
          tags: ['Product Suppliers', 'Products'],
          security: [{ BearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'productId', schema: { type: 'string' }, required: true, description: 'The product ID' }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ProductSupplierInput' }
              }
            }
          },
          responses: {
            '201': { description: 'Supplier linked to product successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductSupplier' } } } },
            '400': { description: 'Invalid input or supplier already linked to product', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Product or Supplier not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }
      },
      '/products/{productId}/suppliers/{supplierId}': {
        get: {
          summary: 'Get details of a specific supplier link for a product',
          tags: ['Product Suppliers', 'Products'],
          security: [{ BearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'productId', schema: { type: 'string' }, required: true, description: 'The product ID' },
            { in: 'path', name: 'supplierId', schema: { type: 'string' }, required: true, description: 'The supplier ID' }
          ],
          responses: {
            '200': { description: 'Product-supplier link data', content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductSupplier' } } } },
            '404': { description: 'Product-supplier link not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        put: {
          summary: 'Update supplier link details for a product',
          tags: ['Product Suppliers', 'Products'],
          security: [{ BearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'productId', schema: { type: 'string' }, required: true, description: 'The product ID' },
            { in: 'path', name: 'supplierId', schema: { type: 'string' }, required: true, description: 'The supplier ID' }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    supplierSku: { type: 'string', nullable: true },
                    unitCost: { type: 'number', format: 'float', nullable: true },
                    minOrderQuantity: { type: 'integer', nullable: true },
                    leadTimeDays: { type: 'integer', nullable: true }
                  }
                }
              }
            }
          },
          responses: {
            '200': { description: 'Product-supplier link updated successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductSupplier' } } } },
            '400': { description: 'Invalid input', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Product-supplier link not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        delete: {
          summary: 'Remove a supplier link from a product',
          tags: ['Product Suppliers', 'Products'],
          security: [{ BearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'productId', schema: { type: 'string' }, required: true, description: 'The product ID' },
            { in: 'path', name: 'supplierId', schema: { type: 'string' }, required: true, description: 'The supplier ID' }
          ],
          responses: {
            '200': { description: 'Product-supplier link removed successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Product-supplier link not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }
      },





      '/transaction-types': {
        get: {
          summary: 'Get all transaction types',
          tags: ['Transaction Types'],
          security: [{ BearerAuth: [] }],
          responses: {
            '200': { description: 'List of transaction types', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/TransactionType' } } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        post: {
          summary: 'Create a new transaction type',
          tags: ['Transaction Types'],
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/TransactionTypeInput' }
              }
            }
          },
          responses: {
            '201': { description: 'Transaction type created successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/TransactionType' } } } },
            '400': { description: 'Invalid input or transaction type name already exists', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }
      },
      '/transaction-types/{id}': {
        get: {
          summary: 'Get transaction type by ID',
          tags: ['Transaction Types'],
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: 'The transaction type ID' }],
          responses: {
            '200': { description: 'Transaction type data', content: { 'application/json': { schema: { $ref: '#/components/schemas/TransactionType' } } } },
            '404': { description: 'Transaction type not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        put: {
          summary: 'Update a transaction type by ID',
          tags: ['Transaction Types'],
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: 'The transaction type ID' }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/TransactionTypeInput' }
              }
            }
          },
          responses: {
            '200': { description: 'Transaction type updated successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/TransactionType' } } } },
            '400': { description: 'Invalid input', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Transaction type not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        delete: {
          summary: 'Delete a transaction type by ID',
          tags: ['Transaction Types'],
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: 'The transaction type ID' }],
          responses: {
            '200': { description: 'Transaction type removed successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '400': { description: 'Invalid Transaction Type ID format', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Transaction type not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }
      },





      '/transactions': {
        get: {
          summary: 'Get all transactions with optional filters and pagination',
          tags: ['Transactions'],
          security: [{ BearerAuth: [] }],
          parameters: [
            { in: 'query', name: 'cashierId', schema: { type: 'string' }, description: 'Filter by cashier ID' },
            { in: 'query', name: 'startDate', schema: { type: 'string', format: 'date' }, description: 'Filter by start date (YYYY-MM-DD)' },
            { in: 'query', name: 'endDate', schema: { type: 'string', format: 'date' }, description: 'Filter by end date (YYYY-MM-DD)' },
            { in: 'query', name: 'limit', schema: { type: 'integer', default: 10 }, description: 'Number of transactions to return per page' },
            { in: 'query', name: 'page', schema: { type: 'integer', default: 1 }, description: 'Page number' }
          ],
          responses: {
            '200': {
              description: 'List of transactions',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      transactions: { type: 'array', items: { $ref: '#/components/schemas/Transaction' } },
                      total: { type: 'integer' },
                      page: { type: 'integer' },
                      pages: { type: 'integer' }
                    }
                  }
                }
              }
            },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },
        post: {
          summary: 'Create a new transaction',
          tags: ['Transactions'],
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/TransactionInput' }
              }
            }
          },
          responses: {
            '201': { description: 'Transaction created successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/Transaction' } } } },
            '400': { description: 'Invalid input or insufficient stock', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }
      },
      '/transactions/{id}': {
        get: {
          summary: 'Get transaction by ID',
          tags: ['Transactions'],
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: 'The transaction ID' }],
          responses: {
            '200': { description: 'Transaction data', content: { 'application/json': { schema: { $ref: '#/components/schemas/Transaction' } } } },
            '400': { description: 'Invalid Transaction ID format', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Transaction not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        },


        patch: {
          summary: 'Update transaction status by ID',
          tags: ['Transactions'],
          security: [{ BearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: 'The transaction ID' }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { $ref: '#/components/schemas/TransactionStatus' }
                  },
                  required: ['status']
                }
              }
            }
          },
          responses: {
            '200': { description: 'Transaction status updated successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/Transaction' } } } },
            '400': { description: 'Invalid input or Transaction ID format', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '404': { description: 'Transaction not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
            '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }

      }
    }
  },

  apis: [
    '../routes/*.ts',
    '../models/*.ts',
  ],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
export default swaggerSpec;

