import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
  UserPlus,
  X,
  Zap,
} from 'lucide-react';
import { navLinks } from '../../data/content.js';
import Container from '../common/Container.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('voltix_theme') || 'dark';
  });

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // ---------- Scroll state ----------
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ---------- Theme apply ----------
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('voltix_theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  // ---------- Close profile dropdown on outside click ----------
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setOpen(false);
    navigate('/');
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-ink-950/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-volt-500 shadow-glow transition-transform duration-300 group-hover:scale-110">
              <Zap className="h-5 w-5 text-white" fill="currentColor" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              Volt<span className="gradient-text">ix</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white"
                >
                  {link.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-brand-400 to-volt-400 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: theme toggle + auth */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-700 dark:text-slate-200 transition-all duration-300 hover:scale-105 hover:border-brand-500/50"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            {/* Auth section — desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 pl-1 pr-3 py-1 text-sm font-medium text-slate-700 dark:text-white transition-all duration-300 hover:border-brand-500/50"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-volt-500 text-xs font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        profileOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Profile dropdown */}
                  <div
                    className={`absolute right-0 mt-2 w-64 origin-top-right rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-900 p-2 shadow-xl backdrop-blur-xl transition-all duration-200 ${
                      profileOpen
                        ? 'scale-100 opacity-100'
                        : 'pointer-events-none scale-95 opacity-0'
                    }`}
                  >
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-white/5 p-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-volt-500 text-sm font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="mt-1">
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                      >
                        <User className="h-4 w-4" />
                        View Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary !px-5 !py-2.5 text-xs"
                  >
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-700 dark:text-white lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-500 lg:hidden ${
            open ? 'max-h-[700px] pb-6 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}

            <li className="mt-2 border-t border-slate-200 dark:border-white/10 pt-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-white/5 p-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-volt-500 text-sm font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="mt-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
                  >
                    <User className="h-4 w-4" />
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="btn-ghost w-full"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="btn-primary w-full"
                  >
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </Container>
    </header>
  );
}