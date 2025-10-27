import { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [search, setSearch] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const cartCount = useMemo(() => cart.reduce((sum, it) => sum + it.qty, 0), [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const inc = (id) => setCart((prev) => prev.map((p) => p.id === id ? { ...p, qty: p.qty + 1 } : p));
  const dec = (id) => setCart((prev) => prev.map((p) => p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p));
  const removeItem = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar cartCount={cartCount} onCartToggle={() => setCartOpen(true)} onSearch={setSearch} />
      <main>
        <Hero />
        <section id="brands" className="py-10 border-y border-slate-100 bg-slate-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Trusted Brands</p>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {['Dormer', 'Pramet', 'Kyocera', 'Seco', 'Sandvik', 'Kennametal'].map((b) => (
                <div key={b} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-sm font-semibold text-slate-700">
                  {b}
                </div>
              ))}
            </div>
          </div>
        </section>
        <ProductGrid onAddToCart={addToCart} searchQuery={search} />
      </main>

      <footer className="mt-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 font-semibold">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white font-bold">MZ</span>
                Modern Zone Trading
              </div>
              <p className="mt-3 text-sm text-slate-600">Industrial tools and cutting solutions for manufacturing across Saudi Arabia.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Categories</p>
              <ul className="text-sm space-y-1 text-slate-600">
                <li>Milling Cutters</li>
                <li>Turning Inserts</li>
                <li>Drill Bits</li>
                <li>Tapping & Threading</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Support</p>
              <ul className="text-sm space-y-1 text-slate-600">
                <li>Request a Quote</li>
                <li>Shipping & Delivery</li>
                <li>Returns Policy</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Contact</p>
              <ul className="text-sm space-y-1 text-slate-600">
                <li>Riyadh, Saudi Arabia</li>
                <li>+966 ••• ••••</li>
                <li>sales@modernzonetrading.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-xs text-slate-500">© {new Date().getFullYear()} Modern Zone Trading. All rights reserved.</div>
        </div>
      </footer>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onInc={inc}
        onDec={dec}
        onRemove={removeItem}
      />
    </div>
  );
}
