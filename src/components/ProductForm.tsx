import { useState } from 'react';
import { Category, Product, ProductFormData, ValidationErrors } from '../types';
import { Modal } from './Modal';

interface ProductFormProps {
  initial?: Product;
  categories: Category[];
  onSubmit: (form: ProductFormData) => ValidationErrors;
  onClose: () => void;
}

export function ProductForm({ initial, categories, onSubmit, onClose }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>({
    name: initial?.name ?? '',
    categoryId: initial?.categoryId ?? '',
    description: initial?.description ?? '',
    price: initial?.price?.toString() ?? '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const set = (key: keyof ProductFormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = onSubmit(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
    } else {
      onClose();
    }
  };

  return (
    <Modal title={initial ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom *</label>
          <input
            className={errors.name ? 'error' : ''}
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Mahsulot nomi"
            autoFocus
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Kategoriya *</label>
          <select
            className={errors.categoryId ? 'error' : ''}
            value={form.categoryId}
            onChange={(e) => set('categoryId', e.target.value)}
          >
            <option value="">— Tanlang —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <span className="error-msg">{errors.categoryId}</span>}
        </div>

        <div className="form-group">
          <label>Tavsif *</label>
          <textarea
            className={errors.description ? 'error' : ''}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="Mahsulot haqida qisqacha"
            rows={3}
          />
          {errors.description && <span className="error-msg">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label>Narx (so'm) *</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className={errors.price ? 'error' : ''}
            value={form.price}
            onChange={(e) => set('price', e.target.value)}
            placeholder="0.00"
          />
          {errors.price && <span className="error-msg">{errors.price}</span>}
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Bekor qilish
          </button>
          <button type="submit" className="btn btn-primary">
            {initial ? 'Saqlash' : 'Qo\'shish'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
