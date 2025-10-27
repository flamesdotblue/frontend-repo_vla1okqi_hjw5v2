import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
              Trusted Industrial Tools Supplier in KSA
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Precision Tools for Manufacturing Excellence
            </h1>
            <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-xl">
              Explore premium brands like Dormer, Pramet, and Kyocera. From milling cutters and turning inserts to high-performance drill bits—everything you need to keep production moving.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#products" className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-white font-semibold shadow hover:bg-blue-700 transition">
                Shop Products
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-5 py-2.5 font-semibold hover:bg-slate-50">
                Request a Quote
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <dt className="text-2xl font-bold text-slate-900">2,500+</dt>
                <dd className="text-xs text-slate-500">Products</dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-slate-900">50+</dt>
                <dd className="text-xs text-slate-500">Brands</dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-slate-900">24h</dt>
                <dd className="text-xs text-slate-500">Response Time</dd>
              </div>
            </dl>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg ring-1 ring-slate-200">
              <img
                src="https://images.unsplash.com/photo-1516542076529-1ea3854896e1?q=80&w=1600&auto=format&fit=crop"
                alt="Industrial tooling"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden sm:block">
              <div className="rounded-lg bg-white/90 backdrop-blur border border-slate-200 shadow px-4 py-3">
                <p className="text-xs font-medium text-slate-600">Featured Brands</p>
                <div className="mt-2 flex items-center gap-3">
                  {['Dormer', 'Pramet', 'Kyocera'].map((b) => (
                    <span key={b} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
