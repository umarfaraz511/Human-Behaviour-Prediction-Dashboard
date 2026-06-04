'use client'
import { useState } from 'react'
import { Search, Filter, Download } from 'lucide-react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { realtimeUsers, userSegments, anomalies } from '@/lib/data'
import SectionHeader from '@/components/ui/SectionHeader'
import AnomalyBadge from '@/components/ui/AnomalyBadge'
import toast from 'react-hot-toast'

export default function UserInsightsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = realtimeUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.intent.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || (filter === 'high-risk' && u.churnRisk > 50) || (filter === 'engaged' && u.engagementScore > 80)
    return matchSearch && matchFilter
  })

  const exportData = () => {
    const rows = [['ID','Name','Page','Intent','Churn Risk','Engagement','Country'], ...filtered.map(u => [u.id,u.name,u.page,u.intent,u.churnRisk,u.engagementScore,u.country])]
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='user_insights.csv'; a.click()
    toast.success('User insights exported')
  }

  return (
    <div className="page-container grid-bg" style={{ padding:'90px 24px 60px' }}>
      <div style={{ maxWidth:1400, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32, flexWrap:'wrap', gap:16 }}>
          <div>
            <span style={{ fontSize:11, fontWeight:600, color:'#10b981', background:'rgba(16,185,129,0.1)', padding:'4px 12px', borderRadius:20, letterSpacing:'0.1em', display:'block', marginBottom:8 }}>USER INTELLIGENCE</span>
            <h1 style={{ fontFamily:'Plus Jakarta Sans', fontWeight:800, fontSize:28, color:'#f0f9ff', marginBottom:4 }}>User Insights</h1>
            <p style={{ color:'#475569', fontSize:14 }}>Individual user profiles, segmentation, and behavioral intelligence</p>
          </div>
          <button className="btn-secondary" onClick={exportData}><Download size={14} />Export CSV</button>
        </div>

        {/* Segment cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:14, marginBottom:24 }}>
          {userSegments.map(s => (
            <div key={s.name} className="glass" style={{ padding:16, borderLeft:`3px solid ${s.color}`, cursor:'pointer', transition:'transform 0.2s' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.transform='translateY(-3px)'}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.transform='translateY(0)'}
            >
              <div style={{ fontSize:20, fontWeight:800, color:s.color, fontFamily:'Plus Jakarta Sans', marginBottom:3 }}>{s.users.toLocaleString()}</div>
              <div style={{ fontSize:11, color:'#94a3b8', marginBottom:2 }}>{s.name}</div>
              <div style={{ fontSize:11, color:s.color, fontWeight:600 }}>{s.value}% of total</div>
            </div>
          ))}
        </div>

        {/* Segment charts */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24 }}>
          <div className="glass" style={{ padding:24 }}>
            <SectionHeader title="Segment Distribution" subtitle="User base composition" />
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={userSegments} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({name,value})=>`${value}%`} labelLine={false}>
                  {userSegments.map((s,i)=><Cell key={i} fill={s.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background:'rgba(4,13,26,0.95)', border:'1px solid rgba(14,165,233,0.3)', borderRadius:8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="glass" style={{ padding:24 }}>
            <SectionHeader title="Segment User Count" subtitle="Absolute user numbers per segment" />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={userSegments}>
                <XAxis dataKey="name" tick={{ fill:'#475569', fontSize:9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill:'#475569', fontSize:9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background:'rgba(4,13,26,0.95)', border:'1px solid rgba(14,165,233,0.3)', borderRadius:8 }} labelStyle={{ color:'#f0f9ff' }} />
                <Bar dataKey="users" radius={[4,4,0,0]}>
                  {userSegments.map((s,i)=><Cell key={i} fill={s.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User table with search/filter */}
        <div className="glass" style={{ padding:24 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:12 }}>
            <SectionHeader title="Individual User Profiles" subtitle={`${filtered.length} users`} />
            <div style={{ display:'flex', gap:10 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(14,165,233,0.15)', borderRadius:10, padding:'8px 12px' }}>
                <Search size={14} color="#475569" />
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search users..." style={{ background:'none', border:'none', outline:'none', color:'#f0f9ff', fontSize:13, width:160 }} />
              </div>
              <select value={filter} onChange={e=>setFilter(e.target.value)} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(14,165,233,0.15)', borderRadius:10, padding:'8px 12px', color:'#94a3b8', fontSize:13, outline:'none', cursor:'pointer' }}>
                <option value="all">All Users</option>
                <option value="high-risk">High Churn Risk</option>
                <option value="engaged">Highly Engaged</option>
              </select>
            </div>
          </div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ borderBottom:'1px solid rgba(14,165,233,0.1)' }}>
                  {['User','Country','Page','Intent','Churn Risk','Engagement Score','Session'].map(h=>(
                    <th key={h} style={{ padding:'8px 12px', textAlign:'left', color:'#475569', fontWeight:600, fontSize:11, textTransform:'uppercase', letterSpacing:'0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(u=>(
                  <tr key={u.id} style={{ borderBottom:'1px solid rgba(14,165,233,0.05)', transition:'background 0.2s', cursor:'pointer' }}
                    onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='rgba(14,165,233,0.03)'}
                    onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='transparent'}
                  >
                    <td style={{ padding:'12px', color:'#f0f9ff', fontWeight:500 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:30, height:30, borderRadius:'50%', background:`hsl(${u.engagementScore*3},70%,50%)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'white' }}>{u.name.charAt(0)}</div>
                        {u.name}
                      </div>
                    </td>
                    <td style={{ padding:'12px', color:'#94a3b8', fontSize:12 }}>{u.country}</td>
                    <td style={{ padding:'12px', color:'#0ea5e9', fontFamily:'JetBrains Mono', fontSize:11 }}>{u.page}</td>
                    <td style={{ padding:'12px' }}><span style={{ background:'rgba(14,165,233,0.1)', color:'#0ea5e9', padding:'2px 8px', borderRadius:6, fontSize:11, fontWeight:600 }}>{u.intent}</span></td>
                    <td style={{ padding:'12px' }}>
                      <span style={{ color:u.churnRisk>60?'#f43f5e':u.churnRisk>30?'#f59e0b':'#10b981', fontWeight:700, fontSize:13 }}>{u.churnRisk}%</span>
                    </td>
                    <td style={{ padding:'12px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ width:60, height:4, background:'rgba(255,255,255,0.05)', borderRadius:2 }}>
                          <div style={{ height:'100%', width:`${u.engagementScore}%`, background:'linear-gradient(90deg,#0ea5e9,#8b5cf6)', borderRadius:2 }} />
                        </div>
                        <span style={{ fontSize:12, color:'#94a3b8' }}>{u.engagementScore}%</span>
                      </div>
                    </td>
                    <td style={{ padding:'12px', color:'#475569', fontSize:12 }}>{Math.floor(u.duration/60)}m {u.duration%60}s</td>
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
