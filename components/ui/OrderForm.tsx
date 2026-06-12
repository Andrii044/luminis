'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/components/providers/CartProvider'

const EASE = [0.16, 1, 0.3, 1] as const

const MESSENGERS = ['Telegram', 'Viber', 'WhatsApp', 'Дзвінок']

type Props = { open: boolean; onClose: () => void }

export default function OrderForm({ open, onClose }: Props) {
  const { items, total, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', email: '', messenger: 'Telegram', comment: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items, total }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      clearCart()
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(240,225,200,0.85)',
    outline: 'none',
    fontFamily: 'inherit',
  }

  const labelStyle = {
    color: 'rgba(180,130,60,0.55)',
    fontSize: '9px',
    letterSpacing: '0.25em',
    textTransform: 'uppercase' as const,
    display: 'block',
    marginBottom: 6,
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ pointerEvents: 'none' }}
          >
            <motion.div
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto"
              style={{ background: '#0F0C09', border: '1px solid rgba(255,255,255,0.07)', pointerEvents: 'auto' }}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={onClose} className="absolute top-5 right-5 transition-opacity hover:opacity-60" style={{ color: 'rgba(200,175,140,0.5)' }}>
                <X size={18} />
              </button>

              <div className="p-8 md:p-10">
                {status === 'success' ? (
                  <motion.div
                    className="flex flex-col items-center text-center py-8 gap-5"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <CheckCircle size={48} strokeWidth={1} style={{ color: 'rgba(120,200,130,0.7)' }} />
                    <h3 className="font-serif font-light text-2xl" style={{ color: 'rgba(240,225,200,0.9)' }}>Замовлення прийнято</h3>
                    <p className="font-sans text-xs leading-6" style={{ color: 'rgba(160,140,115,0.7)' }}>
                      Ми зв'яжемося з вами найближчим часом через {form.messenger}, щоб уточнити деталі та спосіб оплати.
                    </p>
                    <button onClick={onClose} className="font-sans text-[10px] tracking-[0.22em] uppercase mt-2 px-8 py-3" style={{ border: '1px solid rgba(180,130,50,0.3)', color: 'rgba(200,155,75,0.8)' }}>
                      Закрити
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <span className="font-sans text-[9px] tracking-[0.4em] uppercase block mb-2" style={{ color: 'rgba(180,130,60,0.55)' }}>Оформлення</span>
                    <h3 className="font-serif font-light text-2xl mb-2" style={{ color: 'rgba(240,225,200,0.9)' }}>Ваше замовлення</h3>

                    <div className="mb-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between items-center py-2">
                          <span className="font-sans text-xs" style={{ color: 'rgba(200,175,140,0.7)' }}>{item.name} × {item.quantity}</span>
                          <span className="font-serif text-sm" style={{ color: 'rgba(200,155,75,0.8)' }}>{item.price}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-3 mt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <span className="font-sans text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(160,140,115,0.5)' }}>Разом</span>
                        <span className="font-serif" style={{ color: 'rgba(200,155,75,0.9)' }}>€ {total.toFixed(0)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-5">
                      <div>
                        <label style={labelStyle}>Ім'я</label>
                        <input required value={form.name} onChange={set('name')} placeholder="Ваше ім'я" className="w-full px-4 py-3 text-sm font-sans" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Телефон</label>
                        <input required type="tel" value={form.phone} onChange={set('phone')} placeholder="+380 XX XXX XX XX" className="w-full px-4 py-3 text-sm font-sans" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Email</label>
                        <input type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" className="w-full px-4 py-3 text-sm font-sans" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Зручний спосіб зв'язку</label>
                        <div className="grid grid-cols-4 gap-2">
                          {MESSENGERS.map(m => (
                            <button
                              key={m} type="button"
                              onClick={() => setForm(p => ({ ...p, messenger: m }))}
                              className="py-2.5 font-sans text-[9px] tracking-[0.15em] transition-all"
                              style={{
                                border: `1px solid ${form.messenger === m ? 'rgba(180,130,50,0.5)' : 'rgba(255,255,255,0.07)'}`,
                                background: form.messenger === m ? 'rgba(180,130,50,0.1)' : 'transparent',
                                color: form.messenger === m ? 'rgba(225,188,108,0.9)' : 'rgba(160,140,115,0.5)',
                              }}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>Коментар (необов'язково)</label>
                        <textarea value={form.comment} onChange={set('comment')} placeholder="Адреса, побажання до пакування..." rows={3} className="w-full px-4 py-3 text-sm font-sans resize-none" style={inputStyle} />
                      </div>
                    </div>

                    {status === 'error' && (
                      <p className="font-sans text-xs mt-4" style={{ color: 'rgba(200,100,100,0.8)' }}>
                        Помилка. Спробуйте ще раз або напишіть нам напряму.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full font-sans text-[10px] tracking-[0.22em] uppercase py-4 mt-6 transition-all disabled:opacity-50"
                      style={{ background: 'rgba(180,130,50,0.14)', border: '1px solid rgba(180,130,50,0.38)', color: 'rgba(225,188,108,0.92)' }}
                    >
                      {status === 'loading' ? 'Відправляємо...' : 'Підтвердити замовлення'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
