'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLanguage } from '@/components/providers/LanguageProvider'

const EASE = [0.16, 1, 0.3, 1] as const

const collections = {
  en: [
    { id: 'silence',       name: 'Silence',       tagline: 'For the hour after the world quiets.',     description: 'Deep woods and vetiver. The scent of a room where someone has just left, and the air still carries their presence.', note: 'Vetiver · White Cedar · Grey Musk', cardClass: 'card-silence' },
    { id: 'rain-morning',  name: 'Rain Morning',  tagline: 'Petrichor at 7am.',                        description: 'The specific light of a rainy morning through linen curtains. Clean, soft, and full of possibility.',               note: 'Petrichor · Green Tea · White Linen', cardClass: 'card-rain' },
    { id: 'sunday-ritual', name: 'Sunday Ritual', tagline: 'A ceremony for no one but yourself.',      description: "Warm amber and beeswax. The smell of slow mornings, unhurried coffee, and books that don't need to be finished.",   note: 'Beeswax · Amber · Cardamom', cardClass: 'card-sunday' },
    { id: 'moon',          name: 'Moon',          tagline: 'After midnight. Before sleep.',            description: 'Cool and luminous. An atmosphere for the hours when the house belongs only to you — and the dark is gentle.',      note: 'White Musk · Iris · Moonflower', cardClass: 'card-moon' },
    { id: 'deep-evening',  name: 'Deep Evening',  tagline: 'When the light turns amber.',              description: 'The transformation from afternoon to evening. Darkening rooms, softening hours, and the warmth of something that glows.', note: 'Oud · Tobacco Flower · Amber', cardClass: 'card-evening' },
    { id: 'warm-kitchen',  name: 'Warm Kitchen',  tagline: 'The heart of the home.',                  description: "Spiced warmth and slow cooking. The smell of belonging — of a table where everyone is welcome and time moves differently.", note: 'Clove · Cinnamon · Smoked Oak', cardClass: 'card-kitchen' },
  ],
  uk: [
    { id: 'silence',       name: 'Тиша',              tagline: 'Для години після того, як світ затихає.',  description: "Глибокий ліс і ветивер. Запах кімнати, де хтось щойно вийшов, а повітря ще несе їхню присутність.", note: 'Ветивер · Білий кедр · Сірий мускус', cardClass: 'card-silence' },
    { id: 'rain-morning',  name: 'Ранок дощу',        tagline: 'Петрикор о 7 ранку.',                     description: 'Особливе світло дощового ранку крізь льняні завіси. Чисте, м\'яке, сповнене можливостей.',             note: 'Петрикор · Зелений чай · Біле льняне', cardClass: 'card-rain' },
    { id: 'sunday-ritual', name: 'Недільний ритуал',  tagline: 'Церемонія лише для себе.',                description: 'Теплий янтар і бджолиний віск. Запах повільних ранків, неквапної кави і книг, які не обов\'язково дочитувати.', note: 'Бджолиний віск · Янтар · Кардамон', cardClass: 'card-sunday' },
    { id: 'moon',          name: 'Місяць',             tagline: 'Після опівночі. До сну.',                 description: 'Прохолодний і світлий. Атмосфера для годин, коли дім належить лише тобі — і темрява лагідна.',       note: 'Білий мускус · Ірис · Місячна квітка', cardClass: 'card-moon' },
    { id: 'deep-evening',  name: 'Глибокий вечір',    tagline: 'Коли світло стає янтарним.',              description: 'Перетворення дня на вечір. Кімнати темніють, години стають м\'якшими, і тепло чогось, що світиться.', note: 'Уд · Тютюновий цвіт · Янтар', cardClass: 'card-evening' },
    { id: 'warm-kitchen',  name: 'Тепла кухня',       tagline: 'Серце дому.',                             description: 'Прянощі і повільна готовка. Запах приналежності — столу, де раді кожному, і час рухається інакше.',  note: 'Гвоздика · Кориця · Копчений дуб', cardClass: 'card-kitchen' },
  ],
}

const UI = {
  en: { label: 'The Collections', h2a: 'Six atmospheres.', h2b: 'Six emotional worlds.', viewAll: 'View all →', explore: 'Explore ritual →' },
  uk: { label: 'Колекції', h2a: 'Шість атмосфер.', h2b: 'Шість емоційних світів.', viewAll: 'Переглянути все →', explore: 'Дослідити ритуал →' },
}

function CollectionCard({ item, index, ui }: { item: (typeof collections.en)[0]; index: number; ui: typeof UI.en }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden cursor-pointer group ${item.cardClass}`}
      style={{ aspectRatio: '4/5', border: '1px solid rgba(255,255,255,0.04)' }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.08, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(200,140,60,0.12), transparent 70%)' }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-8">
        <span className="font-sans text-[9px] tracking-[0.4em] uppercase mb-5 block" style={{ color: 'rgba(180, 130, 60, 0.5)' }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <h3 className="font-serif font-light leading-none mb-3" style={{ fontSize: 'clamp(28px, 3vw, 42px)', color: 'rgba(240, 225, 200, 0.92)', letterSpacing: '-0.01em' }}>
          {item.name}
        </h3>

        <p className="font-sans text-xs leading-5 mb-5" style={{ color: 'rgba(180, 160, 135, 0.65)' }}>
          {item.tagline}
        </p>

        <motion.div
          className="overflow-hidden"
          animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="font-sans text-xs leading-6 pb-4" style={{ color: 'rgba(160, 140, 115, 0.8)' }}>{item.description}</p>
          <p className="font-sans text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(180, 130, 60, 0.55)' }}>{item.note}</p>
        </motion.div>

        <motion.div
          className="mt-4 h-px"
          style={{ background: 'rgba(255,255,255,0.07)', transformOrigin: 'left' }}
          animate={{ scaleX: hovered ? 1 : 0.4, opacity: hovered ? 0.8 : 0.3 }}
          transition={{ duration: 0.4 }}
        />

        <motion.span
          className="font-sans text-[9px] tracking-[0.25em] uppercase mt-4 inline-block"
          style={{ color: 'rgba(200, 155, 80, 0.7)' }}
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
          transition={{ duration: 0.4 }}
        >
          {ui.explore}
        </motion.span>
      </div>
    </motion.div>
  )
}

export default function CollectionsSection() {
  const { lang } = useLanguage()
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })
  const items = collections[lang]
  const ui = UI[lang]

  return (
    <section id="collections" className="relative" style={{ background: '#0D0A08' }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-32 md:py-40">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div ref={titleRef}>
            <motion.span
              className="font-sans text-[9px] tracking-[0.45em] uppercase block mb-5"
              style={{ color: 'rgba(180, 130, 60, 0.55)' }}
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
            >
              {ui.label}
            </motion.span>
            <motion.h2
              className="font-serif font-light"
              style={{ fontSize: 'clamp(32px, 4vw, 56px)', color: 'rgba(240, 225, 200, 0.9)', letterSpacing: '-0.01em', lineHeight: 1.1 }}
              initial={{ opacity: 0, y: 24 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
            >
              {ui.h2a}
              <br />
              {ui.h2b}
            </motion.h2>
          </div>
          <motion.a
            href="#"
            className="font-sans text-[10px] tracking-[0.2em] uppercase self-start md:self-auto"
            style={{ color: 'rgba(180, 130, 60, 0.6)' }}
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            whileHover={{ color: 'rgba(220, 170, 90, 0.9)' }}
          >
            {ui.viewAll}
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
          {items.map((item, i) => (
            <CollectionCard key={item.id} item={item} index={i} ui={ui} />
          ))}
        </div>
      </div>
    </section>
  )
}
