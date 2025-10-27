import { X, Minus, Plus, Trash2 } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, items = [], onInc, onDec, onRemove }) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl border-l border-slate-200 transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">Your Cart</h3>
          <button className="p-2 rounded-md hover:bg-slate-100" onClick={onClose} aria-label="Close cart">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="h-[calc(100%-160px)] overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 text-sm">
              Your cart is empty.
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => (
                <li key={it.id} className="flex gap-3">
                  <div className="h-20 w-24 shrink-0 overflow-hidden rounded border border-slate-200 bg-slate-50">
                    <img src={it.img} alt={it.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-900 truncate">{it.title}</h4>
                    <p className="text-xs text-slate-500">{it.brand} • {it.category}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-md border border-slate-200">
                        <button onClick={() => onDec?.(it.id)} className="p-1.5 hover:bg-slate-50" aria-label="Decrease quantity">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 text-sm">{it.qty}</span>
                        <button onClick={() => onInc?.(it.id)} className="p-1.5 hover:bg-slate-50" aria-label="Increase quantity">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold">SAR {(it.price * it.qty).toFixed(2)}</p>
                        <button onClick={() => onRemove?.(it.id)} className="p-1.5 rounded-md hover:bg-slate-50" aria-label="Remove item">
                          <Trash2 className="w-4 h-4 text-slate-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-600 text-sm">Subtotal</span>
            <span className="font-bold">SAR {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 rounded-md border border-slate-200 px-4 py-2 font-semibold hover:bg-slate-50">
              Submit Inquiry
            </button>
            <button className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
