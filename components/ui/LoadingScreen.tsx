'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/providers/LanguageProvider'

const EASE = [0.16, 1, 0.3, 1] as const

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const { lang } = useLanguage()

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(false), 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[99998] flex items-center justify-center"
          style={{ background: '#0D0A08' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 600px 400px at 50% 60%, rgba(180,100,30,0.07), transparent)',
            }}
          />

          <div className="relative flex flex-col items-center gap-6">
            <motion.p
              className="font-sans text-[10px] tracking-[0.5em] text-stone-600 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Est. mmxxiv
            </motion.p>

            <motion.h1
              className="font-serif font-light text-5xl tracking-[0.35em] text-stone-100"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
            >
              LUMINIS
            </motion.h1>

            <motion.div
              className="overflow-hidden h-px w-20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, delay: 0.9, ease: EASE }}
              style={{ transformOrigin: 'left', background: 'rgba(180, 130, 60, 0.45)' }}
            />

            <motion.p
              className="font-sans text-[9px] tracking-[0.45em] text-stone-600 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {lang === 'en' ? 'Objects for quiet rituals' : "Об'єкти для тихих ритуалів"}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
