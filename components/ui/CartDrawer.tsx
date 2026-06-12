'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/components/providers/CartProvider'
import OrderForm from '@/components/ui/OrderForm'

const EASE = [0.16, 1, 0.3, 1] as const

export default function CartDrawer() {
  const { items, cartOpen, setCartOpen, removeItem, updateQuantity, total, count } = useCart()
  const [orderOpen, setOrderOpen] = useState(false)

  return (
    <>
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 bottom-0 z-40 w-full max-w-md flex flex-col"
              style={{ background: '#0F0C09', borderLeft: '1px solid rgba(255,255,255,0.07)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="flex items-center justify-between px-8 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-3">
                  <ShoppingBag size={16} style={{ color: 'rgba(200,155,75,0.7)' }} />
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(200,175,140,0.7)' }}>
                    Кошик {count > 0 && `· ${count}`}
                  </span>
                </div>
                <button onClick={() => setCartOpen(false)} className="p-1 transition-opacity hover:opacity-60" style={{ color: 'rgba(200,175,140,0.5)' }}>
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4" style={{ color: 'rgba(160,140,115,0.4)' }}>
                    <ShoppingBag size={40} strokeWidth={1} />
                    <p className="font-sans text-xs tracking-[0.15em]">Кошик порожній</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {items.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-4"
                      >
                        <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden">
                          <img src={item.imageSrc} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(180,130,60,0.55)' }}>{item.collection}</p>
                          <h4 className="font-serif font-light text-sm mb-1" style={{ color: 'rgba(240,225,200,0.88)' }}>{item.name}</h4>
                          <p className="font-sans text-[9px] mb-3" style={{ color: 'rgba(160,140,115,0.5)' }}>{item.subtitle}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2" style={{ border: '1px solid rgba(255,255,255,0.07)', padding: '4px 10px' }}>
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="transition-opacity hover:opacity-60" style={{ color: 'rgba(200,175,140,0.6)' }}>
                                <Minus size={12} />
                              </button>
                              <span className="font-sans text-xs w-4 text-center" style={{ color: 'rgba(240,225,200,0.8)' }}>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="transition-opacity hover:opacity-60" style={{ color: 'rgba(200,175,140,0.6)' }}>
                                <Plus size={12} />
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="font-serif text-sm" style={{ color: 'rgba(200,155,75,0.85)' }}>{item.price}</span>
                              <button onClick={() => removeItem(item.id)} className="transition-opacity hover:opacity-60" style={{ color: 'rgba(160,100,100,0.6)' }}>
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="px-8 py-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex justify-between mb-6">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(160,140,115,0.6)' }}>Разом</span>
                    <span className="font-serif text-lg" style={{ color: 'rgba(200,155,75,0.9)' }}>€ {total.toFixed(0)}</span>
                  </div>

                  <button
                    onClick={() => { setCartOpen(false); setOrderOpen(true) }}
                    className="w-full font-sans text-[10px] tracking-[0.22em] uppercase py-4 transition-all"
                    style={{ background: 'rgba(180,130,50,0.14)', border: '1px solid rgba(180,130,50,0.38)', color: 'rgba(225,188,108,0.92)' }}
                  >
                    Оформити замовлення
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <OrderForm open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  )
}
