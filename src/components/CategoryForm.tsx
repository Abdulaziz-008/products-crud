import { useState } from 'react';
import { Category, CategoryFormData, ValidationErrors } from '../types';
import { Modal } from './Modal';

interface CategoryFormProps {
  initial?: Category;
  onSubmit: (form: CategoryFormData) => ValidationErrors;
  onClose: () => void;
}

export function CategoryForm({ initial, onSubmit, onClose }: CategoryFormProps) {
  const [form, setForm] = useState<CategoryFormData>({
    name: initial?.name ?? '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

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
    <Modal title={initial ? 'Kategoriyani tahrirlash' : 'Yangi kategoriya'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom *</label>
          <input
            className={errors.name ? 'error' : ''}
            value={form.name}
            onChange={(e) => setForm({ name: e.target.value })}
            placeholder="Kategoriya nomi"
            autoFocus
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
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
