import { useState } from 'react';
import {
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react';
import Container from '../components/common/Container.jsx';
import Reveal from '../components/common/Reveal.jsx';

const OFFICES = [
  {
    city: 'Berlin',
    role: 'Global HQ',
    address: 'Torstraße 140, 10119 Berlin, Germany',
    phone: '+49 30 1234 5678',
    hours: 'Mon–Fri · 9:00–18:00 CET',
  },
  {
    city: 'Tokyo',
    role: 'Asia-Pacific',
    address: 'Shibuya Scramble Sq, 2-24-12 Shibuya, Tokyo',
    phone: '+81 3 6805 1234',
    hours: 'Mon–Fri · 10:00–19:00 JST',
  },
  {
    city: 'San Francisco',
    role: 'Americas',
    address: '535 Mission St, San Francisco, CA 94105',
    phone: '+1 415 555 0199',
    hours: 'Mon–Fri · 9:00–18:00 PST',
  },
];

const FAQS = [
  {
    q: 'How long does shipping take?',
    a: 'Free express shipping arrives in 48 hours across Europe, 2–3 days in North America, and 2–4 days in Asia-Pacific.',
  },
  {
    q: 'Do you offer returns?',
    a: 'Yes — every device comes with a 30-day money-back guarantee. No questions, no restocking fees.',
  },
  {
    q: 'Is there a warranty?',
    a: 'All Voltix devices ship with a 3-year titanium-grade warranty, extendable to 5 years on Ultimate plans.',
  },
  {
    q: 'Can I pay in installments?',
    a: 'We support split-pay in 3, 6, or 12 monthly instalments at checkout for orders above $199.',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(0);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) return setError('Please enter your name.');
    if (!form.email.includes('@')) return setError('Please enter a valid email.');
    if (form.message.trim().length < 10)
      return setError('Message must be at least 10 characters.');

    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="pt-32 pb-24">
      <Container>
        {/* Header */}
        <Reveal>
          <div className="text-center">
            <span className="inline-block rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Contact
            </span>
            <h1 className="mt-4 text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
              Let's <span className="gradient-text">talk</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-700 dark:text-slate-400">
              Questions, partnerships, press — we reply to every message in under 24 hours.
            </p>
          </div>
        </Reveal>

        {/* Quick contact cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Mail, label: 'Email', value: 'hello@voltix.io' },
            { icon: Phone, label: 'Phone', value: '+49 30 1234 5678' },
            { icon: Clock, label: 'Hours', value: 'Mon–Fri · 9–18 CET' },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <div className="card card-hover flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-volt-500/10 ring-1 ring-brand-500/30">
                  <c.icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    {c.label}
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {c.value}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Form + Map */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <Reveal delay={100}>
            <form
              onSubmit={handleSubmit}
              className="card space-y-5 !p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-volt-500 shadow-glow">
                  <MessageSquare className="h-5 w-5 text-white" />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Send us a message
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    We reply within 24 hours.
                  </p>
                </div>
              </div>

              {sent && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
                  ✓ Message sent. We'll be in touch soon.
                </div>
              )}
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-field">Full name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="label-field">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="label-field">Subject</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="label-field">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="input-field resize-none"
                  placeholder="Tell us a bit more…"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                <Send className="h-4 w-4" />
                Send message
              </button>
            </form>
          </Reveal>

          {/* Map placeholder */}
          <Reveal delay={200}>
            <div className="card relative h-full min-h-[400px] overflow-hidden !p-0">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                alt="Voltix HQ"
                className="absolute inset-0 h-full w-full object-cover opacity-70 dark:opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              <div className="relative flex h-full flex-col justify-end p-8">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  <MapPin className="h-3.5 w-3.5" />
                  Berlin HQ
                </span>
                <h3 className="mt-4 text-2xl font-extrabold text-white">
                  Torstraße 140, Berlin
                </h3>
                <p className="mt-2 max-w-sm text-sm text-white/80">
                  Come by for a coffee. We do lab tours on Fridays at 4 PM.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Offices */}
        <Reveal delay={300}>
          <div className="mt-20">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Our offices
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {OFFICES.map((o, i) => (
                <Reveal key={o.city} delay={i * 80}>
                  <div className="card card-hover h-full">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {o.city}
                      </h3>
                      <span className="rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                        {o.role}
                      </span>
                    </div>

                    <ul className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-400">
                      <li className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                        {o.address}
                      </li>
                      <li className="flex items-start gap-3">
                        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                        {o.phone}
                      </li>
                      <li className="flex items-start gap-3">
                        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                        {o.hours}
                      </li>
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal delay={400}>
          <div className="mt-20">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                Frequently asked questions
              </h2>

              <div className="mt-8 space-y-3">
                {FAQS.map((f, i) => {
                  const isOpen = open === i;
                  return (
                    <div
                      key={f.q}
                      className="overflow-hidden rounded-2xl border border-slate-300 bg-slate-100 dark:border-white/10 dark:bg-white/[0.03]"
                    >
                      <button
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {f.q}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-slate-600 dark:text-slate-400 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 pb-5 text-sm leading-relaxed text-slate-700 dark:text-slate-400">
                            {f.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}