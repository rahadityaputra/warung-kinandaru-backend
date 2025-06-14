export interface ICreateProductRequest {
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  category?: string;
}

export interface IUpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
  category?: string;
}
