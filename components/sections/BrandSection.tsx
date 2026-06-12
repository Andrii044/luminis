'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/components/providers/LanguageProvider'

const EASE = [0.16, 1, 0.3, 1] as const

const T = {
  en: {
    label: 'Our philosophy',
    h2a: "We don't sell candles.",
    h2b: 'We sell',
    h2em: 'quiet',
    h2c: 'afternoons.',
    p1: 'There is a certain quality of light at the end of a good day — warm, unhurried, forgiving. We have spent years trying to bottle that feeling. The result is Luminis.',
    p2: 'Each object is designed to transform a room — not through spectacle, but through subtlety. A shift in air. A softer shadow. The particular silence that follows when everything feels exactly right.',
    link: 'Read our story',
    pillars: [
      { number: '01', title: 'Made by hand.', body: 'Every object is poured, shaped, and finished by a single pair of hands. No automation. No shortcuts. Only intention.' },
      { number: '02', title: 'Ritual, not product.', body: 'We design for moments — for the evening bath, the morning coffee, the Sunday afternoon that stretches into dusk.' },
      { number: '03', title: 'Atmosphere over consumption.', body: 'We make fewer things, slowly. Each object is meant to last years, not seasons. Designed for lives, not trends.' },
    ],
  },
  uk: {
    label: 'Наша філософія',
    h2a: 'Ми не продаємо свічки.',
    h2b: 'Ми продаємо',
    h2em: 'тихі',
    h2c: 'вечори.',
    p1: 'Є особлива якість світла наприкінці гарного дня — тепла, неквапна, лагідна. Ми роками намагалися закарбувати це відчуття. Результат — Luminis.',
    p2: 'Кожен об\'єкт створено, щоб змінити кімнату — не через видовище, а через тонкість. Зміна в повітрі. М\'якша тінь. Особлива тиша, яка настає, коли все відчувається саме так.',
    link: 'Читати нашу історію',
    pillars: [
      { number: '01', title: 'Ручна робота.', body: 'Кожен об\'єкт відлито, сформовано і завершено однією парою рук. Жодної автоматизації. Жодних скорочень. Лише намір.' },
      { number: '02', title: 'Ритуал, не товар.', body: 'Ми проектуємо для моментів — для вечірньої ванни, ранкової кави, недільного полудня, що розтягується до присмерку.' },
      { number: '03', title: 'Атмосфера, а не споживання.', body: 'Ми робимо менше речей, повільно. Кожен об\'єкт покликаний служити роками, а не сезонами. Створений для життя, а не трендів.' },
    ],
  },
} as const

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export default function BrandSection() {
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <section id="story" className="relative" style={{ background: '#F5F0E8' }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-32 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          <div>
            <FadeIn>
              <span className="font-sans text-[9px] tracking-[0.45em] uppercase block mb-10" style={{ color: 'rgba(100, 85, 70, 0.6)' }}>
                {t.label}
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif font-light leading-[1.05]" style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', color: '#1A1410', letterSpacing: '-0.01em' }}>
                {t.h2a}
                <br />
                {t.h2b}{' '}
                <em className="font-serif" style={{ color: '#7A5C3A' }}>{t.h2em}</em>{' '}
                {t.h2c}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mt-10 w-12 h-px" style={{ background: 'rgba(120, 90, 55, 0.35)' }} />
            </FadeIn>
          </div>

          <div className="flex flex-col gap-7 lg:pt-16">
            <FadeIn delay={0.15}>
              <p className="font-sans leading-8 text-[15px]" style={{ color: 'rgba(60, 50, 40, 0.72)' }}>{t.p1}</p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="font-sans leading-8 text-[15px]" style={{ color: 'rgba(60, 50, 40, 0.72)' }}>{t.p2}</p>
            </FadeIn>
            <FadeIn delay={0.35}>
              <a href="#the-ritual" className="font-sans text-[10px] tracking-[0.22em] uppercase inline-flex items-center gap-3 mt-2 transition-opacity duration-300 hover:opacity-60" style={{ color: '#7A5C3A' }}>
                {t.link}
                <span className="block h-px w-8 transition-all duration-500" style={{ background: '#7A5C3A' }} />
              </a>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mt-28" style={{ borderTop: '1px solid rgba(120, 90, 55, 0.15)' }}>
          {t.pillars.map((p, i) => (
            <FadeIn key={p.number} delay={i * 0.1} className="pt-10 md:pr-12">
              <span className="font-sans text-[9px] tracking-[0.4em] uppercase block mb-6" style={{ color: 'rgba(120, 90, 55, 0.5)' }}>{p.number}</span>
              <h3 className="font-serif font-light text-2xl mb-4" style={{ color: '#1A1410', letterSpacing: '-0.005em' }}>{p.title}</h3>
              <p className="font-sans text-sm leading-7" style={{ color: 'rgba(60, 50, 40, 0.65)' }}>{p.body}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
