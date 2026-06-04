'use client'
import { useState } from 'react'
import { Download, FileText, BarChart2, Users, Brain, RefreshCw } from 'lucide-react'
import { engagementData, kpiData, mlModels } from '@/lib/data'
import SectionHeader from '@/components/ui/SectionHeader'
import toast from 'react-hot-toast'

const reportTypes = [
  { id:'executive', label:'Executive Summary', icon:'📊', desc:'High-level KPIs and business metrics overview', color:'#0ea5e9' },
  { id:'behavior', label:'Behavior Report', icon:'🔍', desc:'Detailed session, flow, and journey analysis', color:'#8b5cf6' },
  { id:'prediction', label:'Prediction Report', icon:'🧠', desc:'Model accuracy, forecasts, and feature importance', color:'#10b981' },
  { id:'churn', label:'Churn Analysis', icon:'⚠️', desc:'At-risk users, churn drivers, and retention insights', color:'#f43f5e' },
  { id:'engagement', label:'Engagement Report', icon:'💫', desc:'Engagement scores, trends, and user segments', color:'#f59e0b' },
  { id:'anomaly', label:'Anomaly Report', icon:'🔺', desc:'Detected behavioral anomalies and AI explanations', color:'#0ea5e9' },
]

export default function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null)

  const generateReport = (type: string, format: string) => {
    setGenerating(type + format)
    setTimeout(() => {
      setGenerating(null)
      if (format === 'csv') {
        const rows = [['Month','Sessions','Pageviews','Conversions'], ...engagementData.map(d=>[d.month,d.sessions,d.pageviews,d.conversions])]
        const csv = rows.map(r=>r.join(',')).join('\n')
        const blob = new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`behavr_${type}_report.csv`; a.click()
      } else if (format === 'json') {
        const data = { report: type, generated: new Date().toISOString(), kpis: kpiData, models: mlModels }
        const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`behavr_${type}_report.json`; a.click()
      }
      toast.success(`${type} report exported as ${format.toUpperCase()}`)
    }, 1500)
  }

  return (
    <div className="page-container grid-bg" style={{ padding:'90px 24px 60px' }}>
      <div style={{ maxWidth:1400, margin:'0 auto' }}>
        <div style={{ marginBottom:32 }}>
          <span style={{ fontSize:11, fontWeight:600, color:'#0ea5e9', background:'rgba(14,165,233,0.1)', padding:'4px 12px', borderRadius:20, letterSpacing:'0.1em', display:'inline-block', marginBottom:8 }}>REPORTING CENTER</span>
          <h1 style={{ fontFamily:'Plus Jakarta Sans', fontWeight:800, fontSize:28, color:'#f0f9ff', marginBottom:4 }}>Reports</h1>
          <p style={{ color:'#475569', fontSize:14 }}>Generate and export AI-powered behavior analytics reports</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:20 }}>
          {reportTypes.map(r => (
            <div key={r.id} className="glass" style={{ padding:24, transition:'transform 0.2s' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.transform='translateY(-3px)'}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.transform='translateY(0)'}
            >
              <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginBottom:16 }}>
                <div style={{ width:44, height:44, borderRadius:12, background:`${r.color}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{r.icon}</div>
                <div>
                  <h3 style={{ fontWeight:700, fontSize:15, color:'#f0f9ff', marginBottom:4 }}>{r.label}</h3>
                  <p style={{ fontSize:12, color:'#475569', lineHeight:1.5 }}>{r.desc}</p>
                </div>
              </div>
              <div style={{ borderTop:'1px solid rgba(14,165,233,0.1)', paddingTop:16, display:'flex', gap:8 }}>
                {['csv','json','pdf'].map(fmt => (
                  <button key={fmt} onClick={() => generateReport(r.id, fmt)}
                    disabled={generating === r.id + fmt}
                    style={{ flex:1, padding:'8px 4px', borderRadius:8, border:'1px solid rgba(14,165,233,0.2)', background:generating===r.id+fmt?'rgba(14,165,233,0.15)':'rgba(14,165,233,0.05)', color:generating===r.id+fmt?'#0ea5e9':'#475569', fontSize:12, fontWeight:600, cursor:'pointer', transition:'all 0.2s', textTransform:'uppercase' }}>
                    {generating === r.id + fmt ? '...' : fmt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Report history */}
        <div className="glass" style={{ padding:24, marginTop:24 }}>
          <SectionHeader title="Recent Reports" subtitle="Previously generated reports" />
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[
              { name:'Executive Summary — June 2026', type:'executive', format:'PDF', size:'2.4 MB', date:'2 min ago', color:'#0ea5e9' },
              { name:'Churn Analysis — Q2 2026', type:'churn', format:'CSV', size:'890 KB', date:'1 hr ago', color:'#f43f5e' },
              { name:'Behavior Report — May 2026', type:'behavior', format:'JSON', size:'1.8 MB', date:'Yesterday', color:'#8b5cf6' },
              { name:'Prediction Report — Week 23', type:'prediction', format:'PDF', size:'3.1 MB', date:'2 days ago', color:'#10b981' },
            ].map((rep,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background:'rgba(255,255,255,0.02)', borderRadius:10, borderLeft:`3px solid ${rep.color}` }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <FileText size={16} color={rep.color} />
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:'#f0f9ff' }}>{rep.name}</div>
                    <div style={{ fontSize:11, color:'#475569' }}>{rep.size} · {rep.date}</div>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontSize:11, fontWeight:600, color:rep.color, background:`${rep.color}15`, padding:'2px 8px', borderRadius:6 }}>{rep.format}</span>
                  <button style={{ background:'none', border:'none', cursor:'pointer', color:'#475569' }} onClick={()=>toast.success('Downloading...')}><Download size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
