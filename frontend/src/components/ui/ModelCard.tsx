import StatBar from './StatBar'
interface ModelCardProps {
  name: string; type: string; accuracy: number; precision: number; recall: number; f1: number; confidence: number; status: string
}
export default function ModelCard({ name, type, accuracy, precision, recall, f1, confidence, status }: ModelCardProps) {
  return (
    <div className="glass" style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <h4 style={{ fontWeight: 700, fontSize: 14, color: '#f0f9ff', marginBottom: 2 }}>{name}</h4>
          <span style={{ fontSize: 11, color: '#475569' }}>{type}</span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: status === 'production' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: status === 'production' ? '#10b981' : '#f59e0b' }}>{status}</span>
      </div>
      <StatBar label="Accuracy" value={accuracy} color="#0ea5e9" />
      <StatBar label="Precision" value={precision} color="#8b5cf6" />
      <StatBar label="Recall" value={recall} color="#10b981" />
      <StatBar label="F1 Score" value={f1} color="#f59e0b" />
      <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(14,165,233,0.05)', borderRadius: 8, textAlign: 'center' }}>
        <span style={{ fontSize: 11, color: '#475569' }}>Confidence </span>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0ea5e9' }}>{confidence}%</span>
      </div>
    </div>
  )
}
