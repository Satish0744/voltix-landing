import {
  CreditCard,
  MousePointerClick,
  PackageCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { steps } from '../../data/content.js';
import SectionHeading from '../common/SectionHeading.jsx';
import Reveal from '../common/Reveal.jsx';
import Container from '../common/Container.jsx';

const iconMap = { MousePointerClick, SlidersHorizontal, CreditCard, PackageCheck };

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-28">
      <SectionHeading
        eyebrow="How it works"
        title="From cart to doorstep in 48 hours"
        subtitle="A friction-free buying experience designed around you — no hidden fees, no dark patterns, no waiting."
      />

      <Container className="mt-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon] || MousePointerClick;
            return (
              <Reveal key={step.number} delay={index * 100}>
                <div className="card card-hover group relative h-full">
                  <span className="absolute right-4 top-3 text-5xl font-black text-white/5 transition-colors group-hover:text-brand-500/20">
                    {step.number}
                  </span>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-volt-500 shadow-glow transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="relative mt-5 text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-400">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}