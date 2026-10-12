import { useState } from 'react';
import { ArrowUpRight, Calendar, Clock, User } from 'lucide-react';
import Container from '../components/common/Container.jsx';
import Reveal from '../components/common/Reveal.jsx';

const POSTS = [
  {
    id: 1,
    title: 'Inside the NeuroCore X2 chip: how we cut power draw by 30%',
    excerpt:
      'A deep dive into the silicon, the compiler tricks, and the design decisions that make our new processor so efficient.',
    category: 'Engineering',
    author: 'Dr. Lena Vogt',
    date: 'Mar 18, 2025',
    read: '9 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    id: 2,
    title: 'Why titanium is worth the extra cost',
    excerpt: 'Material science, longevity, and why our chassis outlives every trend.',
    category: 'Design',
    author: 'Marco Silva',
    date: 'Mar 11, 2025',
    read: '5 min read',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'How to get 3 days of battery from any Voltix device',
    excerpt: 'Ten settings most people never touch — but should.',
    category: 'Guides',
    author: 'Priya Sharma',
    date: 'Mar 04, 2025',
    read: '4 min read',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    title: 'Voltix Studio Bundle wins Red Dot Award 2025',
    excerpt: 'Our flagship bundle took home the top prize for industrial design.',
    category: 'News',
    author: 'Voltix Team',
    date: 'Feb 22, 2025',
    read: '3 min read',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    title: 'Designing audio for spatial computing',
    excerpt: 'What changes when sound has to react to your head, in real time.',
    category: 'Engineering',
    author: 'Dr. Lena Vogt',
    date: 'Feb 15, 2025',
    read: '7 min read',
    image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    title: 'Sustainability report 2024: what we shipped, what we saved',
    excerpt: 'Recycled titanium, plastic-free packaging, and carbon-neutral logistics.',
    category: 'News',
    author: 'Voltix Team',
    date: 'Feb 06, 2025',
    read: '6 min read',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80',
  },
];

const CATEGORIES = ['All', 'Engineering', 'Design', 'Guides', 'News'];

export default function Blog() {
  const [category, setCategory] = useState('All');
  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);
  const visible =
    category === 'All' ? rest : rest.filter((p) => p.category === category);

  return (
    <div className="pt-32 pb-24">
      <Container>
        {/* Header */}
        <Reveal>
          <div className="text-center">
            <span className="inline-block rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Journal
            </span>
            <h1 className="mt-4 text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
              Ideas from the <span className="gradient-text">Voltix</span> lab
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-700 dark:text-slate-400">
              Engineering deep-dives, design notes, and the occasional strong opinion.
            </p>
          </div>
        </Reveal>

        {/* Featured */}
        {featured && (
          <Reveal delay={100}>
            <article className="group mt-14 grid overflow-hidden rounded-3xl border border-slate-300 bg-slate-100 dark:border-white/10 dark:bg-white/[0.03] lg:grid-cols-2">
              <div className="relative aspect-video overflow-hidden lg:aspect-auto">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-brand-500 to-volt-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-glow">
                  Featured
                </span>
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-10">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 font-semibold text-brand-600 dark:text-brand-400">
                    {featured.category}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-400">
                  {featured.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-700 dark:text-slate-400">
                  <Meta icon={User} text={featured.author} />
                  <Meta icon={Calendar} text={featured.date} />
                  <Meta icon={Clock} text={featured.read} />
                </div>

                <a
                  href="#"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
                >
                  Read the full story
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </article>
          </Reveal>
        )}

        {/* Category chips */}
        <Reveal delay={200}>
          <div className="mt-16 flex flex-wrap justify-center gap-2">
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
        </Reveal>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <article className="card card-hover group flex h-full flex-col overflow-hidden !p-0">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                    {p.category}
                  </span>
                  <h3 className="mt-2 text-lg font-bold leading-tight text-slate-900 dark:text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-400">
                    {p.excerpt}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-300 pt-4 text-xs text-slate-700 dark:border-white/10 dark:text-slate-400">
                    <Meta icon={User} text={p.author} />
                    <Meta icon={Clock} text={p.read} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-slate-700 dark:text-slate-400">
            No posts in this category yet.
          </p>
        )}
      </Container>
    </div>
  );
}

function Meta({ icon: Icon, text }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5" />
      {text}
    </span>
  );
}