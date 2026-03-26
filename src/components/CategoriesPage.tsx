import { useState } from 'react';
import { Pencil, Trash2, Plus, Tag } from 'lucide-react';
import { Category } from '../types';
import { CategoryForm } from './CategoryForm';
import { ConfirmDialog } from './ConfirmDialog';
import { useCategories } from '../hooks/useCategories';
import { useProducts } from '../hooks/useProducts';

export function CategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const { products, deleteProductsByCategory } = useProducts();
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState<Category | null>(null);

  const productCount = (catId: string) => products.filter((p) => p.categoryId === catId).length;

  const handleDelete = () => {
    if (!deleting) return;
    deleteProductsByCategory(deleting.id);
    deleteCategory(deleting.id);
    setDeleting(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Kategoriyalar</h1>
          <p className="page-sub">{categories.length} ta kategoriya</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          <Plus size={16} /> Qo'shish
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="empty-state">
          <Tag size={48} className="empty-icon" />
          <p>Hali kategoriya yo'q</p>
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
            Birinchisini qo'shing
          </button>
        </div>
      ) : (
        <div className="card-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
              <div className="category-card-body">
                <div className="category-icon">
                  <Tag size={20} />
                </div>
                <div className="category-info">
                  <h3>{cat.name}</h3>
                  <span className="badge">{productCount(cat.id)} mahsulot</span>
                </div>
              </div>
              <div className="category-card-actions">
                <button className="icon-btn" title="Tahrirlash" onClick={() => setEditing(cat)}>
                  <Pencil size={15} />
                </button>
                <button
                  className="icon-btn danger"
                  title="O'chirish"
                  onClick={() => setDeleting(cat)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <CategoryForm onSubmit={addCategory} onClose={() => setShowAdd(false)} />
      )}
      {editing && (
        <CategoryForm
          initial={editing}
          onSubmit={(form) => updateCategory(editing.id, form)}
          onClose={() => setEditing(null)}
        />
      )}
      {deleting && (
        <ConfirmDialog
          message={`"${deleting.name}" kategoriyasini o'chirsangiz, unga tegishli ${productCount(deleting.id)} ta mahsulot ham o'chadi. Davom etasizmi?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
