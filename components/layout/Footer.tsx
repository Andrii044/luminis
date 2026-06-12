'use client'

import { useLanguage } from '@/components/providers/LanguageProvider'

const LINKS = {
  en: {
    Collections: ['Silence', 'Rain Morning', 'Sunday Ritual', 'Moon', 'Deep Evening'],
    World: ['Our Story', 'The Ritual', 'Journal', 'Stockists'],
    Care: ['Candle Care', 'Shipping', 'Returns', 'Contact'],
  },
  uk: {
    Колекції: ['Тиша', 'Ранок дощу', 'Недільний ритуал', 'Місяць', 'Глибокий вечір'],
    Простір: ['Наша історія', 'Ритуал', 'Журнал', 'Де купити'],
    Догляд: ['Догляд за свічкою', 'Доставка', 'Повернення', 'Контакти'],
  },
}

const T = {
  en: {
    brand: 'Objects for quiet rituals. Handcrafted with intention, designed for the spaces between.',
    rights: `© ${new Date().getFullYear()} Luminis. All rights reserved.`,
    quote: '"Light the quiet moments."',
  },
  uk: {
    brand: "Об'єкти для тихих ритуалів. Ручна робота з наміром, для просторів між.",
    rights: `© ${new Date().getFullYear()} Luminis. Всі права захищені.`,
    quote: '"Запали тихі моменти."',
  },
}

export default function Footer() {
  const { lang } = useLanguage()
  const t = T[lang]
  const links = LINKS[lang]

  return (
    <footer className="relative" style={{ background: '#080604', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <p className="font-serif font-light text-2xl tracking-[0.28em] text-stone-100 mb-5">LUMINIS</p>
            <p className="font-sans text-sm leading-7 text-stone-500 max-w-[240px]">{t.brand}</p>
            <div className="flex gap-6 mt-8">
              {['Instagram', 'Pinterest'].map((s) => (
                <a key={s} href="#" className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-600 hover:text-stone-300 transition-colors duration-300">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-stone-600 mb-6">{group}</p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="font-sans text-sm text-stone-500 hover:text-stone-200 transition-colors duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p className="font-sans text-[10px] tracking-[0.15em] text-stone-700">{t.rights}</p>
        <p className="font-sans text-[10px] tracking-[0.15em] text-stone-700 italic font-serif">{t.quote}</p>
      </div>
    </footer>
  )
}
