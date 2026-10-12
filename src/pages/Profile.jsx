import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Box,
  CheckCircle2,
  CreditCard,
  Heart,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Package,
  Pencil,
  Phone,
  Save,
  Settings,
  Shield,
  ShoppingBag,
  Truck,
  User,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import Container from '../components/common/Container.jsx';
import Reveal from '../components/common/Reveal.jsx';

/* ---------------- Dummy order history ---------------- */
const orders = [
  {
    id: 'VX-10294',
    date: 'Mar 14, 2025',
    status: 'Delivered',
    total: '$499.00',
    items: 'Voltix X1 Pro Headset + Accessory Kit',
    icon: Package,
    color: 'text-emerald-500',
  },
  {
    id: 'VX-10261',
    date: 'Feb 28, 2025',
    status: 'In transit',
    total: '$199.00',
    items: 'Voltix Band 2',
    icon: Truck,
    color: 'text-brand-500',
  },
  {
    id: 'VX-10188',
    date: 'Jan 06, 2025',
    status: 'Delivered',
    total: '$899.00',
    items: 'Voltix Studio Bundle',
    icon: Package,
    color: 'text-emerald-500',
  },
];

/* ---------------- Tab definitions ---------------- */
const TABS = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'orders', label: 'Orders', icon: Box },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Profile() {
  const { user, logout, signup } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  // Editable form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
  });

  // Sync form with logged-in user
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '+49 30 1234 5678',
        location: user.location || 'Berlin, Germany',
        bio: user.bio || 'Electronics enthusiast. Owner of 3 Voltix devices.',
      });
    }
  }, [user]);

  /* ---------- Not logged in ---------- */
  if (!user) {
    return (
      <Container className="pt-40 pb-24">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-10 text-center backdrop-blur-xl">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5">
            <Lock className="h-7 w-7 text-slate-400" />
          </span>
          <h1 className="mt-6 text-2xl font-extrabold text-slate-900 dark:text-white">
            You're not signed in
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Please log in to view your profile and orders.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/login" className="btn-primary">
              Go to Login
            </Link>
            <Link to="/signup" className="btn-ghost">
              Create Account
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  /* ---------- Handlers ---------- */
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    // Persist updated name/email into AuthContext
    signup(form.name, form.email);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="relative pt-32 pb-24">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-volt-500/10 blur-[100px]" />

      <Container>
        {/* Back link */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-brand-500 dark:text-slate-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>

        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            {/* ================= SIDEBAR ================= */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-6 backdrop-blur-xl">
                {/* Avatar */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <span className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-volt-500 text-3xl font-extrabold text-white shadow-glow">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-500 dark:border-ink-950">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </span>
                  </div>

                  <h2 className="mt-4 text-lg font-extrabold text-slate-900 dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>
                  <span className="mt-3 inline-block rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-500">
                    Pro Member
                  </span>
                </div>

                {/* Sidebar nav */}
                <nav className="mt-7 space-y-1">
                  {TABS.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                        activeTab === id
                          ? 'bg-gradient-to-r from-brand-500 to-volt-500 text-white shadow-glow'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  ))}

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </nav>

                {/* Quick stats */}
                <div className="mt-7 grid grid-cols-3 gap-2 border-t border-slate-200 pt-6 dark:border-white/10">
                  <Stat label="Orders" value="12" />
                  <Stat label="Wishlist" value="4" />
                  <Stat label="Reviews" value="7" />
                </div>
              </div>
            </aside>

            {/* ================= MAIN CONTENT ================= */}
            <section className="min-w-0">
              {/* -------- Tab: Overview -------- */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Header card */}
                  <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-7 backdrop-blur-xl">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                          My Profile
                        </h1>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          Manage your personal information and preferences.
                        </p>
                      </div>

                      {!editing ? (
                        <button
                          onClick={() => setEditing(true)}
                          className="btn-ghost !px-4 !py-2 text-xs"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit Profile
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditing(false)}
                          className="btn-ghost !px-4 !py-2 text-xs"
                        >
                          <X className="h-3.5 w-3.5" />
                          Cancel
                        </button>
                      )}
                    </div>

                    {saved && (
                      <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500">
                        <CheckCircle2 className="h-4 w-4" />
                        Profile updated successfully.
                      </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSave} className="mt-7 space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          icon={User}
                          label="Full name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          disabled={!editing}
                        />
                        <Field
                          icon={Mail}
                          label="Email address"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          disabled={!editing}
                        />
                        <Field
                          icon={Phone}
                          label="Phone"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          disabled={!editing}
                        />
                        <Field
                          icon={MapPin}
                          label="Location"
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          disabled={!editing}
                        />
                      </div>

                      <div>
                        <label className="label-field">Bio</label>
                        <textarea
                          name="bio"
                          value={form.bio}
                          onChange={handleChange}
                          disabled={!editing}
                          rows={3}
                          className="input-field resize-none disabled:opacity-70"
                        />
                      </div>

                      {editing && (
                        <button type="submit" className="btn-primary">
                          <Save className="h-4 w-4" />
                          Save Changes
                        </button>
                      )}
                    </form>
                  </div>

                  {/* Preferences */}
                  <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-7 backdrop-blur-xl">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Preferences
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Control notifications and account security.
                    </p>

                    <div className="mt-6 space-y-3">
                      <Toggle
                        icon={Bell}
                        title="Email notifications"
                        description="Order updates, shipping alerts and offers."
                        defaultOn
                      />
                      <Toggle
                        icon={Heart}
                        title="Wishlist reminders"
                        description="Get notified when saved items go on sale."
                      />
                      <Toggle
                        icon={Shield}
                        title="Two-factor authentication"
                        description="Add an extra layer of security to your account."
                        defaultOn
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* -------- Tab: Orders -------- */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-7 backdrop-blur-xl">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                          Order History
                        </h1>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          Track and manage all your Voltix orders.
                        </p>
                      </div>
                      <Link to="/" className="btn-primary !px-4 !py-2 text-xs">
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Shop More
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {orders.map((order) => {
                      const Icon = order.icon;
                      return (
                        <div
                          key={order.id}
                          className="group flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-brand-500/40 hover:-translate-y-0.5 hover:shadow-glow"
                        >
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-volt-500/10 ring-1 ring-brand-500/30">
                            <Icon className={`h-5 w-5 ${order.color}`} />
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-bold text-slate-900 dark:text-white">
                                {order.id}
                              </p>
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                                  order.status === 'Delivered'
                                    ? 'bg-emerald-500/10 text-emerald-500'
                                    : 'bg-brand-500/10 text-brand-500'
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                            <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                              {order.items}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                              {order.date}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                              {order.total}
                            </p>
                            <button className="mt-1 text-xs font-semibold text-brand-500 hover:text-brand-400">
                              View invoice
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* -------- Tab: Settings -------- */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-7 backdrop-blur-xl">
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      Account Settings
                    </h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Update your password, payment methods and privacy.
                    </p>

                    <div className="mt-7 space-y-3">
                      <SettingRow
                        icon={Lock}
                        title="Change Password"
                        description="Last updated 3 months ago"
                        cta="Update"
                      />
                      <SettingRow
                        icon={CreditCard}
                        title="Payment Methods"
                        description="Visa ending in 4242"
                        cta="Manage"
                      />
                      <SettingRow
                        icon={MapPin}
                        title="Shipping Addresses"
                        description="2 saved addresses"
                        cta="Edit"
                      />
                      <SettingRow
                        icon={Bell}
                        title="Notification Preferences"
                        description="Email and push notifications"
                        cta="Configure"
                      />
                    </div>
                  </div>

                  {/* Danger zone */}
                  <div className="rounded-3xl border border-red-500/30 bg-red-500/[0.03] p-7 backdrop-blur-xl">
                    <h3 className="text-lg font-bold text-red-500">
                      Danger zone
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Once you delete your account, there is no going back.
                    </p>
                    <button className="mt-5 inline-flex items-center gap-2 rounded-full border border-red-500/50 px-5 py-2.5 text-sm font-semibold text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white">
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

/* ===================== Sub-components ===================== */

function Stat({ label, value }) {
  return (
    <div className="text-center">
      <p className="text-lg font-extrabold text-slate-900 dark:text-white">
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
        {label}
      </p>
    </div>
  );
}

function Field({ icon: Icon, label, disabled, ...props }) {
  return (
    <div>
      <label className="label-field">{label}</label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          {...props}
          disabled={disabled}
          className="input-field pl-10 disabled:cursor-not-allowed disabled:opacity-70"
        />
      </div>
    </div>
  );
}

function Toggle({ icon: Icon, title, description, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-white/10 p-4 transition-colors hover:border-brand-500/30">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5">
          <Icon className="h-4 w-4 text-brand-500" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {title}
          </p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <button
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
          on ? 'bg-gradient-to-r from-brand-500 to-volt-500' : 'bg-slate-300 dark:bg-white/10'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
            on ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

function SettingRow({ icon: Icon, title, description, cta }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-white/10 p-4 transition-colors hover:border-brand-500/30">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-volt-500/10 ring-1 ring-brand-500/30">
          <Icon className="h-4 w-4 text-brand-500" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {title}
          </p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <button className="rounded-full border border-slate-300 dark:border-white/15 px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all duration-300 hover:border-brand-500/50 hover:text-brand-500">
        {cta}
      </button>
    </div>
  );
}