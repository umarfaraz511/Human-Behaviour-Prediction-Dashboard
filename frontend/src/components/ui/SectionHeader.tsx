interface SectionHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  children?: React.ReactNode
}
export default function SectionHeader({ title, subtitle, badge, children }: SectionHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
      <div>
        {badge && <span style={{ fontSize: 11, fontWeight: 600, color: '#0ea5e9', background: 'rgba(14,165,233,0.1)', padding: '3px 10px', borderRadius: 20, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-block', marginBottom: 8 }}>{badge}</span>}
        <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 20, color: '#f0f9ff', marginBottom: subtitle ? 4 : 0 }}>{title}</h2>
        {subtitle && <p style={{ color: '#475569', fontSize: 13 }}>{subtitle}</p>}
      </div>
      {children && <div>{children}</div>}
    </div>
  )
}
