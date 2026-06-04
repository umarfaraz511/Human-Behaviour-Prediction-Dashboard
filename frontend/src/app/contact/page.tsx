'use client'
import { useState } from 'react'
import { Github, Linkedin, Mail, Send, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { toast.error('Please fill all required fields'); return }
    setSent(true)
    toast.success('Message sent! Umar will respond within 24 hours.')
  }

  const s = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }))

  const inputStyle = { width:'100%', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(14,165,233,0.2)', borderRadius:10, padding:'12px 14px', color:'#f0f9ff', fontSize:14, outline:'none', fontFamily:'Inter', transition:'border 0.2s' }

  return (
    <div className="page-container grid-bg" style={{ padding:'90px 24px 60px' }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <span style={{ fontSize:11, fontWeight:600, color:'#0ea5e9', background:'rgba(14,165,233,0.1)', padding:'4px 12px', borderRadius:20, letterSpacing:'0.1em', display:'inline-block', marginBottom:8 }}>GET IN TOUCH</span>
          <h1 style={{ fontFamily:'Plus Jakarta Sans', fontWeight:800, fontSize:36, color:'#f0f9ff', marginBottom:8 }}>Contact</h1>
          <p style={{ color:'#475569', fontSize:15 }}>Reach out to Umar Faraz for project inquiries, collaborations, or feedback</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, alignItems:'start' }}>
          {/* Contact info */}
          <div>
            <div className="glass" style={{ padding:28, marginBottom:16 }}>
              <h3 style={{ fontWeight:700, fontSize:16, color:'#f0f9ff', marginBottom:4 }}>Umar Faraz</h3>
              <p style={{ color:'#475569', fontSize:13, marginBottom:20 }}>AI/ML Engineer · Full Stack Developer</p>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <a href="https://github.com/umarfaraz511" target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', gap:12, color:'#94a3b8', textDecoration:'none', fontSize:14, transition:'color 0.2s' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='#0ea5e9'}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='#94a3b8'}
                >
                  <Github size={18} style={{ flexShrink:0 }} />
                  <span>github.com/umarfaraz511</span>
                </a>
                <a href="https://www.linkedin.com/in/umar-faraz-700457280" target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', gap:12, color:'#94a3b8', textDecoration:'none', fontSize:14, transition:'color 0.2s' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='#0ea5e9'}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='#94a3b8'}
                >
                  <Linkedin size={18} style={{ flexShrink:0 }} />
                  <span>linkedin.com/in/umar-faraz-700457280</span>
                </a>
              </div>
            </div>
            <div className="glass" style={{ padding:24, background:'linear-gradient(135deg,rgba(14,165,233,0.05),rgba(139,92,246,0.05))' }}>
              <p style={{ fontSize:13, color:'#64748b', lineHeight:1.7 }}>Available for AI/ML engineering projects, full-stack development, consulting, and research collaborations. Typically responds within 24 hours.</p>
            </div>
          </div>

          {/* Form */}
          {sent ? (
            <div className="glass" style={{ padding:40, textAlign:'center' }}>
              <CheckCircle size={48} color="#10b981" style={{ margin:'0 auto 16px' }} />
              <h3 style={{ fontWeight:700, fontSize:18, color:'#f0f9ff', marginBottom:8 }}>Message Sent!</h3>
              <p style={{ color:'#475569', fontSize:14 }}>Umar will respond within 24 hours.</p>
              <button className="btn-primary" onClick={() => { setSent(false); setForm({ name:'', email:'', subject:'', message:'' }) }} style={{ marginTop:20 }}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={submit} className="glass" style={{ padding:28, display:'flex', flexDirection:'column', gap:16 }}>
              {[['name','Name *','text'],['email','Email *','email'],['subject','Subject','text']].map(([k,ph,t]) => (
                <div key={k}>
                  <label style={{ fontSize:12, color:'#475569', fontWeight:600, display:'block', marginBottom:6 }}>{ph}</label>
                  <input type={t} value={(form as any)[k]} onChange={s(k)} placeholder={ph} style={inputStyle}
                    onFocus={e=>(e.target as HTMLElement).style.borderColor='rgba(14,165,233,0.5)'}
                    onBlur={e=>(e.target as HTMLElement).style.borderColor='rgba(14,165,233,0.2)'}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize:12, color:'#475569', fontWeight:600, display:'block', marginBottom:6 }}>Message *</label>
                <textarea value={form.message} onChange={s('message')} placeholder="Your message..." rows={4} style={{ ...inputStyle, resize:'vertical', minHeight:100 }}
                  onFocus={e=>(e.target as HTMLElement).style.borderColor='rgba(14,165,233,0.5)'}
                  onBlur={e=>(e.target as HTMLElement).style.borderColor='rgba(14,165,233,0.2)'}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width:'100%', justifyContent:'center', padding:'13px' }}>
                <Send size={15} />Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
