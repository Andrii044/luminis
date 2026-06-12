'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'

const EASE = [0.16, 1, 0.3, 1] as const

const T = {
  en: {
    eyebrow: 'Objects for quiet rituals',
    h1a: 'Light the',
    h1em: 'quiet',
    h1b: 'moments.',
    sub: 'Handcrafted atmospheres for the hour when the world slows down.',
    cta1: 'Explore Collection',
    cta2: 'Create Your Ritual',
    scroll: 'Scroll',
  },
  uk: {
    eyebrow: "Об'єкти для тихих ритуалів",
    h1a: 'Запали',
    h1em: 'тихі',
    h1b: 'моменти.',
    sub: 'Вироби ручної роботи для годин, коли світ сповільнюється.',
    cta1: 'Переглянути колекцію',
    cta2: 'Створити ритуал',
    scroll: 'Прокрути',
  },
} as const

const smokeWisps = [
  { left: '49%',   delay: '0s',   duration: '4.2s', width: '12px', height: '55px' },
  { left: '50.5%', delay: '1.1s', duration: '3.8s', width: '10px', height: '48px' },
  { left: '48.5%', delay: '2s',   duration: '4.6s', width: '14px', height: '62px' },
  { left: '51%',   delay: '0.5s', duration: '3.5s', width: '9px',  height: '44px' },
  { left: '49.5%', delay: '1.7s', duration: '5s',   width: '16px', height: '70px' },
]

export default function HeroSection() {
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0D0A08' }}
    >
      {/* Background ambient layers */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute"
          style={{
            bottom: '-5%', left: '50%', transform: 'translateX(-50%)',
            width: '700px', height: '450px', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(180,95,30,0.13) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute ambient-glow"
          style={{
            bottom: '26%', left: '50%', transform: 'translateX(-50%)',
            width: '180px', height: '240px', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(220,130,40,0.1) 0%, transparent 70%)',
            filter: 'blur(30px)',
            '--pulse-duration': '3.5s',
          } as React.CSSProperties}
        />
        <div className="absolute inset-x-0 top-0 h-48" style={{ background: 'linear-gradient(to bottom, #0D0A08, transparent)' }} />
        <div className="absolute inset-x-0 bottom-0 h-48" style={{ background: 'linear-gradient(to top, #0D0A08, transparent)' }} />
      </div>

      {/* Smoke wisps */}
      <div aria-hidden="true" className="absolute" style={{ bottom: '30%', left: 0, right: 0, height: '200px' }}>
        {smokeWisps.map((w, i) => (
          <div
            key={i}
            className="smoke-wisp"
            style={{
              position: 'absolute', bottom: 0, left: w.left,
              width: w.width, height: w.height,
              animationDelay: w.delay,
              '--duration': w.duration,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Candle */}
      <div aria-hidden="true" className="absolute" style={{ bottom: '27%', left: '50%', transform: 'translateX(-50%)' }}>
        <div className="candle-flame mx-auto mb-0.5" style={{ width: '8px' }}>
          <div style={{ width: '8px', height: '16px', background: 'radial-gradient(ellipse at 50% 70%, #F5C060, #E8883A 50%, transparent 100%)', borderRadius: '50% 50% 30% 30%', filter: 'blur(1px)', margin: '0 auto' }} />
          <div style={{ position: 'absolute', top: '4px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '8px', background: 'radial-gradient(ellipse, #FFF8E0, #F5C060)', borderRadius: '50% 50% 30% 30%', filter: 'blur(0.5px)' }} />
        </div>
        <div style={{ width: '22px', height: '90px', background: 'linear-gradient(to right, #D4C4AE, #E8DDD0 40%, #D0C0AA)', borderRadius: '2px 2px 1px 1px', opacity: 0.45 }} />
        <div style={{ width: '28px', height: '6px', background: 'radial-gradient(ellipse, rgba(220,200,165,0.4), transparent)', borderRadius: '50%', marginLeft: '-3px' }} />
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.span
          className="block font-sans text-[9px] tracking-[0.55em] uppercase mb-8"
          style={{ color: 'rgba(180, 130, 60, 0.65)' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.9, ease: EASE }}
        >
          {t.eyebrow}
        </motion.span>

        <motion.h1
          className="font-serif font-light leading-[0.88] text-stone-100"
          style={{ fontSize: 'clamp(56px, 9vw, 120px)', letterSpacing: '-0.01em' }}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 3.1, ease: EASE }}
        >
          {t.h1a}
          <br />
          <em className="font-serif not-italic" style={{ color: 'rgba(240,220,185,0.9)' }}>{t.h1em}</em>
          <br />
          {t.h1b}
        </motion.h1>

        <motion.p
          className="font-sans mt-8 max-w-xs mx-auto leading-7"
          style={{ fontSize: '13px', color: 'rgba(160, 145, 130, 0.75)', letterSpacing: '0.02em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 3.6, ease: EASE }}
        >
          {t.sub}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 4.0, ease: EASE }}
        >
          <a
            href="#collections"
            className="font-sans text-[10px] tracking-[0.2em] uppercase px-8 py-4 transition-all duration-500"
            style={{ border: '1px solid rgba(180, 130, 50, 0.35)', color: 'rgba(220, 190, 130, 0.85)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(180,130,50,0.09)'; e.currentTarget.style.borderColor = 'rgba(180,130,50,0.55)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(180,130,50,0.35)' }}
          >
            {t.cta1}
          </a>
          <a
            href="#the-ritual"
            className="font-sans text-[10px] tracking-[0.2em] uppercase px-8 py-4 transition-all duration-500"
            style={{ background: 'rgba(180,130,50,0.1)', color: 'rgba(220, 190, 130, 0.85)', border: '1px solid transparent' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(180,130,50,0.18)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(180,130,50,0.1)' }}
          >
            {t.cta2}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4.5 }}
      >
        <span className="font-sans text-[8px] tracking-[0.4em] uppercase" style={{ color: 'rgba(160, 140, 115, 0.45)' }}>
          {t.scroll}
        </span>
        <div className="w-px overflow-hidden" style={{ height: '48px', background: 'rgba(180,130,60,0.12)' }}>
          <div className="w-full h-full scroll-reveal-line" style={{ background: 'linear-gradient(to bottom, rgba(180,130,60,0.5), transparent)' }} />
        </div>
      </motion.div>
    </section>
  )
}
