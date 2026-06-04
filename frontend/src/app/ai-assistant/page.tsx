'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Brain, Loader2, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

const GROQ_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || ''

const SYSTEM_PROMPT = `You are BEHAVR AI, an expert AI assistant for a Human Behavior Prediction Dashboard. 
You specialize in:
- User behavior analytics and pattern analysis
- Churn prediction and retention strategies  
- Engagement optimization and forecasting
- ML model interpretation (LSTM, XGBoost, Random Forest, BERT)
- Anomaly detection and behavioral insights
- User segmentation and personalization strategies
- Conversion optimization and funnel analysis

Current platform metrics:
- 124,830 total users tracked
- 94.7% average model accuracy
- 4.2% churn rate (down 1.3%)
- 78.4% average engagement score
- 6 production ML models running

Always provide actionable, data-driven insights. Be concise but thorough. Format key numbers in bold.`

const suggestions = [
  'What are the top drivers of user churn right now?',
  'How can I improve engagement for at-risk users?',
  'Explain the LSTM behavior prediction model',
  'What anomalies should I investigate first?',
  'Which user segment has the highest conversion potential?',
  'How do I interpret the feature importance scores?',
]

interface Message { role: 'user' | 'assistant'; content: string; time: string; error?: boolean }

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: "Hello! I'm **BEHAVR AI** — your intelligent behavior analytics assistant.\n\nI have full context on your platform's 124,830 users, 6 production ML models, and real-time behavioral signals. Ask me anything about user behavior, churn prediction, engagement optimization, or model performance.",
    time: 'now'
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = async (text?: string) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')

    const userMsg: Message = { role: 'user', content: msg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const history = messages.slice(-6).map(m => ({ role: m.role, content: m.content }))
      
      if (!GROQ_KEY) {
        // Fallback responses when no API key
        const fallbacks: Record<string, string> = {
          'churn': '**Churn Analysis:** The top 3 churn drivers in your current data are:\n1. **Session frequency drop** — users who decrease visit frequency by >40% in 14 days show 73% churn probability\n2. **Feature disengagement** — users who stop using 3+ core features have 81% churn risk\n3. **Support ticket volume** — users with 2+ unresolved tickets churn at 2.4x the baseline rate\n\n**Recommended actions:** Trigger re-engagement emails at day 10 of inactivity, offer guided tours for disengaged users, and prioritize support SLAs.',
          'engagement': '**Engagement Optimization:** For at-risk users (engagement score <40%), the most effective interventions are:\n1. **Personalized content** — behavioral targeting lifts engagement by 34% on average\n2. **Progress indicators** — showing achievement milestones increases session depth by 28%\n3. **Smart notifications** — time-optimized push notifications achieve 3.2x higher open rates\n\nYour current **Casual Users segment** (28% of base) is the highest-opportunity group for engagement improvement.',
          'lstm': '**LSTM Behavior Model:** Your LSTM (Long Short-Term Memory) model processes sequential user interaction data over 30-day windows.\n\n**Architecture:** 2-layer LSTM with 128 hidden units → Dense(64) → Dropout(0.3) → Output\n\n**What it predicts:** Next 8 sessions engagement probability, intent class (12 categories), and conversion likelihood.\n\n**Current performance:** 94.7% accuracy, 93.2% precision, 95.1% recall — this is production-grade performance.',
          'anomaly': '**Anomaly Prioritization:** Based on current severity scores:\n\n🔴 **CRITICAL — Login Failures (+89%):** Investigate immediately. Could indicate a credential stuffing attack or authentication service issue. Check your rate limiting and auth logs.\n\n🟡 **HIGH — Bounce Rate Spike (+34%):** Likely a UX issue on /pricing. Run an A/B test on the pricing page layout.\n\n🟡 **HIGH — Cart Abandonment (+21%):** Focus on checkout step 2. Common causes: unexpected shipping costs, required account creation, or payment friction.',
        }
        const key = Object.keys(fallbacks).find(k => msg.toLowerCase().includes(k))
        const reply = key ? fallbacks[key] : `**BEHAVR AI Analysis:**\n\nBased on your platform data with 124,830 tracked users and 94.7% model accuracy:\n\n${msg.toLowerCase().includes('segment') ? 'Your **Power Users** (18% of base, 4,320 users) have the highest conversion potential with 97% engagement scores and 8% churn risk. Focus retention efforts here first.' : msg.toLowerCase().includes('feature') ? 'Feature importance scores show **Session Duration** (23%) and **Page Depth** (18%) are the strongest behavioral predictors. Users spending >8 minutes and viewing >5 pages have 3.4x higher conversion probability.' : 'Your platform is performing well. The key opportunity is the **At-Risk segment** (12% of users) showing elevated churn signals. Early intervention with personalized re-engagement can recover an estimated $28,400 in at-risk revenue.'}`
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
          setLoading(false)
        }, 1200)
        return
      }

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_KEY}` },
        body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history, { role: 'user', content: msg }], max_tokens: 600, temperature: 0.4 })
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    } catch (e: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${e.message}. Please check your GROQ_API_KEY.`, time: 'now', error: true }])
    }
    setLoading(false)
  }

  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      return <p key={i} style={{ marginBottom: line ? 6 : 0 }} dangerouslySetInnerHTML={{ __html: bold }} />
    })
  }

  return (
    <div className="page-container" style={{ padding:'80px 0 0', height:'100vh', display:'flex', flexDirection:'column' }}>
      {/* Header */}
      <div style={{ padding:'16px 24px', borderBottom:'1px solid rgba(14,165,233,0.1)', background:'rgba(4,13,26,0.8)', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:40, height:40, borderRadius:12, background:'linear-gradient(135deg,#0ea5e9,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Brain size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontWeight:700, fontSize:16, color:'#f0f9ff' }}>BEHAVR AI Assistant</h2>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#10b981', boxShadow:'0 0 8px #10b981' }} />
              <span style={{ fontSize:11, color:'#10b981', fontWeight:600 }}>Powered by Groq LLaMA · Online</span>
            </div>
          </div>
        </div>
        <button onClick={() => { setMessages([messages[0]]); toast.success('Conversation cleared') }} style={{ background:'none', border:'1px solid rgba(14,165,233,0.2)', borderRadius:8, padding:'6px 12px', color:'#475569', fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
          <Trash2 size={12} />Clear
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'24px', display:'flex', flexDirection:'column', gap:16 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display:'flex', gap:12, justifyContent:m.role==='user'?'flex-end':'flex-start' }}>
            {m.role === 'assistant' && (
              <div style={{ width:32, height:32, borderRadius:10, background:'linear-gradient(135deg,#0ea5e9,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}>
                <Brain size={14} color="white" />
              </div>
            )}
            <div style={{ maxWidth:'72%', padding:'14px 18px', borderRadius:m.role==='user'?'18px 18px 4px 18px':'18px 18px 18px 4px', background:m.role==='user'?'linear-gradient(135deg,#0369a1,#075985)':m.error?'rgba(244,63,94,0.1)':'rgba(8,20,40,0.8)', border:m.role==='user'?'none':`1px solid ${m.error?'rgba(244,63,94,0.3)':'rgba(14,165,233,0.15)'}`, color:m.role==='user'?'#f0f9ff':m.error?'#f43f5e':'#e2e8f0', fontSize:14, lineHeight:1.6 }}>
              {renderContent(m.content)}
              <div style={{ fontSize:10, color:m.role==='user'?'rgba(255,255,255,0.4)':'#334155', marginTop:8, textAlign:'right' }}>{m.time}</div>
            </div>
            {m.role === 'user' && (
              <div style={{ width:32, height:32, borderRadius:10, background:'linear-gradient(135deg,#0ea5e9,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'white', flexShrink:0, marginTop:2 }}>UF</div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display:'flex', gap:12 }}>
            <div style={{ width:32, height:32, borderRadius:10, background:'linear-gradient(135deg,#0ea5e9,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center' }}><Brain size={14} color="white" /></div>
            <div style={{ padding:'14px 18px', borderRadius:'18px 18px 18px 4px', background:'rgba(8,20,40,0.8)', border:'1px solid rgba(14,165,233,0.15)' }}>
              <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                {[0,1,2].map(d => <div key={d} style={{ width:6, height:6, borderRadius:'50%', background:'#0ea5e9', animation:`pulse ${0.5+d*0.15}s ease-in-out infinite alternate` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length < 3 && (
        <div style={{ padding:'0 24px 12px', display:'flex', gap:8, overflowX:'auto' }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => send(s)} style={{ background:'rgba(14,165,233,0.05)', border:'1px solid rgba(14,165,233,0.2)', borderRadius:20, padding:'6px 14px', color:'#64748b', fontSize:12, cursor:'pointer', whiteSpace:'nowrap', transition:'all 0.2s' }}
              onMouseEnter={e=>{(e.target as HTMLElement).style.background='rgba(14,165,233,0.1)';(e.target as HTMLElement).style.color='#0ea5e9'}}
              onMouseLeave={e=>{(e.target as HTMLElement).style.background='rgba(14,165,233,0.05)';(e.target as HTMLElement).style.color='#64748b'}}
            >{s}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding:'12px 24px 24px', borderTop:'1px solid rgba(14,165,233,0.1)', background:'rgba(4,13,26,0.8)', backdropFilter:'blur(20px)' }}>
        <div style={{ display:'flex', gap:10, maxWidth:1400, margin:'0 auto' }}>
          <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&send()} placeholder="Ask about user behavior, churn, predictions, or anomalies..." style={{ flex:1, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(14,165,233,0.2)', borderRadius:12, padding:'12px 16px', color:'#f0f9ff', fontSize:14, outline:'none', fontFamily:'Inter' }} />
          <button className="btn-primary" onClick={()=>send()} disabled={loading||!input.trim()} style={{ padding:'12px 20px' }}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
        <p style={{ fontSize:11, color:'#1e293b', textAlign:'center', marginTop:10 }}>Set NEXT_PUBLIC_GROQ_API_KEY in .env.local for live AI · Built by Umar Faraz</p>
      </div>

      <style>{`@keyframes pulse { from { opacity: 0.4; transform: scale(0.8); } to { opacity: 1; transform: scale(1.2); } }`}</style>
    </div>
  )
}
