import { ArrowRight, Play, Star } from 'lucide-react';

import Container from '../common/Container.jsx';

import Reveal from '../common/Reveal.jsx';



/* ---- Small orbiting product images ---- */

const ORBIT_IMAGES = [

  {

    src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80',

    alt: 'Smartwatch',

    size: 'h-20 w-20 sm:h-24 sm:w-24',

    position: 'top-0 left-1/2 -translate-x-1/2 -translate-y-2',

    delay: '0s',

  },

  {

    src: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80',

    alt: 'Earbuds',

    size: 'h-20 w-20 sm:h-24 sm:w-24',

    position: 'top-[22%] right-0 translate-x-2',

    delay: '0.6s',

  },

  {

    src: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80',

    alt: 'Keyboard',

    size: 'h-20 w-20 sm:h-24 sm:w-24',

    position: 'bottom-[16%] right-[6%]',

    delay: '1.2s',

  },

  {

    src: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=300&q=80',

    alt: 'Studio headset',

    size: 'h-20 w-20 sm:h-24 sm:w-24',

    position: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-2',

    delay: '1.8s',

  },

  {

    src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=300&q=80',

    alt: 'Watch Pro',

    size: 'h-20 w-20 sm:h-24 sm:w-24',

    position: 'bottom-[16%] left-[6%]',

    delay: '2.4s',

  },

  {

    src: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=300&q=80',

    alt: 'Power bank',

    size: 'h-20 w-20 sm:h-24 sm:w-24',

    position: 'top-[22%] left-0 -translate-x-2',

    delay: '3s',

  },

];



export default function Hero() {

  return (

    <section

      id="home"

      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"

    >

      {/* Ambient glows */}

      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-volt-500/10 blur-[100px]" />



      <Container>

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">

          {/* ================= LEFT CONTENT ================= */}

          <div className="text-center lg:text-left">

            <Reveal>

              <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300">

                <span className="h-2 w-2 animate-pulse rounded-full bg-volt-500 dark:bg-volt-400" />

                New — Voltix X1 Pro is here

              </span>

            </Reveal>



            <Reveal delay={100}>

              <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">

                Electronics

                <br />

                engineered{' '}

                <span className="gradient-text">ahead</span>

                <br />

                of time.

              </h1>

            </Reveal>



            <Reveal delay={200}>

              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-slate-700 dark:text-slate-400 sm:text-lg lg:mx-0">

                Premium audio, wearables and smart devices crafted with titanium

                precision and powered by on-device AI. Free 48-hour express

                shipping on every order.

              </p>

            </Reveal>



            <Reveal delay={300}>

              <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">

                <a href="/products" className="btn-primary group w-full sm:w-auto">

                  Shop the lineup

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

                </a>

                <a href="#how-it-works" className="btn-ghost w-full sm:w-auto">

                  <Play className="h-4 w-4" fill="currentColor" />

                  Watch the film

                </a>

              </div>

            </Reveal>



            <Reveal delay={400}>

              <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row lg:justify-start">

                <div className="flex -space-x-3">

                  {[12, 33, 45, 47].map((id) => (

                    <img

                      key={id}

                      src={`https://i.pravatar.cc/80?img=${id}`}

                      alt="Happy customer"

                      className="h-10 w-10 rounded-full border-2 border-slate-100 object-cover dark:border-ink-950"

                      loading="lazy"

                    />

                  ))}

                </div>

                <div className="text-center sm:text-left">

                  <div className="flex items-center justify-center gap-1 sm:justify-start">

                    {Array.from({ length: 5 }).map((_, i) => (

                      <Star

                        key={i}

                        className="h-4 w-4 text-amber-500"

                        fill="currentColor"

                      />

                    ))}

                    <span className="ml-2 text-sm font-semibold text-slate-900 dark:text-white">

                      4.9/5

                    </span>

                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400">

                    From 12,400+ verified owners

                  </p>

                </div>

              </div>

            </Reveal>

          </div>



          {/* ================= RIGHT VISUAL — ORBITAL ================= */}

          <Reveal delay={200}>

            <div className="relative mx-auto flex h-[420px] w-full max-w-[520px] items-center justify-center sm:h-[520px]">

              {/* Rotating dashed ring */}

              <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-brand-500/25 dark:border-brand-500/20" />

              {/* Static inner ring */}

              <div className="absolute inset-8 rounded-full border border-slate-300/60 dark:border-white/5" />

              <div className="absolute inset-20 rounded-full border border-slate-300/40 dark:border-white/[0.03]" />



              {/* Glow behind product */}

              <div className="absolute h-56 w-56 rounded-full bg-brand-500/30 blur-[80px]" />

              <div className="absolute h-40 w-40 rounded-full bg-volt-500/20 blur-[60px]" />



              {/* ---- Center large product ---- */}

              <div className="relative z-20 flex h-52 w-52 items-center justify-center rounded-full border border-slate-300 bg-slate-100 p-2 shadow-2xl dark:border-white/10 dark:bg-white/5 sm:h-60 sm:w-60">

                <img

                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"

                  alt="Voltix X1 Pro headphones"

                  className="h-full w-full animate-float rounded-full object-cover"

                  loading="lazy"

                />

              </div>



              {/* ---- Orbiting small images ---- */}

              {ORBIT_IMAGES.map((img, i) => (

                <div

                  key={i}

                  className={`absolute z-30 ${img.position}`}

                  style={{

                    animation: `floatOrbit 6s ease-in-out ${img.delay} infinite`,

                  }}

                >

                  <div

                    className={`${img.size} flex items-center justify-center overflow-hidden rounded-full border-2 border-slate-300 bg-slate-100 p-0.5 shadow-xl backdrop-blur transition-transform duration-500 hover:scale-125 dark:border-white/15 dark:bg-white/5`}

                  >

                    <img

                      src={img.src}

                      alt={img.alt}

                      className="h-full w-full rounded-full object-cover"

                      loading="lazy"

                    />

                  </div>

                </div>

              ))}



              {/* ---- Floating stat badge top-right ---- */}

             



              {/* ---- Floating stat badge bottom-left ---- */}

            



              {/* ---- Pricing badge bottom-right ---- */}

              <div

                className="absolute bottom-6 right-8 z-40 hidden animate-float-slow rounded-full bg-gradient-to-r from-brand-500 to-volt-500 px-4 py-2 shadow-glow dark:block"

                style={{ animationDelay: '2.2s' }}

              >

                <p className="text-xs font-bold text-white">From $199</p>

              </div>

            </div>

          </Reveal>

        </div>

      </Container>



      {/* ---- Custom keyframes for the orbit float ---- */}

      <style>{`

        @keyframes floatOrbit {

          0%, 100% { transform: translateY(0px) scale(1); }

          50%      { transform: translateY(-14px) scale(1.05); }

        }

      `}</style>

    </section>

  );

}