'use client'
import Link from 'next/link'
import { ArrowRight, Brain, TrendingUp, Users, Shield, Zap, BarChart2, Target, Activity, ChevronRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { engagementData, kpiData } from '@/lib/data'

const features = [
  { icon: '🧠', title: 'Deep Learning Models', desc: 'LSTM, CNN, Transformer models trained on billions of behavioral signals for sub-100ms predictions.', color: '#0ea5e9' },
  { icon: '🎯', title: 'Intent Classification', desc: 'XGBoost and BERT-powered intent classification with 91.3% accuracy across 12 intent categories.', color: '#8b5cf6' },
  { icon: '⚠️', title: 'Churn Prediction', desc: 'Random Forest ensemble detects at-risk users 30 days in advance with 89.6% precision.', color: '#f43f5e' },
  { icon: '📈', title: 'Engagement Forecasting', desc: 'Multi-step time series forecasting with confidence intervals for 8-week engagement horizons.', color: '#10b981' },
  { icon: '🔍', title: 'Anomaly Detection', desc: 'IsolationForest unsupervised model detects behavioral anomalies in real time across all user segments.', color: '#f59e0b' },
  { icon: '💬', title: 'Sentiment Analysis', desc: 'Fine-tuned BERT transformer for multi-class sentiment analysis across user feedback and interactions.', color: '#0ea5e9' },
]

const stats = [
  { label: 'Users Analyzed', value: '124,830', icon: '👥' },
  { label: 'Predictions / Day', value: '2.4M', icon: '⚡' },
  { label: 'Model Accuracy', value: '94.7%', icon: '🎯' },
  { label: 'Anomalies Detected', value: '1,247', icon: '🔍' },
]

export default function HomePage() {
  return (
    <div className="page-container grid-bg">
      {/* Hero */}
      <section style={{ padding: '80px 24px 60px', maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)', borderRadius: 20, padding: '6px 16px', marginBottom: 24 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span style={{ fontSize: 12, color: '#0ea5e9', fontWeight: 600, letterSpacing: '0.05em' }}>AI-POWERED BEHAVIOR INTELLIGENCE PLATFORM</span>
        </div>

        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1, marginBottom: 24, color: '#f0f9ff' }}>
          Predict Human Behavior<br />
          <span style={{ background: 'linear-gradient(135deg,#0ea5e9,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Before It Happens</span>
        </h1>

        <p style={{ fontSize: 18, color: '#64748b', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.7 }}>
          BEHAVR uses deep learning and predictive analytics to understand user intentions, forecast engagement, detect churn, and deliver actionable intelligence — in real time.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/dashboard"><button className="btn-primary" style={{ fontSize: 15, padding: '14px 32px' }}>Launch Dashboard <ArrowRight size={16} /></button></Link>
          <Link href="/ai-assistant"><button className="btn-secondary" style={{ fontSize: 15, padding: '14px 32px' }}>Try AI Assistant <Brain size={16} /></button></Link>
        </div>

        {/* Hero chart */}
        <div className="glass" style={{ marginTop: 60, padding: 24, maxWidth: 900, margin: '60px auto 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 15, color: '#f0f9ff' }}>Live Engagement Forecast</h3>
              <p style={{ fontSize: 12, color: '#475569' }}>12-month behavioral trend with AI predictions</p>
            </div>
            <span style={{ fontSize: 11, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>● LIVE</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="gSess" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(4,13,26,0.9)', border: '1px solid rgba(14,165,233,0.3)', borderRadius: 8 }} labelStyle={{ color: '#f0f9ff' }} />
              <Area type="monotone" dataKey="sessions" stroke="#0ea5e9" fill="url(#gSess)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '0 24px 60px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {stats.map(s => (
            <div key={s.label} className="glass" style={{ padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 28, color: '#f0f9ff', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#475569' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '0 24px 80px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#0ea5e9', background: 'rgba(14,165,233,0.1)', padding: '4px 12px', borderRadius: 20, letterSpacing: '0.1em', textTransform: 'uppercase' }}>AI FEATURES</span>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 36, marginTop: 16, marginBottom: 8, color: '#f0f9ff' }}>Enterprise-Grade AI Models</h2>
          <p style={{ color: '#475569', fontSize: 15 }}>6 production ML models working in concert to predict every dimension of user behavior</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {features.map(f => (
            <div key={f.title} className="glass" style={{ padding: 24, transition: 'transform 0.2s', cursor: 'default' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 15, color: '#f0f9ff', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 24px 80px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div className="glass" style={{ padding: '48px 24px', background: 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(139,92,246,0.1))' }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 32, color: '#f0f9ff', marginBottom: 12 }}>Ready to Predict User Behavior?</h2>
          <p style={{ color: '#64748b', fontSize: 15, marginBottom: 32 }}>Built by Umar Faraz · github.com/umarfaraz511</p>
          <Link href="/dashboard"><button className="btn-primary" style={{ fontSize: 15, padding: '14px 40px' }}>Open Full Dashboard <ChevronRight size={16} /></button></Link>
        </div>
      </section>
    </div>
  )
}
