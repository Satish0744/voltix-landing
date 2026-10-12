import Container from './Container.jsx';
import Reveal from './Reveal.jsx';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : 'text-left';
  return (
    <Container>
      <Reveal>
        <div className={`max-w-3xl ${alignClass}`}>
          {eyebrow && (
            <span className="inline-block rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-400">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </Reveal>
    </Container>
  );
}