import { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount = 0, onCartToggle, onSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch?.(val);
  };

  const NavLinks = () => (
    <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm font-medium">
      <li><a href="#products" className="hover:text-blue-600 transition">All Products</a></li>
      <li><a href="#brands" className="hover:text-blue-600 transition">Brands</a></li>
      <li><a href="#categories" className="hover:text-blue-600 transition">Categories</a></li>
      <li><a href="#about" className="hover:text-blue-600 transition">About</a></li>
      <li><a href="#contact" className="hover:text-blue-600 transition">Contact</a></li>
    </ul>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              className="md:hidden p-2 rounded-md hover:bg-slate-100"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <a href="#" className="flex items-center gap-2 font-semibold text-slate-900">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white font-bold">MZ</span>
              <span className="tracking-tight">Modern Zone Trading</span>
            </a>
          </div>

          <form onSubmit={handleSubmit} className="hidden md:flex items-center flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search by product, brand, or category"
                value={query}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            <button
              onClick={onCartToggle}
              className="relative inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1 text-[11px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Account</span>
            </button>
          </div>
        </div>

        <div className="hidden md:flex pb-3">
          <NavLinks />
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white font-bold">MZ</span>
                Modern Zone Trading
              </div>
              <button className="p-2 rounded-md hover:bg-slate-100" onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search products"
                  value={query}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>
            <NavLinks />
            <button
              onClick={() => { setMobileOpen(false); onCartToggle?.(); }}
              className="mt-auto inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
            >
              <ShoppingCart className="w-4 h-4" />
              Open Cart
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
