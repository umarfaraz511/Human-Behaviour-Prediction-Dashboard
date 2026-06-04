'use client'
import Link from 'next/link'
import { Brain, Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#020810', borderTop: '1px solid rgba(14,165,233,0.15)', padding: '60px 0 32px', marginTop: 80 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#0ea5e9,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Brain size={20} color="white" />
              </div>
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 18, color: '#0ea5e9' }}>BEHAVR</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>
              AI-powered human behavior prediction platform for enterprise analytics and user intelligence.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 18 }}>Platform</h4>
            {[
              ['/', 'Home'],
              ['/dashboard', 'Dashboard'],
              ['/behavior-analytics', 'Behavior Analytics'],
              ['/predictions', 'Predictions'],
              ['/user-insights', 'User Insights'],
              ['/reports', 'Reports'],
            ].map(([href, label]) => (
              <Link key={href} href={href} style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 10, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#0ea5e9'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = '#94a3b8'}
              >{label}</Link>
            ))}
          </div>

          {/* More pages */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 18 }}>More</h4>
            {[
              ['/ai-assistant', 'AI Assistant'],
              ['/about', 'About'],
              ['/contact', 'Contact'],
            ].map(([href, label]) => (
              <Link key={href} href={href} style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 10, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#0ea5e9'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = '#94a3b8'}
              >{label}</Link>
            ))}
          </div>

          {/* Developer */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 18 }}>Developer</h4>
            <p style={{ color: '#ffffff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Umar Faraz</p>
            <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 18 }}>AI/ML Engineer</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="https://github.com/umarfaraz511" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#0ea5e9'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#94a3b8'}
              >
                <Github size={15} />github.com/umarfaraz511
              </a>
              <a href="https://www.linkedin.com/in/umar-faraz-700457280" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#0ea5e9'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#94a3b8'}
              >
                <Linkedin size={15} />Umar Faraz
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(14,165,233,0.1)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <p style={{ color: '#64748b', fontSize: 12 }}>
            &copy; 2026 BEHAVR &mdash; Human Behavior Prediction Dashboard
          </p>
          <p style={{ color: '#64748b', fontSize: 12 }}>
            Developed by{' '}
            <a href="https://github.com/umarfaraz511" style={{ color: '#0ea5e9', textDecoration: 'none', fontWeight: 600 }}>Umar Faraz</a>
            {' · '}
            <a href="https://github.com/umarfaraz511" style={{ color: '#0ea5e9', textDecoration: 'none' }}>GitHub</a>
            {' · '}
            <a href="https://www.linkedin.com/in/umar-faraz-700457280" style={{ color: '#0ea5e9', textDecoration: 'none' }}>LinkedIn</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
