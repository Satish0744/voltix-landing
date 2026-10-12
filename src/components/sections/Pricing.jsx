import { Check, Sparkles } from 'lucide-react';
import { plans } from '../../data/content.js';
import SectionHeading from '../common/SectionHeading.jsx';
import Reveal from '../common/Reveal.jsx';
import Container from '../common/Container.jsx';

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-28">
      <SectionHeading
        eyebrow="Pricing"
        title="Pick the plan that fits you"
        subtitle="Transparent pricing, no subscriptions, lifetime firmware updates included on every tier."
      />

      <Container className="mt-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 120}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-7 backdrop-blur transition-all duration-500 hover:-translate-y-2 ${
                  plan.featured
                    ? 'border-brand-500/50 bg-gradient-to-b from-brand-500/10 to-volt-500/5 shadow-glow'
                    : 'border-slate-300 bg-slate-100 hover:border-slate-400 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20'
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500 to-volt-500 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-glow">
                    <Sparkles className="mr-1 inline h-3 w-3" />
                    Most popular
                  </span>
                )}

                {/* Plan name — dark in light mode */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {plan.name}
                </h3>

                {/* Description — dark grey in light mode */}
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  {plan.description}
                </p>

                {/* Price — dark in light mode */}
                <div className="mt-6 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="pb-1 text-xs text-slate-600 dark:text-slate-400">
                    {plan.period}
                  </span>
                </div>

                {/* Features list */}
                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.featured
                            ? 'bg-brand-500 text-white'
                            : 'bg-slate-300 text-brand-600 dark:bg-white/10 dark:text-brand-400'
                        }`}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#"
                  className={`mt-8 w-full ${
                    plan.featured ? 'btn-primary' : 'btn-ghost'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Small print */}
        <Reveal delay={300}>
          <p className="mt-10 text-center text-xs text-slate-600 dark:text-slate-500">
            30-day money-back guarantee · Free express shipping · Lifetime firmware updates
          </p>
        </Reveal>
      </Container>
    </section>
  );
}