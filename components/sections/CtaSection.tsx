'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/components/providers/LanguageProvider'

const EASE = [0.16, 1, 0.3, 1] as const

const T = {
  en: {
    label: 'Begin here',
    h2a: 'Create space',
    h2b: 'for',
    h2em: 'silence.',
    sub: 'Bring warmth into your rituals. One handcrafted object at a time. For the home you deserve.',
    cta: 'Enter the Ritual',
  },
  uk: {
    label: 'Почни тут',
    h2a: 'Створи простір',
    h2b: 'для',
    h2em: 'тиші.',
    sub: 'Принеси тепло у свої ритуали. Один виріб ручної роботи за раз. Для дому, на який ти заслуговуєш.',
    cta: 'Увійти в ритуал',
  },
}

export default function CtaSection() {
  const { lang } = useLanguage()
  const t = T[lang]
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative overflow-hidden"
      style={{ background: '#080604', minHeight: '80vh', display: 'flex', alignItems: 'center' }}
    >
      <motion.div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute" style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(160, 90, 25, 0.07), transparent 65%)', filter: 'blur(80px)' }} />
      </motion.div>

      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />

      <div ref={titleRef} className="relative z-10 w-full max-w-[1000px] mx-auto px-8 md:px-16 py-28 text-center">
        <motion.span
          className="font-sans text-[9px] tracking-[0.5em] uppercase block mb-12"
          style={{ color: 'rgba(180, 130, 60, 0.45)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
        >
          {t.label}
        </motion.span>

        <motion.h2
          className="font-serif font-light"
          style={{ fontSize: 'clamp(36px, 6vw, 88px)', color: 'rgba(240, 225, 200, 0.9)', letterSpacing: '-0.02em', lineHeight: 1.0 }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.3, delay: 0.1, ease: EASE }}
        >
          {t.h2a}
          <br />
          {t.h2b}{' '}
          <em className="font-serif" style={{ color: 'rgba(200, 155, 80, 0.85)' }}>{t.h2em}</em>
        </motion.h2>

        <motion.p
          className="font-sans mt-8 max-w-[360px] mx-auto leading-8 text-sm"
          style={{ color: 'rgba(150, 135, 110, 0.7)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          {t.sub}
        </motion.p>

        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.6, ease: EASE }}
        >
          <a
            href="#collections"
            className="group inline-flex items-center gap-4 font-sans text-[11px] tracking-[0.25em] uppercase transition-all duration-500"
            style={{ border: '1px solid rgba(180, 130, 50, 0.4)', color: 'rgba(220, 185, 105, 0.85)', padding: '18px 48px' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(180, 130, 50, 0.1)'; e.currentTarget.style.borderColor = 'rgba(200, 155, 75, 0.65)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(180, 130, 50, 0.4)' }}
          >
            {t.cta}
            <span className="block h-px transition-all duration-500 group-hover:w-8" style={{ background: 'currentColor', width: '20px' }} />
          </a>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-6 mt-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="h-px w-12" style={{ background: 'rgba(180, 130, 60, 0.15)' }} />
          <span className="font-serif italic text-sm" style={{ color: 'rgba(150, 130, 95, 0.4)' }}>Luminis</span>
          <div className="h-px w-12" style={{ background: 'rgba(180, 130, 60, 0.15)' }} />
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #080604)' }} />
    </section>
  )
}
