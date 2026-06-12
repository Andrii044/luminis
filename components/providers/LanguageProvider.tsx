'use client'

import { createContext, useContext, useState } from 'react'

type Lang = 'en' | 'uk'

const LanguageContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: 'uk',
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('uk')
  return (
    <LanguageContext.Provider value={{ lang, toggle: () => setLang(l => l === 'en' ? 'uk' : 'en') }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
