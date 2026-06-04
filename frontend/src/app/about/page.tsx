'use client'
import Link from 'next/link'
import { Github, Linkedin, Brain, Code, Database, Cpu } from 'lucide-react'

const techStack = [
  { category:'Frontend', items:['Next.js 14','React 18','TypeScript','Tailwind CSS','Framer Motion','Recharts'] },
  { category:'AI/ML', items:['Groq LLaMA 3.3-70B','TensorFlow/PyTorch','Scikit-Learn','XGBoost','BERT Transformers','IsolationForest'] },
  { category:'Backend', items:['FastAPI','Python 3.11','SQLAlchemy','Redis','PostgreSQL','MongoDB'] },
  { category:'Infrastructure', items:['Docker','Docker Compose','GitHub Actions','AWS Ready','Azure Ready','Nginx'] },
]

const features = [
  { icon:'ðŸ§ ', title:'6 Production AI Models', desc:'LSTM, XGBoost, Random Forest, CNN, IsolationForest, BERT â€” all running in parallel' },
  { icon:'âš¡', title:'Real-Time Analytics', desc:'Sub-100ms predictions across 124,830 users with live behavioral signal processing' },
  { icon:'ðŸ”', title:'Explainable AI', desc:'Feature importance, confidence scores, and model interpretation for every prediction' },
  { icon:'ðŸ“Š', title:'8 Analytics Dashboards', desc:'Command Center, Behavior Analytics, Predictions, User Insights, Reports, and more' },
  { icon:'ðŸ”’', title:'Enterprise Security', desc:'JWT auth, RBAC, rate limiting, audit logging, XSS and SQL injection protection' },
  { icon:'ðŸ“¤', title:'Multi-Format Export', desc:'CSV, JSON, and PDF exports for all reports and analytics data' },
]

export default function AboutPage() {
  return (
    <div className="page-container grid-bg" style={{ padding:'90px 24px 60px' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        {/* Hero */}
        <div style={{ textAlign:'center', marginBottom:60 }}>
          <div style={{ width:72, height:72, borderRadius:20, background:'linear-gradient(135deg,#0ea5e9,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
            <Brain size={36} color="white" />
          </div>
          <h1 style={{ fontFamily:'Plus Jakarta Sans', fontWeight:800, fontSize:40, color:'#f0f9ff', marginBottom:12 }}>About BEHAVR</h1>
          <p style={{ fontSize:16, color:'#64748b', maxWidth:600, margin:'0 auto', lineHeight:1.7 }}>An enterprise-grade Human Behavior Prediction Dashboard built with cutting-edge AI and machine learning to predict user intentions, detect churn, and optimize engagement at scale.</p>
        </div>

        {/* Developer */}
        <div className="glass" style={{ padding:32, marginBottom:32, background:'linear-gradient(135deg, rgba(14,165,233,0.05), rgba(139,92,246,0.05))' }}>
          <div style={{ display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
            <div style={{ width:72, height:72, borderRadius:20, background:'linear-gradient(135deg,#0ea5e9,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, fontWeight:800, color:'white', fontFamily:'Plus Jakarta Sans', flexShrink:0 }}>UF</div>
            <div style={{ flex:1 }}>
              <h2 style={{ fontFamily:'Plus Jakarta Sans', fontWeight:800, fontSize:24, color:'#f0f9ff', marginBottom:4 }}>Umar Faraz</h2>
              <p style={{ color:'#64748b', fontSize:14, marginBottom:12 }}>AI/ML Engineer Â· Full Stack Developer</p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <a href="https://github.com/umarfaraz511" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textDecoration:'none', fontSize:13, padding:'8px 16px' }}><Github size={14} />github.com/umarfaraz511</a>
                <a href="https://www.linkedin.com/in/umar-faraz-700457280" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textDecoration:'none', fontSize:13, padding:'8px 16px' }}><Linkedin size={14} />Umar Faraz</a>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div style={{ marginBottom:40 }}>
          <h2 style={{ fontFamily:'Plus Jakarta Sans', fontWeight:700, fontSize:24, color:'#f0f9ff', marginBottom:20 }}>Platform Features</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:16 }}>
            {features.map(f => (
              <div key={f.title} className="glass" style={{ padding:20 }}>
                <div style={{ fontSize:24, marginBottom:10 }}>{f.icon}</div>
                <h3 style={{ fontWeight:700, fontSize:14, color:'#f0f9ff', marginBottom:6 }}>{f.title}</h3>
                <p style={{ fontSize:12, color:'#475569', lineHeight:1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h2 style={{ fontFamily:'Plus Jakarta Sans', fontWeight:700, fontSize:24, color:'#f0f9ff', marginBottom:20 }}>Technology Stack</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:16 }}>
            {techStack.map(t => (
              <div key={t.category} className="glass" style={{ padding:20 }}>
                <h3 style={{ fontWeight:700, fontSize:13, color:'#0ea5e9', marginBottom:12, textTransform:'uppercase', letterSpacing:'0.08em' }}>{t.category}</h3>
                {t.items.map(item => (
                  <div key={item} style={{ fontSize:13, color:'#94a3b8', padding:'4px 0', borderBottom:'1px solid rgba(14,165,233,0.05)', display:'flex', alignItems:'center', gap:6 }}>
                    <span style={{ width:4, height:4, borderRadius:'50%', background:'#0ea5e9', display:'inline-block', flexShrink:0 }} />
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

