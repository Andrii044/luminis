'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/components/providers/LanguageProvider'

const EASE = [0.16, 1, 0.3, 1] as const

const cells = {
  en: [
    { id: 1, span: 'col-span-2 row-span-2', imageSrc: '/images/roots-branches.jpg', gradClass: 'gallery-1', caption: 'Roots & Branches, No. 05' },
    { id: 2, span: 'col-span-1 row-span-1', imageSrc: '/images/sculptural-body.jpg', gradClass: 'gallery-2', caption: 'Sculptural form series' },
    { id: 3, span: 'col-span-1 row-span-1', imageSrc: '/images/twisted-form.jpg',    gradClass: 'gallery-3', caption: 'Vessel study, white clay' },
    { id: 4, span: 'col-span-1 row-span-2', imageSrc: '/images/stone-vessel.jpg',    gradClass: 'gallery-4', caption: 'Earth series, stone finish' },
    { id: 5, span: 'col-span-1 row-span-1', imageSrc: '/images/concrete-bowl.jpg',   gradClass: 'gallery-5', caption: 'Concrete bowl, morning light' },
    { id: 6, span: 'col-span-1 row-span-1', imageSrc: '/images/spiral-form.jpg',     gradClass: 'gallery-6', caption: 'Spiral form, warm afternoon' },
    { id: 7, span: 'col-span-2 row-span-1', imageSrc: '/images/carved-sphere.jpg',   gradClass: 'gallery-1', caption: 'Carved vessel, ornament series' },
  ],
  uk: [
    { id: 1, span: 'col-span-2 row-span-2', imageSrc: '/images/roots-branches.jpg', gradClass: 'gallery-1', caption: 'Коріння та гілки, №05' },
    { id: 2, span: 'col-span-1 row-span-1', imageSrc: '/images/sculptural-body.jpg', gradClass: 'gallery-2', caption: 'Серія скульптурних форм' },
    { id: 3, span: 'col-span-1 row-span-1', imageSrc: '/images/twisted-form.jpg',    gradClass: 'gallery-3', caption: 'Дослідження форми, біла глина' },
    { id: 4, span: 'col-span-1 row-span-2', imageSrc: '/images/stone-vessel.jpg',    gradClass: 'gallery-4', caption: "Серія 'Земля', кам'яне оздоблення" },
    { id: 5, span: 'col-span-1 row-span-1', imageSrc: '/images/concrete-bowl.jpg',   gradClass: 'gallery-5', caption: 'Бетонна миска, ранкове світло' },
    { id: 6, span: 'col-span-1 row-span-1', imageSrc: '/images/spiral-form.jpg',     gradClass: 'gallery-6', caption: 'Спіральна форма, теплий полудень' },
    { id: 7, span: 'col-span-2 row-span-1', imageSrc: '/images/carved-sphere.jpg',   gradClass: 'gallery-1', caption: 'Різьблений посуд, серія орнаментів' },
  ],
}

const UI = {
  en: { label: 'Visual World', h2a: 'The atmosphere', h2b: 'of Luminis.', follow: 'Follow @luminis →', quote: '"Atmosphere for the soul."' },
  uk: { label: 'Візуальний світ', h2a: 'Атмосфера', h2b: 'Luminis.', follow: 'Стежити @luminis →', quote: '"Атмосфера для душі."' },
}

function GalleryCell({ cell, index }: { cell: (typeof cells.en)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden group ${cell.span} ${cell.gradClass}`}
      style={{ minHeight: '200px', cursor: 'pointer' }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.1, delay: index * 0.06, ease: EASE }}
    >
      <motion.img
        src={cell.imageSrc}
        alt={cell.caption}
        className="absolute inset-0 w-full h-full object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.9, ease: EASE }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.3)' }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <motion.div
        className="absolute bottom-0 left-0 right-0 p-5"
        initial={{ opacity: 0, y: 8 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-sans text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(220, 200, 165, 0.75)' }}>
          {cell.caption}
        </p>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ border: '1px solid rgba(180, 130, 60, 0)' }}
        whileHover={{ borderColor: 'rgba(180, 130, 60, 0.2)' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}

export default function GallerySection() {
  const { lang } = useLanguage()
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })
  const items = cells[lang]
  const ui = UI[lang]

  return (
    <section id="gallery" style={{ background: '#0D0A08' }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-28 md:py-36">
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
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
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.25 }}
            whileHover={{ color: 'rgba(220, 170, 90, 0.9)' }}
          >
            {ui.follow}
          </motion.a>
        </div>

        <div className="grid grid-cols-4 gap-px" style={{ gridAutoRows: '220px' }}>
          {items.map((cell, i) => (
            <GalleryCell key={cell.id} cell={cell} index={i} />
          ))}
        </div>

        <motion.p
          className="font-serif font-light italic text-center mt-14"
          style={{ fontSize: 'clamp(18px, 2vw, 26px)', color: 'rgba(160, 140, 110, 0.45)', letterSpacing: '0.01em' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          {ui.quote}
        </motion.p>
      </div>
    </section>
  )
}
