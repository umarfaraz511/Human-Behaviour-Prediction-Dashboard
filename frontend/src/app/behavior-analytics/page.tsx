'use client'
import { useState } from 'react'
import { Download } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, FunnelChart, Funnel, LabelList } from 'recharts'
import { engagementData, behaviorFlowData, journeyStages, featureImportance } from '@/lib/data'
import SectionHeader from '@/components/ui/SectionHeader'
import toast from 'react-hot-toast'

const colors = ['#0ea5e9','#8b5cf6','#10b981','#f59e0b','#f43f5e','#0ea5e9']

export default function BehaviorAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d')

  return (
    <div className="page-container grid-bg" style={{ padding: '90px 24px 60px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32, flexWrap:'wrap', gap:16 }}>
          <div>
            <span style={{ fontSize:11, fontWeight:600, color:'#8b5cf6', background:'rgba(139,92,246,0.1)', padding:'4px 12px', borderRadius:20, letterSpacing:'0.1em', display:'block', marginBottom:8 }}>BEHAVIOR ANALYTICS</span>
            <h1 style={{ fontFamily:'Plus Jakarta Sans', fontWeight:800, fontSize:28, color:'#f0f9ff', marginBottom:4 }}>Behavior Analytics</h1>
            <p style={{ color:'#475569', fontSize:14 }}>Session flows, user journeys, conversion paths and behavioral patterns</p>
          </div>
          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
            <div style={{ display:'flex', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(14,165,233,0.1)', borderRadius:10, overflow:'hidden' }}>
              {['7d','30d','90d','1y'].map(r => (
                <button key={r} onClick={() => setDateRange(r)} style={{ padding:'7px 14px', fontSize:12, fontWeight:600, border:'none', cursor:'pointer', background:dateRange===r?'rgba(14,165,233,0.15)':'transparent', color:dateRange===r?'#0ea5e9':'#475569', transition:'all 0.2s' }}>{r}</button>
              ))}
            </div>
            <button className="btn-secondary" onClick={() => toast.success('Report exported')}><Download size={14} />Export</button>
          </div>
        </div>

        {/* Behavior Flow */}
        <div className="glass" style={{ padding:24, marginBottom:20 }}>
          <SectionHeader title="Behavior Flow Analysis" subtitle="User navigation funnel from entry to conversion" badge="conversion funnel" />
          <div style={{ display:'flex', alignItems:'center', gap:0, overflowX:'auto', padding:'16px 0' }}>
            {behaviorFlowData.map((step, i) => (
              <div key={step.name} style={{ display:'flex', alignItems:'center' }}>
                <div style={{ textAlign:'center', minWidth:120 }}>
                  <div style={{ height:Math.max(40, (step.users / 10000) * 100), background:`linear-gradient(180deg, ${colors[i]}, ${colors[i]}88)`, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:8, transition:'height 0.5s' }}>
                    <span style={{ color:'white', fontWeight:700, fontSize:13 }}>{step.users.toLocaleString()}</span>
                  </div>
                  <div style={{ fontSize:12, color:'#94a3b8', fontWeight:500 }}>{step.name}</div>
                  {i > 0 && <div style={{ fontSize:10, color:'#f43f5e', marginTop:2 }}>-{Math.round((1 - step.users / behaviorFlowData[i-1].users) * 100)}%</div>}
                </div>
                {i < behaviorFlowData.length - 1 && <div style={{ width:32, height:2, background:'rgba(14,165,233,0.2)', position:'relative' }}><div style={{ position:'absolute', right:-4, top:-4, color:'#475569', fontSize:12 }}>›</div></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Charts row */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
          <div className="glass" style={{ padding:24 }}>
            <SectionHeader title="Session Analytics" subtitle="Monthly session volume trends" />
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={engagementData}>
                <XAxis dataKey="month" tick={{ fill:'#475569', fontSize:10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill:'#475569', fontSize:10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background:'rgba(4,13,26,0.95)', border:'1px solid rgba(14,165,233,0.3)', borderRadius:8 }} labelStyle={{ color:'#f0f9ff' }} />
                <Bar dataKey="sessions" name="Sessions" radius={[4,4,0,0]}>
                  {engagementData.map((_, i) => <Cell key={i} fill={`hsl(${190 + i * 5}, 80%, ${50 + i * 1}%)`} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass" style={{ padding:24 }}>
            <SectionHeader title="Conversion Tracking" subtitle="Monthly conversion performance" />
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={engagementData}>
                <XAxis dataKey="month" tick={{ fill:'#475569', fontSize:10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill:'#475569', fontSize:10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background:'rgba(4,13,26,0.95)', border:'1px solid rgba(14,165,233,0.3)', borderRadius:8 }} labelStyle={{ color:'#f0f9ff' }} />
                <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2.5} dot={{ fill:'#10b981', r:3 }} name="Conversions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Importance + Journey */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          <div className="glass" style={{ padding:24 }}>
            <SectionHeader title="Feature Importance" subtitle="Top behavioral predictors for ML models" badge="explainable AI" />
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {featureImportance.map((f, i) => (
                <div key={f.feature}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                    <span style={{ fontSize:13, color:'#94a3b8' }}>{f.feature}</span>
                    <span style={{ fontSize:13, color:'#f0f9ff', fontWeight:600 }}>{f.importance}%</span>
                  </div>
                  <div style={{ height:6, background:'rgba(255,255,255,0.05)', borderRadius:3 }}>
                    <div style={{ height:'100%', width:`${f.importance * 4}%`, background:`linear-gradient(90deg, ${colors[i%colors.length]}, ${colors[i%colors.length]}88)`, borderRadius:3, transition:'width 1s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass" style={{ padding:24 }}>
            <SectionHeader title="User Journey Stages" subtitle="Drop-off analysis per funnel stage" badge="journey map" />
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {journeyStages.map((j, i) => (
                <div key={j.stage} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 12px', background:'rgba(255,255,255,0.02)', borderRadius:8 }}>
                  <div style={{ width:28, height:28, borderRadius:8, background:`${colors[i%colors.length]}18`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:colors[i%colors.length] }}>{i+1}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                      <span style={{ fontSize:13, fontWeight:600, color:'#f0f9ff' }}>{j.stage}</span>
                      <span style={{ fontSize:12, color:'#94a3b8' }}>{j.users.toLocaleString()}</span>
                    </div>
                    <div style={{ height:3, background:'rgba(255,255,255,0.05)', borderRadius:2 }}>
                      <div style={{ height:'100%', width:`${(j.users/100000)*100}%`, background:colors[i%colors.length], borderRadius:2 }} />
                    </div>
                  </div>
                  {j.dropoff > 0 && <span style={{ fontSize:11, color:'#f43f5e', fontWeight:600 }}>-{j.dropoff}%</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
