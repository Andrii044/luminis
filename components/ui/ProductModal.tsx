'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart, CartItem } from '@/components/providers/CartProvider'

type Product = Omit<CartItem, 'quantity'>

type Props = {
  product: Product | null
  onClose: () => void
}

const EASE = [0.16, 1, 0.3, 1] as const

export default function ProductModal({ product, onClose }: Props) {
  const { addItem, setCartOpen } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!product) return
    setQty(1)
    setAdded(false)
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [product])

  const handleAdd = () => {
    if (!product) return
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => {
      onClose()
      setCartOpen(true)
    }, 800)
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              style={{ background: '#0F0C09', border: '1px solid rgba(255,255,255,0.07)' }}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-10 p-2 transition-opacity hover:opacity-60"
                style={{ color: 'rgba(200,175,140,0.6)' }}
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="relative" style={{ aspectRatio: '3/4', minHeight: 320 }}>
                  <img
                    src={product.imageSrc}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, transparent 70%, #0F0C09)' }} />
                  <div className="absolute top-5 left-5">
                    <span className="font-sans text-[8px] tracking-[0.35em] uppercase px-3 py-1.5"
                      style={{ background: 'rgba(8,5,2,0.6)', color: 'rgba(200,160,75,0.82)', backdropFilter: 'blur(10px)', border: '1px solid rgba(180,130,50,0.18)' }}>
                      {product.collection}
                    </span>
                  </div>
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <h2 className="font-serif font-light mb-2" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: 'rgba(240,225,200,0.92)', letterSpacing: '-0.01em' }}>
                      {product.name}
                    </h2>
                    <p className="font-sans text-[10px] tracking-[0.15em] mb-6" style={{ color: 'rgba(160,140,115,0.6)' }}>
                      {product.subtitle}
                    </p>

                    <div className="h-px mb-8" style={{ background: 'rgba(255,255,255,0.06)' }} />

                    <p className="font-sans text-xs leading-7 mb-8" style={{ color: 'rgba(180,160,135,0.75)' }}>
                      Ручна робота. Кожна свічка виготовлена з соєвого воску преміум класу з натуральними ефірними оліями. Поверхня — авторська кераміка, яка залишається як декор після використання.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {[
                        { label: 'Вага', value: product.subtitle.split('·')[1]?.trim() ?? '—' },
                        { label: 'Матеріал', value: product.subtitle.split('·')[0]?.trim() ?? '—' },
                        { label: 'Склад', value: 'Соєвий віск, ефірні олії' },
                        { label: 'Доставка', value: 'Укрпошта · Нова пошта' },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p className="font-sans text-[9px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(180,130,60,0.45)' }}>{label}</p>
                          <p className="font-sans text-xs" style={{ color: 'rgba(200,175,140,0.7)' }}>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-serif font-light text-2xl" style={{ color: 'rgba(200,155,75,0.9)' }}>{product.price}</span>

                      <div className="flex items-center gap-3" style={{ border: '1px solid rgba(255,255,255,0.08)', padding: '6px 12px' }}>
                        <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-1 transition-opacity hover:opacity-60" style={{ color: 'rgba(200,175,140,0.7)' }}>
                          <Minus size={14} />
                        </button>
                        <span className="font-sans text-sm w-6 text-center" style={{ color: 'rgba(240,225,200,0.9)' }}>{qty}</span>
                        <button onClick={() => setQty(q => q + 1)} className="p-1 transition-opacity hover:opacity-60" style={{ color: 'rgba(200,175,140,0.7)' }}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <motion.button
                      onClick={handleAdd}
                      className="w-full font-sans text-[10px] tracking-[0.22em] uppercase py-4 flex items-center justify-center gap-3 transition-all"
                      style={{
                        background: added ? 'rgba(60,100,70,0.2)' : 'rgba(180,130,50,0.12)',
                        border: `1px solid ${added ? 'rgba(80,140,90,0.4)' : 'rgba(180,130,50,0.35)'}`,
                        color: added ? 'rgba(120,200,130,0.9)' : 'rgba(225,188,108,0.9)',
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <ShoppingBag size={14} />
                      {added ? 'Додано в кошик' : 'Додати в кошик'}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
