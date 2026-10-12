import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  Zap,
} from 'lucide-react';
import { footerLinks, socials } from '../../data/content.js';
import Container from '../common/Container.jsx';
import Reveal from '../common/Reveal.jsx';

const iconMap = { Twitter, Instagram, Youtube, Linkedin };

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative mt-10 border-t border-slate-300 bg-slate-100 dark:border-white/10 dark:bg-ink-900/60 transition-colors duration-300"
    >
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand + Contact */}
          <Reveal className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-volt-500 shadow-glow">
                <Zap className="h-5 w-5 text-white" fill="currentColor" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                Volt<span className="gradient-text">ix</span>
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-700 dark:text-slate-400">
              Premium electronics engineered ahead of time. Designed in Berlin,
              built for the world.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-400">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                hello@voltix.io
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                +49 30 1234 5678
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                Berlin · Tokyo · San Francisco
              </li>
            </ul>

            {/* Socials */}
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon, href, label }) => {
                const Icon = iconMap[icon] || Twitter;
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/60 hover:bg-brand-500/10 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </Reveal>

          {/* Link columns */}
          <Reveal delay={100}>
            <FooterColumn title="Shop" links={footerLinks.shop} />
          </Reveal>
          <Reveal delay={200}>
            <FooterColumn title="Company" links={footerLinks.company} />
          </Reveal>
          <Reveal delay={300}>
            <FooterColumn title="Support" links={footerLinks.support} />
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-300 pt-8 dark:border-white/10 sm:flex-row">
          <p className="text-xs text-slate-600 dark:text-slate-500">
            © {new Date().getFullYear()} Voltix Electronics. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-600 dark:text-slate-500">
            <a
              href="#"
              className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
            >
              Cookies
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">
        {title}
      </h4>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="inline-block text-sm text-slate-700 transition-all duration-300 hover:translate-x-1 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}