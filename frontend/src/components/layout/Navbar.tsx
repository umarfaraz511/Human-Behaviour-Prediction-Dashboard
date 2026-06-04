'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Brain, Menu, X, ChevronRight } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/behavior-analytics', label: 'Behavior Analytics' },
  { href: '/predictions', label: 'Predictions' },
  { href: '/user-insights', label: 'User Insights' },
  { href: '/reports', label: 'Reports' },
  { href: '/ai-assistant', label: 'AI Assistant' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 70,
      background: scrolled ? 'rgba(4,13,26,0.95)' : 'rgba(4,13,26,0.7)',
      backdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid rgba(14,165,233,0.2)' : '1px solid transparent',
      transition: 'all 0.3s ease',
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={20} color="white" />
          </div>
          <div>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 18, background: 'linear-gradient(135deg,#0ea5e9,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>BEHAVR</span>
            <div style={{ fontSize: 9, color: '#475569', fontWeight: 500, letterSpacing: '0.1em', lineHeight: 1 }}>BEHAVIOR AI</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden-mobile">
          {navLinks.map(link => {
            const active = pathname === link.href
            return (
              <Link key={link.href} href={link.href} style={{
                padding: '6px 12px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 500,
                color: active ? '#0ea5e9' : '#94a3b8',
                background: active ? 'rgba(14,165,233,0.1)' : 'transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (!active) { (e.target as HTMLElement).style.color = '#e2e8f0'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.05)' } }}
              onMouseLeave={e => { if (!active) { (e.target as HTMLElement).style.color = '#94a3b8'; (e.target as HTMLElement).style.background = 'transparent' } }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>Live</span>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#0ea5e9,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white', cursor: 'pointer' }}>UF</div>
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'none' }} className="mobile-menu-btn">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: 'absolute', top: 70, left: 0, right: 0, background: 'rgba(4,13,26,0.98)', borderBottom: '1px solid rgba(14,165,233,0.2)', padding: '16px 24px', backdropFilter: 'blur(20px)' }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(14,165,233,0.05)', textDecoration: 'none', color: pathname === link.href ? '#0ea5e9' : '#94a3b8', fontSize: 14, fontWeight: 500 }}>
              {link.label}
              <ChevronRight size={14} />
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) { .hidden-mobile { display: none !important; } .mobile-menu-btn { display: flex !important; } }
      `}</style>
    </nav>
  )
}
