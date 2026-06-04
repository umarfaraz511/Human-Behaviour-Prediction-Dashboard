interface StatBarProps {
  label: string
  value: number
  max?: number
  color?: string
}
export default function StatBar({ label, value, max = 100, color = '#0ea5e9' }: StatBarProps) {
  const pct = Math.round((value / max) * 100)
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>{label}</span>
        <span style={{ fontSize: 12, color: '#f0f9ff', fontWeight: 600 }}>{value}%</span>
      </div>
      <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}88)`, borderRadius: 3, transition: 'width 1s ease' }} />
      </div>
    </div>
  )
}
