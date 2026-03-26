import { useState, useCallback } from 'react';
import { Category, CategoryFormData, ValidationErrors } from '../types';
import { storage, generateId } from '../utils/storage';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(() => storage.getCategories());

  const save = useCallback((data: Category[]) => {
    storage.setCategories(data);
    setCategories(data);
  }, []);

  const validateCategory = (form: CategoryFormData): ValidationErrors => {
    const errors: ValidationErrors = {};
    if (!form.name.trim()) errors.name = 'Nom majburiy';
    return errors;
  };

  const addCategory = useCallback(
    (form: CategoryFormData): ValidationErrors => {
      const errors = validateCategory(form);
      if (Object.keys(errors).length) return errors;
      const newCat: Category = { id: generateId(), name: form.name.trim() };
      save([...categories, newCat]);
      return {};
    },
    [categories, save]
  );

  const updateCategory = useCallback(
    (id: string, form: CategoryFormData): ValidationErrors => {
      const errors = validateCategory(form);
      if (Object.keys(errors).length) return errors;
      save(categories.map((c) => (c.id === id ? { ...c, name: form.name.trim() } : c)));
      return {};
    },
    [categories, save]
  );

  const deleteCategory = useCallback(
    (id: string) => {
      save(categories.filter((c) => c.id !== id));
    },
    [categories, save]
  );

  return { categories, addCategory, updateCategory, deleteCategory };
}
