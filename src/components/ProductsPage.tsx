import { useState, useMemo } from 'react';
import {
  Plus, Search, Pencil, Trash2, ChevronUp, ChevronDown, Package,
  ArrowUpDown,
} from 'lucide-react';
import { Product, SortField, SortOrder } from '../types';
import { ProductForm } from './ProductForm';
import { ConfirmDialog } from './ConfirmDialog';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('uz-UZ', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function formatPrice(price: number) {
  return price.toLocaleString('uz-UZ') + ' so\'m';
}

export function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { categories } = useCategories();

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);

  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name ?? '—';

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          getCategoryName(p.categoryId).toLowerCase().includes(q)
      );
    }
    if (filterCat) {
      list = list.filter((p) => p.categoryId === filterCat);
    }
    list.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortField === 'price') cmp = a.price - b.price;
      else if (sortField === 'createdAt') cmp = a.createdAt.localeCompare(b.createdAt);
      else if (sortField === 'updatedAt') cmp = a.updatedAt.localeCompare(b.updatedAt);
      return sortOrder === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [products, search, filterCat, sortField, sortOrder, categories]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={13} className="sort-icon inactive" />;
    return sortOrder === 'asc' ? (
      <ChevronUp size={13} className="sort-icon" />
    ) : (
      <ChevronDown size={13} className="sort-icon" />
    );
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Mahsulotlar</h1>
          <p className="page-sub">{products.length} ta mahsulot</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          <Plus size={16} /> Qo'shish
        </button>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-wrap">
          <Search size={15} className="search-icon" />
          <input
            className="search-input"
            placeholder="Qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
        >
          <option value="">Barcha kategoriyalar</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <Package size={48} className="empty-icon" />
          <p>Hali mahsulot yo'q</p>
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
            Birinchisini qo'shing
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <Search size={48} className="empty-icon" />
          <p>Natija topilmadi</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th className="sortable" onClick={() => handleSort('name')}>
                  Nom <SortIcon field="name" />
                </th>
                <th>Kategoriya</th>
                <th>Tavsif</th>
                <th className="sortable" onClick={() => handleSort('price')}>
                  Narx <SortIcon field="price" />
                </th>
                <th className="sortable" onClick={() => handleSort('createdAt')}>
                  Yaratilgan <SortIcon field="createdAt" />
                </th>
                <th className="sortable" onClick={() => handleSort('updatedAt')}>
                  Yangilangan <SortIcon field="updatedAt" />
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="font-medium">{p.name}</td>
                  <td>
                    <span className="badge">{getCategoryName(p.categoryId)}</span>
                  </td>
                  <td className="desc-cell">{p.description}</td>
                  <td className="price-cell">{formatPrice(p.price)}</td>
                  <td className="date-cell">{formatDate(p.createdAt)}</td>
                  <td className="date-cell">{formatDate(p.updatedAt)}</td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-btn" title="Tahrirlash" onClick={() => setEditing(p)}>
                        <Pencil size={14} />
                      </button>
                      <button
                        className="icon-btn danger"
                        title="O'chirish"
                        onClick={() => setDeleting(p)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAdd && (
        <ProductForm
          categories={categories}
          onSubmit={addProduct}
          onClose={() => setShowAdd(false)}
        />
      )}
      {editing && (
        <ProductForm
          initial={editing}
          categories={categories}
          onSubmit={(form) => updateProduct(editing.id, form)}
          onClose={() => setEditing(null)}
        />
      )}
      {deleting && (
        <ConfirmDialog
          message={`"${deleting.name}" mahsulotini o'chirishni tasdiqlaysizmi?`}
          onConfirm={() => {
            deleteProduct(deleting.id);
            setDeleting(null);
          }}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
