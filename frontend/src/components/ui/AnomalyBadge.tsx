const colors: Record<string, string> = { critical:'#f43f5e', high:'#f59e0b', medium:'#0ea5e9', low:'#10b981' }
export default function AnomalyBadge({ severity }: { severity: string }) {
  const c = colors[severity] || '#94a3b8'
  return (
    <span style={{ background: `${c}18`, color: c, padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {severity}
    </span>
  )
}
