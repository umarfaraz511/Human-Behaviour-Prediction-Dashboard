'use client'
import { useState, useEffect } from 'react'
import { RefreshCw, Download, Filter } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { engagementData, userSegments, kpiData, anomalies, realtimeUsers } from '@/lib/data'
import KpiCard from '@/components/ui/KpiCard'
import SectionHeader from '@/components/ui/SectionHeader'
import AnomalyBadge from '@/components/ui/AnomalyBadge'
import toast from 'react-hot-toast'

const COLORS = ['#0ea5e9','#8b5cf6','#10b981','#f59e0b','#f43f5e']

const kpiConfig = [
  { key:'totalUsers', icon:'👥', color:'#0ea5e9', suffix:'' },
  { key:'activeUsers', icon:'⚡', color:'#8b5cf6', suffix:'' },
  { key:'churnRate', icon:'⚠️', color:'#f43f5e', suffix:'%' },
  { key:'engagementScore', icon:'💫', color:'#10b981', suffix:'%' },
  { key:'conversionRate', icon:'🎯', color:'#f59e0b', suffix:'%' },
  { key:'predictionAccuracy', icon:'🧠', color:'#0ea5e9', suffix:'%' },
  { key:'retentionRate', icon:'🔄', color:'#10b981', suffix:'%' },
  { key:'revenueAtRisk', icon:'💰', color:'#f43f5e', suffix:'' },
]

export default function DashboardPage() {
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const refresh = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setLastUpdated(new Date()); toast.success('Dashboard refreshed') }, 1200)
  }

  const exportCSV = () => {
    const rows = [['Month','Sessions','Pageviews','Conversions'], ...engagementData.map(d => [d.month, d.sessions, d.pageviews, d.conversions])]
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'behavr_dashboard.csv'; a.click()
    toast.success('CSV exported')
  }

  return (
    <div className="page-container grid-bg" style={{ padding: '90px 24px 60px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 20, padding: '4px 12px', marginBottom: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>LIVE · Updated {lastUpdated.toLocaleTimeString()}</span>
            </div>
            <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 28, color: '#f0f9ff', marginBottom: 4 }}>Command Center</h1>
            <p style={{ color: '#475569', fontSize: 14 }}>Real-time human behavior analytics and AI predictions</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-secondary" onClick={refresh} style={{ gap: 6 }}>
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />Refresh
            </button>
            <button className="btn-secondary" onClick={exportCSV}><Download size={14} />Export CSV</button>
          </div>
        </div>

        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {kpiConfig.map(({ key, icon, color, suffix }) => {
            const d = kpiData[key as keyof typeof kpiData]
            return <KpiCard key={key} label={d.label} value={d.value} change={d.change} up={d.up} icon={icon} color={color} suffix={suffix} />
          })}
        </div>

        {/* Charts Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
          <div className="glass" style={{ padding: 24 }}>
            <SectionHeader title="Engagement Trends" subtitle="Monthly sessions, pageviews & conversions" badge="12 months" />
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/></linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill:'#475569', fontSize:11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill:'#475569', fontSize:11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background:'rgba(4,13,26,0.95)', border:'1px solid rgba(14,165,233,0.3)', borderRadius:8 }} labelStyle={{ color:'#f0f9ff' }} />
                <Legend wrapperStyle={{ fontSize:12, color:'#94a3b8' }} />
                <Area type="monotone" dataKey="sessions" stroke="#0ea5e9" fill="url(#g1)" strokeWidth={2} name="Sessions" />
                <Area type="monotone" dataKey="conversions" stroke="#8b5cf6" fill="url(#g2)" strokeWidth={2} name="Conversions" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass" style={{ padding: 24 }}>
            <SectionHeader title="User Segments" subtitle="Current distribution" />
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={userSegments} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80}>
                  {userSegments.map((s, i) => <Cell key={i} fill={s.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background:'rgba(4,13,26,0.95)', border:'1px solid rgba(14,165,233,0.3)', borderRadius:8 }} labelStyle={{ color:'#f0f9ff' }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
              {userSegments.map(s => (
                <div key={s.name} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:12 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:s.color }} />
                    <span style={{ color:'#94a3b8' }}>{s.name}</span>
                  </div>
                  <span style={{ color:'#f0f9ff', fontWeight:600 }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div className="glass" style={{ padding: 24 }}>
            <SectionHeader title="Churn Risk Trend" subtitle="Monthly churn risk %" badge="predictive" />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={engagementData}>
                <XAxis dataKey="month" tick={{ fill:'#475569', fontSize:10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill:'#475569', fontSize:10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background:'rgba(4,13,26,0.95)', border:'1px solid rgba(14,165,233,0.3)', borderRadius:8 }} labelStyle={{ color:'#f0f9ff' }} />
                <Bar dataKey="churnRisk" name="Churn Risk %" fill="#f43f5e" radius={[4,4,0,0]} opacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass" style={{ padding: 24 }}>
            <SectionHeader title="Anomaly Feed" subtitle="Real-time behavioral anomalies" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', maxHeight: 200 }}>
              {anomalies.map(a => (
                <div key={a.id} style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', padding:'10px 12px', background:'rgba(255,255,255,0.02)', borderRadius:8, borderLeft:`3px solid ${a.severity==='critical'?'#f43f5e':a.severity==='high'?'#f59e0b':'#0ea5e9'}` }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                      <span style={{ fontSize:12, fontWeight:600, color:'#f0f9ff' }}>{a.metric}</span>
                      <AnomalyBadge severity={a.severity} />
                    </div>
                    <p style={{ fontSize:11, color:'#475569' }}>{a.description}</p>
                  </div>
                  <span style={{ fontSize:10, color:'#334155', marginLeft:8, whiteSpace:'nowrap' }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Users Table */}
        <div className="glass" style={{ padding: 24 }}>
          <SectionHeader title="Live User Activity" subtitle="Real-time session tracking" badge="live">
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#10b981', boxShadow:'0 0 8px #10b981' }} />
              <span style={{ fontSize:12, color:'#10b981', fontWeight:600 }}>{realtimeUsers.length} active</span>
            </div>
          </SectionHeader>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ borderBottom:'1px solid rgba(14,165,233,0.1)' }}>
                  {['User','Page','Duration','Intent','Churn Risk','Engagement','Country'].map(h => (
                    <th key={h} style={{ padding:'8px 12px', textAlign:'left', color:'#475569', fontWeight:600, fontSize:11, textTransform:'uppercase', letterSpacing:'0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {realtimeUsers.map((u, i) => (
                  <tr key={u.id} style={{ borderBottom:'1px solid rgba(14,165,233,0.05)', transition:'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(14,165,233,0.03)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    <td style={{ padding:'10px 12px', color:'#f0f9ff', fontWeight:500 }}>{u.name}</td>
                    <td style={{ padding:'10px 12px', color:'#0ea5e9', fontFamily:'JetBrains Mono', fontSize:12 }}>{u.page}</td>
                    <td style={{ padding:'10px 12px', color:'#94a3b8' }}>{Math.floor(u.duration/60)}m {u.duration%60}s</td>
                    <td style={{ padding:'10px 12px' }}><span style={{ background:'rgba(14,165,233,0.1)', color:'#0ea5e9', padding:'2px 8px', borderRadius:6, fontSize:11, fontWeight:600 }}>{u.intent}</span></td>
                    <td style={{ padding:'10px 12px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                        <div style={{ width:40, height:4, background:'rgba(255,255,255,0.05)', borderRadius:2 }}>
                          <div style={{ height:'100%', width:`${u.churnRisk}%`, background:u.churnRisk>60?'#f43f5e':u.churnRisk>30?'#f59e0b':'#10b981', borderRadius:2 }} />
                        </div>
                        <span style={{ fontSize:12, color:u.churnRisk>60?'#f43f5e':u.churnRisk>30?'#f59e0b':'#10b981', fontWeight:600 }}>{u.churnRisk}%</span>
                      </div>
                    </td>
                    <td style={{ padding:'10px 12px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                        <div style={{ width:40, height:4, background:'rgba(255,255,255,0.05)', borderRadius:2 }}>
                          <div style={{ height:'100%', width:`${u.engagementScore}%`, background:'#0ea5e9', borderRadius:2 }} />
                        </div>
                        <span style={{ fontSize:12, color:'#94a3b8' }}>{u.engagementScore}%</span>
                      </div>
                    </td>
                    <td style={{ padding:'10px 12px', color:'#94a3b8', fontSize:12 }}>{u.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
