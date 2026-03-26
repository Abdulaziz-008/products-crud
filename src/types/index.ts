export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export type SortField = 'name' | 'price' | 'createdAt' | 'updatedAt';
export type SortOrder = 'asc' | 'desc';

export interface ProductFormData {
  name: string;
  categoryId: string;
  description: string;
  price: string;
}

export interface CategoryFormData {
  name: string;
}

export interface ValidationErrors {
  [key: string]: string;
}
