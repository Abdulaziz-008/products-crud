# Products CRUD App

React + Vite + TypeScript bilan yaratilgan mini CRUD ilova.

## Texnologiyalar

- **React 18** — UI framework
- **Vite** — build tool
- **TypeScript** — type safety
- **lucide-react** — ikonlar
- **localStorage** — ma'lumotlar saqlash (backend yo'q)

## Funksiyalar

### Kategoriyalar
- ➕ Qo'shish
- 📋 Ko'rish
- ✏️ Tahrirlash
- 🗑️ O'chirish (bog'liq mahsulotlar ham o'chadi)

### Mahsulotlar
- ➕ Qo'shish
- 📋 Ko'rish (nom, kategoriya, tavsif, narx, sana)
- ✏️ Tahrirlash
- 🗑️ O'chirish
- 🔍 Qidirish (nom, tavsif, kategoriya bo'yicha)
- 🔽 Kategoriya bo'yicha filter
- ↕️ Sort: nom, narx, yaratilgan, yangilangan

### Validation
- Barcha maydonlar majburiy
- Narx musbat son bo'lishi kerak

## O'rnatish va ishga tushirish

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy (Vercel)

```bash
npm i -g vercel
vercel
```

## Loyiha tuzilishi

```
src/
├── components/
│   ├── CategoriesPage.tsx
│   ├── ProductsPage.tsx
│   ├── CategoryForm.tsx
│   ├── ProductForm.tsx
│   ├── Modal.tsx
│   └── ConfirmDialog.tsx
├── hooks/
│   ├── useCategories.ts
│   └── useProducts.ts
├── types/
│   └── index.ts
├── utils/
│   └── storage.ts
├── App.tsx
├── main.tsx
└── index.css
```
