import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.email.includes('@')) return setError('Please enter a valid email.');
    if (form.password.length < 6)
      return setError('Password must be at least 6 characters.');

    setLoading(true);
    setTimeout(() => {
      login(form.email, form.password);
      setLoading(false);
      navigate('/');
    }, 600);
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to your Voltix account to track orders and manage devices."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="label-field">Email address</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input-field pl-10"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between">
            <label className="label-field">Password</label>
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-brand-500 hover:text-brand-400"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type={showPw ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input-field pl-10 pr-11"
              required
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Remember + submit */}
        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <input type="checkbox" className="h-4 w-4 rounded accent-brand-500" />
          Keep me signed in
        </label>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-brand-500 hover:text-brand-400"
          >
            Create one
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

/* ---------- Shared shell for auth pages ---------- */
export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-24">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-volt-500/10 blur-[100px]" />

      <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="mb-8 flex items-center justify-center gap-2 group"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-volt-500 shadow-glow transition-transform duration-300 group-hover:scale-110">
            <Zap className="h-5 w-5 text-white" fill="currentColor" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Volt<span className="gradient-text">ix</span>
          </span>
        </Link>

        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-8 backdrop-blur-xl shadow-2xl">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
          <div className="mt-7">{children}</div>
        </div>
      </div>
    </div>
  );
}