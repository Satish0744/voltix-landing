import { Quote, Star } from 'lucide-react';
import { testimonials } from '../../data/content.js';
import SectionHeading from '../common/SectionHeading.jsx';
import Reveal from '../common/Reveal.jsx';
import Container from '../common/Container.jsx';

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-28">
      <SectionHeading
        eyebrow="Testimonials"
        title="Loved by makers, runners & creators"
        subtitle="Don't take our word for it — here's what 12,400+ Voltix owners have to say."
      />

      <Container className="mt-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, index) => (
            <Reveal key={t.name} delay={index * 100}>
              <div className="card card-hover group flex h-full flex-col">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-brand-600 dark:text-brand-400/40 transition-colors group-hover:text-brand-500 dark:group-hover:text-brand-400" />

                {/* Stars */}
                <div className="mt-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-amber-500"
                      fill="currentColor"
                    />
                  ))}
                </div>

                {/* Quote text — dark in light mode, light in dark mode */}
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-800 dark:text-slate-300">
                  "{t.quote}"
                </p>

                {/* Author — dark text in light mode */}
                <div className="mt-6 flex items-center gap-3 border-t border-slate-300 dark:border-white/10 pt-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-brand-500/40 dark:ring-brand-500/30"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}