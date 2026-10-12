export default function Button({
  children,
  variant = 'primary',
  href = '#',
  className = '',
  ...props
}) {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-ghost';
  return (
    <a href={href} className={`${base} ${className}`} {...props}>
      {children}
    </a>
  );
}