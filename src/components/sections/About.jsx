import { Award, Globe, Users } from 'lucide-react';
import Container from '../common/Container.jsx';
import Reveal from '../common/Reveal.jsx';

const stats = [
  { icon: Users, value: '12.4K+', label: 'Happy customers' },
  { icon: Globe, value: '48h', label: 'Global shipping' },
  { icon: Award, value: '38', label: 'Design awards' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-500/20 to-volt-500/10 blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                alt="Voltix engineering lab"
                className="relative w-full rounded-3xl border border-white/10 object-cover shadow-2xl"
                loading="lazy"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-4 hidden animate-float-slow rounded-2xl border border-white/10 bg-ink-900/90 p-4 backdrop-blur-xl sm:block">
                <p className="text-3xl font-extrabold gradient-text">99.9%</p>
                <p className="text-xs text-slate-400">Quality pass rate</p>
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <div>
            <Reveal>
              <span className="inline-block rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-400">
                About Voltix
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                We build tech that <span className="gradient-text">outlasts trends.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 text-base leading-relaxed text-slate-400">
                Founded in 2016 by a team of ex-aerospace engineers, Voltix exists to
                prove that premium electronics can be both beautiful and brutally
                durable. Every product is designed in-house and stress-tested for
                over 10,000 hours before it reaches your hands.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-4 text-base leading-relaxed text-slate-400">
                We obsess over the details others skip — the click of a hinge, the
                warmth of a material, the microsecond of latency. That obsession is
                why our customers keep coming back.
              </p>
            </Reveal>

            {/* Stats */}
            <Reveal delay={400}>
              <div className="mt-10 grid grid-cols-3 gap-4">
                {stats.map(({ icon: Icon, value, label }) => (
                  <div
                    key={label}
                    className="card card-hover text-center sm:text-left"
                  >
                    <Icon className="mx-auto h-6 w-6 text-brand-400 sm:mx-0" />
                    <p className="mt-3 text-2xl font-extrabold text-white">{value}</p>
                    <p className="text-xs text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}