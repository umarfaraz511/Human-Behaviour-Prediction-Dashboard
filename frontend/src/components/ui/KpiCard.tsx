'use client'
interface KpiCardProps {
  label: string
  value: string | number
  change: number
  up: boolean
  icon: string
  color: string
  suffix?: string
}

export default function KpiCard({ label, value, change, up, icon, color, suffix = '' }: KpiCardProps) {
  return (
    <div className="glass" style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, borderRadius: '0 0 0 80px', background: `${color}08` }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <span className={up ? 'badge-up' : 'badge-down'}>
          {up ? '↑' : '↓'} {change}%
        </span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color: '#f0f9ff', fontFamily: 'Plus Jakarta Sans', marginBottom: 4 }}>
        {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </div>
      <div style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>{label}</div>
    </div>
  )
}
