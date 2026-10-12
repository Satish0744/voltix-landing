import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import Container from '../components/common/Container.jsx';

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container className="pt-40 pb-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          You're not signed in
        </h1>
        <Link to="/login" className="btn-primary mt-6 inline-flex">
          Go to Login
        </Link>
      </Container>
    );
  }

  return (
    <Container className="pt-40 pb-24">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>

        <div className="card">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-volt-500 text-xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {user.name}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Voltix Member
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-white/10 p-4">
              <User className="h-5 w-5 text-brand-500" />
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Full name
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-white/10 p-4">
              <Mail className="h-5 w-5 text-brand-500" />
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Email
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}