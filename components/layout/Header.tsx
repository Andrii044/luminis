'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/providers/LanguageProvider'

const NAV = {
  en: ['Collections', 'Objects', 'Story', 'The Ritual'],
  uk: ['Колекції', "Об'єкти", 'Про нас', 'Ритуал'],
}
const NAV_HREF = ['#collections', '#objects', '#story', '#the-ritual']

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggle } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = NAV[lang]

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        padding: scrolled ? '16px 40px' : '28px 40px',
        background: scrolled ? 'rgba(13, 10, 8, 0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
      }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        {/* Logo */}
        <a
          href="#"
          className="font-serif font-light text-[18px] tracking-[0.28em] text-stone-100 hover:text-amber-200 transition-colors duration-400"
        >
          LUMINIS
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {nav.map((item, i) => (
            <a
              key={item}
              href={NAV_HREF[i]}
              className="font-sans text-[10px] tracking-[0.18em] uppercase text-stone-400 hover:text-stone-100 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA + lang toggle + mobile */}
        <div className="flex items-center gap-5">
          <button
            onClick={toggle}
            className="font-sans text-[9px] tracking-[0.25em] uppercase transition-colors duration-300"
            style={{ color: 'rgba(180, 130, 60, 0.55)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(200, 160, 80, 0.9)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(180, 130, 60, 0.55)')}
          >
            {lang === 'en' ? 'УКР' : 'EN'}
          </button>

          <a
            href="#collections"
            className="hidden md:inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.18em] uppercase text-amber-300/80 border border-amber-400/25 px-5 py-2.5 hover:border-amber-400/55 hover:text-amber-200 transition-all duration-300"
          >
            {lang === 'en' ? 'Enter' : 'Перейти'}
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span className={`block h-px w-5 bg-stone-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block h-px w-5 bg-stone-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-5 bg-stone-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="flex flex-col gap-6 pt-8 pb-4">
          {nav.map((item, i) => (
            <a
              key={item}
              href={NAV_HREF[i]}
              className="font-sans text-xs tracking-[0.22em] uppercase text-stone-300 hover:text-stone-100"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  )
}
