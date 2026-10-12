import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
} from 'lucide-react';
import Container from '../components/common/Container.jsx';
import Reveal from '../components/common/Reveal.jsx';
import { PRODUCTS } from './Products.jsx';

export default function Cart() {
  const [items, setItems] = useState([
    { product: PRODUCTS[0], qty: 1, color: PRODUCTS[0].colors[0] },
    { product: PRODUCTS[3], qty: 2, color: PRODUCTS[3].colors[0] },
    { product: PRODUCTS[5], qty: 1, color: PRODUCTS[5].colors[0] },
  ]);
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 0 ? 0 : 0;
  const tax = Math.round((subtotal - discount) * 0.08);
  const total = subtotal - discount + shipping + tax;

  const updateQty = (id, delta) =>
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i
        )
        .filter((i) => i.qty > 0)
    );

  const removeItem = (id) =>
    setItems((prev) => prev.filter((i) => i.product.id !== id));

  const applyPromo = () => {
    setPromoError('');
    if (promo.trim().toUpperCase() === 'VOLTIX10') {
      setPromoApplied(true);
    } else {
      setPromoError('Invalid code. Try VOLTIX10.');
      setPromoApplied(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-24">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 dark:bg-white/5">
              <ShoppingBag className="h-9 w-9 text-slate-700 dark:text-slate-300" />
            </span>
            <h1 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-white">
              Your cart is empty
            </h1>
            <p className="mt-3 text-slate-700 dark:text-slate-400">
              Add a few Voltix devices and they'll show up here.
            </p>
            <Link to="/products" className="btn-primary mt-8 inline-flex">
              Browse products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <Container>
        <Reveal>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Your cart
            </h1>
            <p className="mt-2 text-slate-700 dark:text-slate-400">
              {items.reduce((s, i) => s + i.qty, 0)} items · Free express shipping included
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* ---------- Items ---------- */}
          <div className="space-y-4">
            {items.map((item, i) => (
              <Reveal key={item.product.id} delay={i * 80}>
                <div className="card group flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    to={`/products/${item.product.id}`}
                    className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-200 dark:bg-white/5"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                      {item.product.category}
                    </p>
                    <Link
                      to={`/products/${item.product.id}`}
                      className="mt-1 block text-base font-bold text-slate-900 hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
                    >
                      {item.product.name}
                    </Link>
                    <p className="mt-1 text-xs text-slate-700 dark:text-slate-400">
                      Colour: <span className="inline-block h-3 w-3 translate-y-0.5 rounded-full border border-slate-400" style={{ backgroundColor: item.color }} />
                    </p>
                  </div>

                  {/* Qty */}
                  <div className="flex items-center rounded-full border border-slate-300 dark:border-white/15">
                    <button
                      onClick={() => updateQty(item.product.id, -1)}
                      className="flex h-9 w-9 items-center justify-center text-slate-700 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-slate-900 dark:text-white">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.product.id, 1)}
                      className="flex h-9 w-9 items-center justify-center text-slate-700 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-base font-extrabold text-slate-900 dark:text-white">
                      ${item.product.price * item.qty}
                    </p>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="mt-1 inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                      Remove
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ---------- Summary ---------- */}
          <Reveal delay={200}>
            <aside className="lg:sticky lg:top-28">
              <div className="card">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Order summary
                </h2>

                {/* Promo */}
                <div className="mt-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-400">
                    Promo code
                  </label>
                  <div className="mt-2 flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        value={promo}
                        onChange={(e) => setPromo(e.target.value)}
                        placeholder="VOLTIX10"
                        className="input-field pl-10"
                      />
                    </div>
                    <button onClick={applyPromo} className="btn-ghost !px-4 !py-2 text-xs">
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="mt-2 text-xs text-red-500">{promoError}</p>
                  )}
                  {promoApplied && (
                    <p className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      ✓ VOLTIX10 applied — 10% off
                    </p>
                  )}
                </div>

                {/* Totals */}
                <dl className="mt-6 space-y-3 border-t border-slate-300 pt-6 dark:border-white/10">
                  <Row label="Subtotal" value={`$${subtotal}`} />
                  {discount > 0 && (
                    <Row label="Discount" value={`-$${discount}`} accent="emerald" />
                  )}
                  <Row label="Shipping" value="Free" accent="emerald" />
                  <Row label="Tax (8%)" value={`$${tax}`} />
                  <div className="border-t border-slate-300 pt-4 dark:border-white/10">
                    <Row label="Total" value={`$${total}`} bold />
                  </div>
                </dl>

                <Link to="/checkout" className="btn-primary mt-6 w-full">
                  Proceed to checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="mt-5 space-y-2 text-xs text-slate-700 dark:text-slate-400">
                  <p className="flex items-center gap-2">
                    <Truck className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
                    Free 48h express shipping
                  </p>
                  <p className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
                    30-day money-back guarantee
                  </p>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}

function Row({ label, value, bold, accent }) {
  return (
    <div className="flex items-center justify-between">
      <dt
        className={`text-sm ${
          bold ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-400'
        }`}
      >
        {label}
      </dt>
      <dd
        className={`text-sm ${
          bold
            ? 'font-extrabold text-slate-900 dark:text-white'
            : accent === 'emerald'
            ? 'font-semibold text-emerald-600 dark:text-emerald-400'
            : 'font-semibold text-slate-900 dark:text-white'
        }`}
      >
        {value}
      </dd>
    </div>
  );
}