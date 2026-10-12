import {
  Cpu,
  ShieldCheck,
  Sparkles,
  Waves,
  Wifi,
  Zap,
} from 'lucide-react';
import { features } from '../../data/content.js';
import SectionHeading from '../common/SectionHeading.jsx';
import Reveal from '../common/Reveal.jsx';
import Container from '../common/Container.jsx';
import Products from '../../pages/Products.jsx';

const iconMap = { Zap, Cpu, Waves, ShieldCheck, Wifi, Sparkles };

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-28">
      <SectionHeading
        eyebrow="Features"
        title="Engineered for the next decade"
        subtitle="Every Voltix device packs breakthrough technology that you can actually feel — not just read about on a spec sheet."
      />

      <Container className="mt-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <Reveal key={feature.title} delay={index * 80}>
                <div className="card card-hover group h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-volt-500/10 ring-1 ring-brand-500/30 transition-all duration-300 group-hover:scale-110 group-hover:ring-brand-400/60">
                    <Icon className="h-6 w-6 text-brand-400" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Products></Products>
      </Container>
    </section>
  );
}