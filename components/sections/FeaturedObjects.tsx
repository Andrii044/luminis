'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLanguage } from '@/components/providers/LanguageProvider'

const EASE = [0.16, 1, 0.3, 1] as const

const objects = {
  en: [
    { id: 'solace-02',    collection: 'Solace',    name: 'Solace No. 02',    subtitle: 'Ceramic vessel · 200g',     description: 'Black amber and smoked patchouli. A deep, lingering burn for evenings that ask for nothing.',                   price: '€ 88', burnTime: '50–55 hrs', imageSrc: '/images/solace.jpg',    gradClass: 'obj-1', accent: 'rgba(60, 100, 70, 0.14)' },
    { id: 'echo-03',      collection: 'Echo',      name: 'Echo No. 03',      subtitle: 'Glazed ceramic · 190g',     description: 'Saffron, dark vanilla, and oud. The scent of rooms where music has just stopped playing.',                  price: '€ 82', burnTime: '45–50 hrs', imageSrc: '/images/echo.jpg',      gradClass: 'obj-2', accent: 'rgba(80, 100, 200, 0.1)' },
    { id: 'celestial-04', collection: 'Celestial', name: 'Celestial No. 04', subtitle: 'Artisan ceramic · 215g',   description: 'Smoked amber and deep musk. For the quiet hours when only the night sky is awake.',                          price: '€ 95', burnTime: '55–60 hrs', imageSrc: '/images/celestial.jpg', gradClass: 'obj-3', accent: 'rgba(120, 110, 200, 0.12)' },
  ],
  uk: [
    { id: 'solace-02',    collection: 'Solace',    name: 'Solace No. 02',    subtitle: 'Керамічний посуд · 200г',   description: 'Чорний янтар і копчений пачулі. Глибоке, тривале горіння для вечорів, які нічого не вимагають.',           price: '€ 88', burnTime: '50–55 год', imageSrc: '/images/solace.jpg',    gradClass: 'obj-1', accent: 'rgba(60, 100, 70, 0.14)' },
    { id: 'echo-03',      collection: 'Echo',      name: 'Echo No. 03',      subtitle: 'Глазурована кераміка · 190г', description: 'Шафран, темна ваніль та уд. Запах кімнат, де щойно стихла музика.',                                   price: '€ 82', burnTime: '45–50 год', imageSrc: '/images/echo.jpg',      gradClass: 'obj-2', accent: 'rgba(80, 100, 200, 0.1)' },
    { id: 'celestial-04', collection: 'Celestial', name: 'Celestial No. 04', subtitle: 'Авторська кераміка · 215г',  description: 'Копчений янтар і глибокий мускус. Для тихих годин, коли лише нічне небо не спить.',                    price: '€ 95', burnTime: '55–60 год', imageSrc: '/images/celestial.jpg', gradClass: 'obj-3', accent: 'rgba(120, 110, 200, 0.12)' },
  ],
}

const UI = {
  en: { label: 'Featured Objects', h2: 'Chosen for their atmosphere.', addBtn: 'Add to Ritual', burnLabel: 'Burn time', viewAll: 'View entire collection' },
  uk: { label: 'Обрані об\'єкти',   h2: 'Обрані за своєю атмосферою.', addBtn: 'Додати до ритуалу', burnLabel: 'Час горіння', viewAll: 'Вся колекція' },
}

function ObjectCard({ obj, index, ui }: { obj: (typeof objects.en)[0]; index: number; ui: typeof UI.en }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="group cursor-pointer"
      style={{ border: '1px solid rgba(255,255,255,0.05)', background: '#0A0806' }}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay: index * 0.12, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`relative overflow-hidden ${obj.gradClass}`} style={{ aspectRatio: '3/4' }}>
        <motion.img
          src={obj.imageSrc}
          alt={obj.name}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 1.0, ease: EASE }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 60%, ${obj.accent}, transparent 65%)` }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.7 }}
        />

        <div className="absolute top-0 inset-x-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-36 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(4,2,0,0.92), rgba(4,2,0,0.4), transparent)' }} />

        <div className="absolute top-5 left-5">
          <span className="font-sans text-[8px] tracking-[0.35em] uppercase px-3 py-1.5" style={{ background: 'rgba(8, 5, 2, 0.55)', color: 'rgba(200, 160, 75, 0.82)', backdropFilter: 'blur(10px)', border: '1px solid rgba(180,130,50,0.18)' }}>
            {obj.collection}
          </span>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 p-5"
          animate={{ y: hovered ? 0 : 18, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <button
            className="w-full font-sans text-[10px] tracking-[0.22em] uppercase py-3.5 transition-all duration-300"
            style={{ background: 'rgba(180, 130, 50, 0.14)', border: '1px solid rgba(180, 130, 50, 0.38)', color: 'rgba(225, 188, 108, 0.92)', backdropFilter: 'blur(10px)' }}
          >
            {ui.addBtn}
          </button>
        </motion.div>
      </div>

      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif font-light text-xl mb-1" style={{ color: 'rgba(240, 225, 200, 0.9)', letterSpacing: '-0.01em' }}>{obj.name}</h3>
            <p className="font-sans text-[10px] tracking-[0.12em]" style={{ color: 'rgba(160, 140, 115, 0.6)' }}>{obj.subtitle}</p>
          </div>
          <span className="font-serif font-light text-lg whitespace-nowrap" style={{ color: 'rgba(200, 155, 75, 0.88)' }}>{obj.price}</span>
        </div>

        <p className="font-sans text-xs leading-6 mt-4" style={{ color: 'rgba(160, 140, 115, 0.65)' }}>{obj.description}</p>

        <div className="flex items-center gap-2 mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="font-sans text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(180, 130, 60, 0.45)' }}>{ui.burnLabel}</span>
          <span className="font-sans text-[10px]" style={{ color: 'rgba(200, 175, 140, 0.7)' }}>{obj.burnTime}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedObjects() {
  const { lang } = useLanguage()
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })
  const items = objects[lang]
  const ui = UI[lang]

  return (
    <section id="objects" style={{ background: '#0F0C09' }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-32 md:py-40">
        <div className="mb-16" ref={titleRef}>
          <motion.span
            className="font-sans text-[9px] tracking-[0.45em] uppercase block mb-5"
            style={{ color: 'rgba(180, 130, 60, 0.55)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            {ui.label}
          </motion.span>
          <motion.h2
            className="font-serif font-light"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', color: 'rgba(240, 225, 200, 0.9)', letterSpacing: '-0.01em', lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
          >
            {ui.h2}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px">
          {items.map((obj, i) => (
            <ObjectCard key={obj.id} obj={obj} index={i} ui={ui} />
          ))}
        </div>

        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <a href="#collections" className="font-sans text-[10px] tracking-[0.22em] uppercase inline-flex items-center gap-3" style={{ color: 'rgba(180, 130, 60, 0.6)' }}>
            {ui.viewAll}
            <span className="h-px w-10 inline-block" style={{ background: 'rgba(180, 130, 60, 0.4)' }} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
