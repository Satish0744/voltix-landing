import useScrollReveal from '../../hooks/useScrollReveal.js';

export default function Reveal({ children, delay = 0, className = '' }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}