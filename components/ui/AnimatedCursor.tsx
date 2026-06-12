'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const ringX = useRef(0)
  const ringY = useRef(0)

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    dot.style.opacity = '1'
    ring.style.opacity = '1'

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
    }

    const handleMouseEnterLink = () => {
      ring.style.transform = `translate(${ringX.current}px, ${ringY.current}px) translate(-50%, -50%) scale(1.8)`
      ring.style.borderColor = 'rgba(180, 120, 50, 0.6)'
    }
    const handleMouseLeaveLink = () => {
      ring.style.transform = `translate(${ringX.current}px, ${ringY.current}px) translate(-50%, -50%) scale(1)`
      ring.style.borderColor = 'rgba(180, 120, 50, 0.25)'
    }

    let rafId: number
    const animateRing = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.1
      ringY.current += (mouseY.current - ringY.current) * 0.1
      ring.style.transform = `translate(${ringX.current}px, ${ringY.current}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(animateRing)
    }
    rafId = requestAnimationFrame(animateRing)

    document.addEventListener('mousemove', handleMouseMove)

    const interactables = document.querySelectorAll('a, button, [data-cursor]')
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterLink)
      el.addEventListener('mouseleave', handleMouseLeaveLink)
    })

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', handleMouseMove)
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterLink)
        el.removeEventListener('mouseleave', handleMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="cursor-dot"
        style={{
          width: '5px',
          height: '5px',
          background: 'rgba(200, 150, 70, 0.9)',
          borderRadius: '50%',
          opacity: 0,
          transition: 'opacity 0.3s',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring"
        style={{
          width: '34px',
          height: '34px',
          border: '1px solid rgba(180, 120, 50, 0.25)',
          borderRadius: '50%',
          opacity: 0,
          transition: 'opacity 0.3s, transform 0.15s ease-out, border-color 0.3s',
        }}
      />
    </>
  )
}
