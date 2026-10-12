import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { AuthShell } from './Login.jsx';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (form.name.trim().length < 2) return setError('Please enter your name.');
    if (!form.email.includes('@')) return setError('Please enter a valid email.');
    if (form.password.length < 6)
      return setError('Password must be at least 6 characters.');
    if (form.password !== form.confirm)
      return setError('Passwords do not match.');

    setLoading(true);
    setTimeout(() => {
      signup(form.name.trim(), form.email);
      setLoading(false);
      navigate('/');
    }, 600);
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join 12,400+ owners. Get 10% off your first order."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Name */}
        <div>
          <label className="label-field">Full name</label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="input-field pl-10"
              required
            />
          </div>
        </div>

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
          <label className="label-field">Password</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type={showPw ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
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

        {/* Confirm */}
        <div>
          <label className="label-field">Confirm password</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type={showPw ? 'text' : 'password'}
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Repeat password"
              className="input-field pl-10"
              required
            />
          </div>
        </div>

        <label className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded accent-brand-500"
          />
          I agree to the Terms of Service and Privacy Policy.
        </label>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-60"
        >
          <UserPlus className="h-4 w-4" />
          {loading ? 'Creating account…' : 'Create Account'}
        </button>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-brand-500 hover:text-brand-400"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}