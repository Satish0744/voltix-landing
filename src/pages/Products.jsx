import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpDown,
  Filter,
  Heart,
  ShoppingCart,
  Star,
  X,
} from 'lucide-react';
import Container from '../components/common/Container.jsx';
import Reveal from '../components/common/Reveal.jsx';

/* ---------------- Product data ---------------- */
export const PRODUCTS = [
  {
    id: 'x1-pro',
    name: 'Voltix X1 Pro',
    category: 'Headphones',
    price: 499,
    oldPrice: 599,
    rating: 4.9,
    reviews: 2341,
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    hover: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80',
    colors: ['#0f172a', '#38bdf8', '#e2e8f0'],
  },
  {
    id: 'studio-bundle',
    name: 'Studio Bundle',
    category: 'Headphones',
    price: 899,
    oldPrice: 1099,
    rating: 5.0,
    reviews: 812,
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
    hover: 'https://images.unsplash.com/photo-1558756520-22cfe5d382ca?auto=format&fit=crop&w=900&q=80',
    colors: ['#05070d', '#0ea5e9'],
  },
  {
    id: 'band-2',
    name: 'Voltix Band 2',
    category: 'Wearables',
    price: 199,
    oldPrice: 249,
    rating: 4.7,
    reviews: 1520,
    tag: '-20%',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    hover: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=900&q=80',
    colors: ['#0f172a', '#f97316'],
  },
  {
    id: 'buds-air',
    name: 'Voltix Buds Air',
    category: 'Earbuds',
    price: 149,
    oldPrice: 199,
    rating: 4.6,
    reviews: 3402,
    tag: 'Hot',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80',
    hover: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80',
    colors: ['#ffffff', '#0ea5e9', '#05070d'],
  },
  {
    id: 'home-hub',
    name: 'Voltix Home Hub',
    category: 'Smart Home',
    price: 299,
    oldPrice: 349,
    rating: 4.8,
    reviews: 640,
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=900&q=80',
    hover: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80',
    colors: ['#0f172a', '#22d3ee'],
  },
  {
    id: 'power-bank',
    name: 'Voltix PowerCore',
    category: 'Accessories',
    price: 89,
    oldPrice: 119,
    rating: 4.5,
    reviews: 1180,
    tag: '-25%',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80',
    hover: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80',
    colors: ['#05070d', '#a855f7'],
  },
  {
    id: 'keys-pro',
    name: 'Voltix Keys Pro',
    category: 'Accessories',
    price: 189,
    oldPrice: 229,
    rating: 4.8,
    reviews: 902,
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
    hover: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80',
    colors: ['#0f172a', '#f43f5e'],
  },
  {
    id: 'watch-pro',
    name: 'Voltix Watch Pro',
    category: 'Wearables',
    price: 349,
    oldPrice: 429,
    rating: 4.9,
    reviews: 1740,
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
    hover: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80',
    colors: ['#05070d', '#0ea5e9', '#e2e8f0'],
  },
];

const CATEGORIES = ['All', 'Headphones', 'Earbuds', 'Wearables', 'Smart Home', 'Accessories'];
const SORTS = {
  featured: 'Featured',
  'price-asc': 'Price: Low → High',
  'price-desc': 'Price: High → Low',
  'rating': 'Top Rated',
};

export default function Products() {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [wishlist, setWishlist] = useState(new Set());
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filterOpen, setFilterOpen] = useState(false);

  const visible = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.price <= maxPrice);
    if (category !== 'All') list = list.filter((p) => p.category === category);
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [category, sort, maxPrice]);

  const toggleWish = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="pt-32 pb-24">
      <Container>
        {/* Page header */}
        <Reveal>
          <div className="text-center">
            <span className="inline-block rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Shop
            </span>
            <h1 className="mt-4 text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
              The full <span className="gradient-text">Voltix</span> lineup
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-700 dark:text-slate-400">
              8 flagship devices, engineered to outlast trends. Free 48h express shipping on every order.
            </p>
          </div>
        </Reveal>

        {/* Filters + sort bar */}
        <Reveal delay={100}>
          <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                    category === c
                      ? 'border-brand-500 bg-brand-500 text-white shadow-glow'
                      : 'border-slate-300 text-slate-700 hover:border-brand-500/50 hover:text-brand-600 dark:border-white/10 dark:text-slate-300 dark:hover:text-brand-400'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Sort + Filter button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFilterOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-brand-500/50 dark:border-white/10 dark:text-slate-300"
              >
                <Filter className="h-3.5 w-3.5" />
                Filters
              </button>
              <div className="relative">
                <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none rounded-full border border-slate-300 bg-transparent py-2 pl-9 pr-8 text-xs font-semibold text-slate-700 outline-none focus:border-brand-500 dark:border-white/10 dark:text-slate-300"
                >
                  {Object.entries(SORTS).map(([v, l]) => (
                    <option key={v} value={v} className="bg-white dark:bg-ink-900">
                      {l}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Price filter panel */}
        {filterOpen && (
          <div className="mt-4 rounded-2xl border border-slate-300 bg-slate-100 p-5 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">
                Max price: <span className="text-brand-600 dark:text-brand-400">${maxPrice}</span>
              </label>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <input
              type="range"
              min={50}
              max={1000}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-brand-500"
            />
          </div>
        )}

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((p, i) => {
            const wished = wishlist.has(p.id);
            return (
              <Reveal key={p.id} delay={i * 60}>
                <div className="card card-hover group flex h-full flex-col overflow-hidden !p-0">
                  {/* Image */}
                  <Link to={`/products/${p.id}`} className="relative block aspect-square overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                      loading="lazy"
                    />
                    <img
                      src={p.hover}
                      alt={`${p.name} alternate`}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      loading="lazy"
                    />

                    {/* Tag */}
                    {p.tag && (
                      <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-brand-500 to-volt-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-glow">
                        {p.tag}
                      </span>
                    )}

                    {/* Wishlist */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWish(p.id);
                      }}
                      aria-label="Add to wishlist"
                      className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                        wished
                          ? 'border-red-500/60 bg-red-500 text-white'
                          : 'border-slate-300 bg-white/80 text-slate-700 hover:bg-white dark:border-white/15 dark:bg-black/40 dark:text-slate-200'
                      }`}
                    >
                      <Heart className="h-4 w-4" fill={wished ? 'currentColor' : 'none'} />
                    </button>
                  </Link>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                      {p.category}
                    </p>
                    <Link
                      to={`/products/${p.id}`}
                      className="mt-1 text-base font-bold text-slate-900 hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
                    >
                      {p.name}
                    </Link>

                    <div className="mt-2 flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 text-amber-500" fill="currentColor" />
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {p.rating}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-500">
                        ({p.reviews.toLocaleString()})
                      </span>
                    </div>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                        ${p.price}
                      </span>
                      <span className="text-xs text-slate-500 line-through dark:text-slate-500">
                        ${p.oldPrice}
                      </span>
                    </div>

                    <button className="btn-primary mt-4 w-full !px-4 !py-2.5 text-xs">
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {visible.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-slate-700 dark:text-slate-400">
              No products match your filters.
            </p>
            <button
              onClick={() => {
                setCategory('All');
                setMaxPrice(1000);
              }}
              className="btn-ghost mt-6"
            >
              Reset filters
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}