'use client'
import { useState } from 'react'
import { AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { predictions, mlModels, featureImportance, radarData } from '@/lib/data'
import SectionHeader from '@/components/ui/SectionHeader'
import ModelCard from '@/components/ui/ModelCard'
import toast from 'react-hot-toast'

export default function PredictionsPage() {
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  const runPrediction = () => {
    setRunning(true); setProgress(0)
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setRunning(false); toast.success('Prediction complete — 94.7% confidence'); return 100 }
        return p + 8
      })
    }, 120)
  }

  return (
    <div className="page-container grid-bg" style={{ padding:'90px 24px 60px' }}>
      <div style={{ maxWidth:1400, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32, flexWrap:'wrap', gap:16 }}>
          <div>
            <span style={{ fontSize:11, fontWeight:600, color:'#f59e0b', background:'rgba(245,158,11,0.1)', padding:'4px 12px', borderRadius:20, letterSpacing:'0.1em', display:'block', marginBottom:8 }}>AI PREDICTIONS</span>
            <h1 style={{ fontFamily:'Plus Jakarta Sans', fontWeight:800, fontSize:28, color:'#f0f9ff', marginBottom:4 }}>Predictive Analytics</h1>
            <p style={{ color:'#475569', fontSize:14 }}>8-week user behavior and engagement forecasts with confidence intervals</p>
          </div>
          <button className="btn-primary" onClick={runPrediction} disabled={running}>
            {running ? `Running... ${progress}%` : '🧠 Run Prediction Engine'}
          </button>
        </div>

        {running && (
          <div className="glass" style={{ padding:16, marginBottom:20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <span style={{ fontSize:13, color:'#94a3b8' }}>Prediction engine running...</span>
              <span style={{ fontSize:13, color:'#0ea5e9', fontWeight:600 }}>{progress}%</span>
            </div>
            <div style={{ height:6, background:'rgba(255,255,255,0.05)', borderRadius:3 }}>
              <div style={{ height:'100%', width:`${progress}%`, background:'linear-gradient(90deg,#0ea5e9,#8b5cf6)', borderRadius:3, transition:'width 0.2s' }} />
            </div>
          </div>
        )}

        {/* Forecast Chart */}
        <div className="glass" style={{ padding:24, marginBottom:20 }}>
          <SectionHeader title="8-Week Engagement Forecast" subtitle="Predicted sessions with confidence bands" badge="LSTM Model · 94.7% accuracy" />
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={predictions}>
              <defs>
                <linearGradient id="gPred" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/></linearGradient>
                <linearGradient id="gBand" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
              </defs>
              <XAxis dataKey="label" tick={{ fill:'#475569', fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:'#475569', fontSize:11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background:'rgba(4,13,26,0.95)', border:'1px solid rgba(14,165,233,0.3)', borderRadius:8 }} labelStyle={{ color:'#f0f9ff' }} />
              <Area type="monotone" dataKey="upper" stroke="transparent" fill="url(#gBand)" name="Upper Bound" />
              <Area type="monotone" dataKey="predicted" stroke="#0ea5e9" fill="url(#gPred)" strokeWidth={2.5} name="Predicted" />
              <Area type="monotone" dataKey="lower" stroke="transparent" fill="transparent" name="Lower Bound" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Model Radar + Feature importance */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
          <div className="glass" style={{ padding:24 }}>
            <SectionHeader title="Model Performance Radar" subtitle="Comparative accuracy across models" />
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(14,165,233,0.1)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill:'#475569', fontSize:11 }} />
                <Radar dataKey="LSTM" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.15} strokeWidth={2} name="LSTM" />
                <Radar dataKey="XGBoost" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} strokeWidth={2} name="XGBoost" />
                <Radar dataKey="RF" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} name="RF" />
                <Tooltip contentStyle={{ background:'rgba(4,13,26,0.95)', border:'1px solid rgba(14,165,233,0.3)', borderRadius:8 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass" style={{ padding:24 }}>
            <SectionHeader title="Feature Importance" subtitle="Top predictors for behavior model" badge="explainable AI" />
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={featureImportance} layout="vertical">
                <XAxis type="number" tick={{ fill:'#475569', fontSize:10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="feature" tick={{ fill:'#94a3b8', fontSize:10 }} axisLine={false} tickLine={false} width={110} />
                <Tooltip contentStyle={{ background:'rgba(4,13,26,0.95)', border:'1px solid rgba(14,165,233,0.3)', borderRadius:8 }} labelStyle={{ color:'#f0f9ff' }} />
                <Bar dataKey="importance" fill="#0ea5e9" radius={[0,4,4,0]} name="Importance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Model Cards */}
        <div>
          <SectionHeader title="AI Model Registry" subtitle="All production prediction models" badge="6 models" />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16 }}>
            {mlModels.map(m => <ModelCard key={m.name} {...m} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
