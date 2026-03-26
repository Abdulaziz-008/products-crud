import { Category, Product } from '../types';

const CATEGORIES_KEY = 'crud_categories';
const PRODUCTS_KEY = 'crud_products';
const INITIALIZED_KEY = 'crud_initialized';

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'default-1', name: 'Elektronika' },
  { id: 'default-2', name: 'Kiyim-kechak' },
  { id: 'default-3', name: 'Oziq-ovqat' },
  { id: 'default-4', name: 'Maishiy texnika' },
];

function initDefaults(): void {
  if (localStorage.getItem(INITIALIZED_KEY)) return;
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify([]));
  localStorage.setItem(INITIALIZED_KEY, 'true');
}

export const storage = {
  getCategories(): Category[] {
    initDefaults();
    try {
      const data = localStorage.getItem(CATEGORIES_KEY);
      return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  },

  setCategories(categories: Category[]): void {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  },

  getProducts(): Product[] {
    initDefaults();
    try {
      const data = localStorage.getItem(PRODUCTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  setProducts(products: Product[]): void {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  },
};

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
