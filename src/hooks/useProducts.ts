import { useState, useCallback } from 'react';
import { Product, ProductFormData, ValidationErrors } from '../types';
import { storage, generateId } from '../utils/storage';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(() => storage.getProducts());

  const save = useCallback((data: Product[]) => {
    storage.setProducts(data);
    setProducts(data);
  }, []);

  const validateProduct = (form: ProductFormData): ValidationErrors => {
    const errors: ValidationErrors = {};
    if (!form.name.trim()) errors.name = 'Nom majburiy';
    if (!form.categoryId) errors.categoryId = 'Kategoriya tanlash majburiy';
    if (!form.description.trim()) errors.description = 'Tavsif majburiy';
    const price = parseFloat(form.price);
    if (!form.price) errors.price = 'Narx majburiy';
    else if (isNaN(price) || price <= 0) errors.price = 'Narx musbat son bo\'lishi kerak';
    return errors;
  };

  const addProduct = useCallback(
    (form: ProductFormData): ValidationErrors => {
      const errors = validateProduct(form);
      if (Object.keys(errors).length) return errors;
      const now = new Date().toISOString();
      const newProduct: Product = {
        id: generateId(),
        name: form.name.trim(),
        categoryId: form.categoryId,
        description: form.description.trim(),
        price: parseFloat(form.price),
        createdAt: now,
        updatedAt: now,
      };
      save([...products, newProduct]);
      return {};
    },
    [products, save]
  );

  const updateProduct = useCallback(
    (id: string, form: ProductFormData): ValidationErrors => {
      const errors = validateProduct(form);
      if (Object.keys(errors).length) return errors;
      save(
        products.map((p) =>
          p.id === id
            ? {
                ...p,
                name: form.name.trim(),
                categoryId: form.categoryId,
                description: form.description.trim(),
                price: parseFloat(form.price),
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
      return {};
    },
    [products, save]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      save(products.filter((p) => p.id !== id));
    },
    [products, save]
  );

  const deleteProductsByCategory = useCallback(
    (categoryId: string) => {
      save(products.filter((p) => p.categoryId !== categoryId));
    },
    [products, save]
  );

  return { products, addProduct, updateProduct, deleteProduct, deleteProductsByCategory };
}
