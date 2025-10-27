import { useMemo, useState } from 'react';
import { Star } from 'lucide-react';

const sampleProducts = [
  {
    id: 'p1',
    title: 'Dormer HSS Drill Bit Set 1-13mm',
    brand: 'Dormer',
    category: 'Drill Bits',
    price: 249.0,
    rating: 4.7,
    img: 'https://images.unsplash.com/photo-1581093588401-16ec8a2f61c9?q=80&w=1600&auto=format&fit=crop',
    description: 'High-speed steel drill bits suitable for a variety of materials with excellent durability.',
  },
  {
    id: 'p2',
    title: 'Pramet Milling Cutter 63mm',
    brand: 'Pramet',
    category: 'Milling Cutters',
    price: 1299.0,
    rating: 4.5,
    img: 'https://images.unsplash.com/photo-1606229365485-93a3b1fbc4b6?q=80&w=1600&auto=format&fit=crop',
    description: 'High-performance face mill for precise surface finishing and extended tool life.',
  },
  {
    id: 'p3',
    title: 'Kyocera Turning Inserts CNMG',
    brand: 'Kyocera',
    category: 'Turning Inserts',
    price: 399.0,
    rating: 4.3,
    img: 'https://images.unsplash.com/photo-1592982537447-8c7f1a71db76?q=80&w=1600&auto=format&fit=crop',
    description: 'Carbide inserts offering excellent wear resistance for steel and stainless applications.',
  },
  {
    id: 'p4',
    title: 'Dormer Carbide End Mill 10mm',
    brand: 'Dormer',
    category: 'Milling Cutters',
    price: 299.0,
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop',
    description: 'Solid carbide end mill designed for high-speed machining and superior finish.',
  },
  {
    id: 'p5',
    title: 'Pramet Indexable Drill 20mm',
    brand: 'Pramet',
    category: 'Drill Bits',
    price: 1599.0,
    rating: 4.6,
    img: 'https://images.unsplash.com/photo-1581091014534-8987c1d1cb71?q=80&w=1600&auto=format&fit=crop',
    description: 'Rigid indexable drilling solution for heavy-duty applications with quick insert changes.',
  },
  {
    id: 'p6',
    title: 'Kyocera Grooving Insert Set',
    brand: 'Kyocera',
    category: 'Turning Inserts',
    price: 479.0,
    rating: 4.4,
    img: 'https://images.unsplash.com/photo-1511546395756-590dffdcdb8e?q=80&w=1600&auto=format&fit=crop',
    description: 'High-precision grooving inserts delivering reliable performance and long life.',
  },
];

function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-lg border border-slate-200 bg-white overflow-hidden hover:shadow-md transition">
      <div className="aspect-[4/3] overflow-hidden bg-slate-50">
        <img src={product.img} alt={product.title} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-slate-500">{product.brand} • {product.category}</p>
            <h3 className="mt-1 font-semibold text-slate-900 line-clamp-2">{product.title}</h3>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-bold text-slate-900">SAR {product.price.toFixed(2)}</p>
            <p className="flex items-center gap-1 text-xs text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {product.rating}
            </p>
          </div>
        </div>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onAdd?.(product)}
            className="flex-1 inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Add to Cart
          </button>
          <button className="inline-flex justify-center rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50">
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid({ onAddToCart, searchQuery = '' }) {
  const [brand, setBrand] = useState('All');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(1);
  const perPage = 6;

  const brands = useMemo(() => ['All', ...Array.from(new Set(sampleProducts.map(p => p.brand)))], []);
  const categories = useMemo(() => ['All', ...Array.from(new Set(sampleProducts.map(p => p.category)))], []);

  const filtered = useMemo(() => {
    let list = [...sampleProducts];
    if (brand !== 'All') list = list.filter(p => p.brand === brand);
    if (category !== 'All') list = list.filter(p => p.category === category);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price); break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price); break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating); break;
      default:
        break;
    }
    return list;
  }, [brand, category, sort, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const changePage = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="products" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Products</h2>
            <p className="text-slate-600 text-sm mt-1">Browse by brand and category. Add items to cart or request a quote.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select value={brand} onChange={e => { setBrand(e.target.value); setPage(1); }} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <select value={category} onChange={e => { setCategory(e.target.value); setPage(1); }} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
              <option value="popular">Sort: Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paged.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing {(page - 1) * perPage + 1}-{Math.min(page * perPage, filtered.length)} of {filtered.length}
          </p>
          <div className="inline-flex items-center gap-2">
            <button onClick={() => changePage(page - 1)} disabled={page === 1} className="rounded-md border border-slate-200 px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50">Prev</button>
            <span className="text-sm">Page {page} / {totalPages}</span>
            <button onClick={() => changePage(page + 1)} disabled={page === totalPages} className="rounded-md border border-slate-200 px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </section>
  );
}
