'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/components/providers/LanguageProvider'

const EASE = [0.16, 1, 0.3, 1] as const

const T = {
  en: {
    label: 'The Experience',
    lines: ['There is a type of quiet', 'that only exists at home.', '', 'When the candle is lit', 'and the hour belongs', 'entirely to you.'],
    tagline: 'Luminis — Objects for quiet rituals',
  },
  uk: {
    label: 'Досвід',
    lines: ['Є особлива тиша,', 'яка існує лише вдома.', '', 'Коли свічка запалена', 'і ця година належить', 'лише тобі.'],
    tagline: "Luminis — Об'єкти для тихих ритуалів",
  },
}

export default function ImmersiveSection() {
  const { lang } = useLanguage()
  const t = T[lang]
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  const y1 = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-100px' })

  return (
    <section id="the-ritual" ref={sectionRef} className="relative overflow-hidden" style={{ background: '#080604', minHeight: '100vh' }}>
      <motion.div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ y: y1 }}>
        <div className="absolute" style={{ top: '20%', left: '15%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(160, 90, 25, 0.07), transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute" style={{ bottom: '15%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(100, 95, 130, 0.05), transparent 70%)', filter: 'blur(60px)' }} />
      </motion.div>

      <motion.div aria-hidden="true" className="absolute right-16 top-1/4 floating" style={{ y: y2 }}>
        <div style={{ width: '1px', height: '120px', background: 'linear-gradient(to bottom, transparent, rgba(180,130,60,0.25), transparent)' }} />
      </motion.div>

      <motion.div aria-hidden="true" className="absolute left-12 bottom-1/3 floating" style={{ y: y1, animationDelay: '1.5s' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(180, 130, 60, 0.12)' }} />
      </motion.div>

      <motion.div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 text-center" style={{ opacity }}>
        <motion.span
          ref={titleRef}
          className="font-sans text-[9px] tracking-[0.5em] uppercase block mb-16"
          style={{ color: 'rgba(180, 130, 60, 0.45)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
        >
          {t.label}
        </motion.span>

        <div className="flex flex-col items-center gap-0">
          {t.lines.map((line, i) =>
            line === '' ? (
              <div key={i} style={{ height: '28px' }} />
            ) : (
              <motion.p
                key={i}
                className="font-serif font-light overflow-hidden"
                style={{ fontSize: 'clamp(22px, 3.5vw, 48px)', color: i < 2 ? 'rgba(240, 225, 200, 0.88)' : 'rgba(180, 160, 130, 0.65)', letterSpacing: '-0.01em', lineHeight: 1.25 }}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.15 + i * 0.12, ease: EASE }}
              >
                {line}
              </motion.p>
            )
          )}
        </div>

        <motion.div
          className="flex items-center gap-6 mt-16 mb-12"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 1.1, ease: EASE }}
        >
          <div className="h-px w-16" style={{ background: 'rgba(180,130,60,0.2)' }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(200, 150, 70, 0.45)' }} />
          <div className="h-px w-16" style={{ background: 'rgba(180,130,60,0.2)' }} />
        </motion.div>

        <motion.p
          className="font-sans text-[10px] tracking-[0.3em] uppercase"
          style={{ color: 'rgba(140, 120, 95, 0.5)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
        >
          {t.tagline}
        </motion.p>

        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <p className="font-serif font-light" style={{ fontSize: 'clamp(120px, 20vw, 300px)', color: 'rgba(255,255,255,0.012)', letterSpacing: '0.05em', lineHeight: 1, whiteSpace: 'nowrap' }}>
            ritual
          </p>
        </div>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #0D0A08)' }} />
    </section>
  )
}
