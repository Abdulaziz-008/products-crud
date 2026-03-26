import { useState } from 'react';
import { Tag, Package } from 'lucide-react';
import { CategoriesPage } from './components/CategoriesPage';
import { ProductsPage } from './components/ProductsPage';

type Tab = 'products' | 'categories';

export default function App() {
  const [tab, setTab] = useState<Tab>('products');

  return (
    <div className="app">
      {/* Desktop sidebar */}
      <nav className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-dot" />
          <span className="logo-text">CRUD App</span>
        </div>
        <div className="nav-links">
          <button
            className={`nav-link ${tab === 'products' ? 'active' : ''}`}
            onClick={() => setTab('products')}
          >
            <Package size={18} />
            Mahsulotlar
          </button>
          <button
            className={`nav-link ${tab === 'categories' ? 'active' : ''}`}
            onClick={() => setTab('categories')}
          >
            <Tag size={18} />
            Kategoriyalar
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="main-content">
        {tab === 'products' ? <ProductsPage /> : <CategoriesPage />}
      </main>

      {/* Mobile bottom navigation */}
      <nav className="bottom-nav">
        <button
          className={`bottom-nav-btn ${tab === 'products' ? 'active' : ''}`}
          onClick={() => setTab('products')}
        >
          <Package size={22} />
          Mahsulotlar
        </button>
        <button
          className={`bottom-nav-btn ${tab === 'categories' ? 'active' : ''}`}
          onClick={() => setTab('categories')}
        >
          <Tag size={22} />
          Kategoriyalar
        </button>
      </nav>
    </div>
  );
}
