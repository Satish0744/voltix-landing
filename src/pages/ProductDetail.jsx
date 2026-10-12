import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react';
import Container from '../components/common/Container.jsx';
import Reveal from '../components/common/Reveal.jsx';
import { PRODUCTS } from './Products.jsx';

const TABS = [
  { id: 'description', label: 'Description' },
  { id: 'specs', label: 'Specifications' },
  { id: 'shipping', label: 'Shipping' },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');
  const [wished, setWished] = useState(false);

  const gallery = [product.image, product.hover, product.image, product.hover];

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-32 pb-24">
      <Container>
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-700 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </button>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* -------- Gallery -------- */}
          <Reveal>
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-300 bg-slate-100 dark:border-white/10 dark:bg-white/[0.03]">
                <img
                  src={gallery[activeImage]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <button
                  onClick={() => setWished((v) => !v)}
                  className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition-all ${
                    wished
                      ? 'border-red-500/60 bg-red-500 text-white'
                      : 'border-slate-300 bg-white/80 text-slate-700 hover:bg-white dark:border-white/15 dark:bg-black/40 dark:text-slate-200'
                  }`}
                >
                  <Heart className="h-5 w-5" fill={wished ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                      activeImage === i
                        ? 'border-brand-500 shadow-glow'
                        : 'border-slate-300 opacity-60 hover:opacity-100 dark:border-white/10'
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* -------- Info -------- */}
          <Reveal delay={100}>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                {product.category}
              </p>
              <h1 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-amber-500' : 'text-slate-300 dark:text-slate-700'}`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-400">
                  {product.rating} · {product.reviews.toLocaleString()} reviews
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  ${product.price}
                </span>
                <span className="text-lg text-slate-500 line-through dark:text-slate-500">
                  ${product.oldPrice}
                </span>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Save ${product.oldPrice - product.price}
                </span>
              </div>

              <p className="mt-6 leading-relaxed text-slate-700 dark:text-slate-400">
                Flagship performance in a precision-milled chassis. The {product.name} delivers
                unmatched audio fidelity, all-day battery and on-device AI — engineered for people
                who expect more from their hardware.
              </p>

              {/* Colour picker */}
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-300">
                  Colour
                </p>
                <div className="mt-3 flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      aria-label={`Color ${c}`}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                        color === c
                          ? 'border-brand-500 shadow-glow scale-110'
                          : 'border-slate-300 dark:border-white/15'
                      }`}
                      style={{ backgroundColor: c }}
                    >
                      {color === c && (
                        <Check
                          className={`h-4 w-4 ${c === '#ffffff' || c === '#e2e8f0' ? 'text-slate-900' : 'text-white'}`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Qty + Add to cart */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-full border border-slate-300 dark:border-white/15">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-11 w-11 items-center justify-center text-slate-700 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-slate-900 dark:text-white">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="flex h-11 w-11 items-center justify-center text-slate-700 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button className="btn-primary flex-1 min-w-[180px]">
                  <ShoppingCart className="h-4 w-4" />
                  Add to cart · ${product.price * qty}
                </button>

                <Link to="/cart" className="btn-ghost">
                  Buy now
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-300 pt-6 dark:border-white/10">
                <Badge icon={Truck} label="Free 48h shipping" />
                <Badge icon={ShieldCheck} label="3-year warranty" />
                <Badge icon={Check} label="30-day returns" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* -------- Tabs -------- */}
        <Reveal delay={200}>
          <div className="mt-20">
            <div className="flex flex-wrap gap-2 border-b border-slate-300 dark:border-white/10">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative px-5 py-3 text-sm font-semibold transition-colors ${
                    tab === t.id
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {t.label}
                  {tab === t.id && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-brand-500 to-volt-500" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 text-slate-700 dark:text-slate-300">
              {tab === 'description' && (
                <div className="grid gap-6 md:grid-cols-2">
                  <p className="leading-relaxed">
                    Every {product.name} is machined from aerospace-grade titanium and
                    stress-tested for over 10,000 hours. The result: hardware that feels as
                    good in year five as it does on day one.
                  </p>
                  <p className="leading-relaxed">
                    Powered by our NeuroCore X2 chip with on-device AI, it adapts to your
                    environment in real time — no cloud, no latency, no compromise.
                  </p>
                </div>
              )}

              {tab === 'specs' && (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['Chip', 'NeuroCore X2, 4nm'],
                    ['Battery', 'Up to 72 hours'],
                    ['Charging', 'HyperCharge — 0→80% in 18 min'],
                    ['Connectivity', 'Wi-Fi 7, BT 5.4'],
                    ['Water resistance', 'IP68'],
                    ['Weight', '248 g'],
                    ['Warranty', '3 years titanium'],
                    ['In the box', `Device, cable, case, manual`],
                  ].map(([k, v]) => (
                    <li
                      key={k}
                      className="flex items-center justify-between rounded-xl border border-slate-300 px-4 py-3 dark:border-white/10"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                        {k}
                      </span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {v}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {tab === 'shipping' && (
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    We ship worldwide from Berlin and Tokyo hubs. Express 48h delivery is free
                    on every order — no minimum.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Europe: 1–2 business days</li>
                    <li>• North America: 2–3 business days</li>
                    <li>• Asia-Pacific: 2–4 business days</li>
                    <li>• Rest of world: 4–6 business days</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* -------- Related -------- */}
        <Reveal delay={300}>
          <div className="mt-20">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              You might also like
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="card card-hover group overflow-hidden !p-0"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {p.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
                      ${p.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

function Badge({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200 text-brand-600 dark:bg-white/5 dark:text-brand-400">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </span>
    </div>
  );
}